<script context="module" lang="ts">
	import { clamp } from '$lib/components/utils';
	import type { HTMLInputAttributes } from 'svelte/elements';
	import { getPosition } from './utils/get-position';
	import { onMount } from 'svelte';
	import { getPrecision } from './utils/get-precision';

	export interface SliderProps extends HTMLInputAttributes {
		min?: number;
		max?: number;
		step?: number;
		precision?: number;
		labelAlwaysOn?: boolean;
		showLabelOnHover?: boolean;
		inverted?: boolean;
		value?: number;
		scale?: (value: number) => number;
		label?: string | ((value: number) => string);
		disabled?: boolean;
		marks?: Array<Mark>;
	}
</script>

<script lang="ts">
	import Track from './Track.svelte';
	import type { Mark } from './Marks.svelte';
	import Thumb from './Thumb.svelte';
	import { getChangeValue } from './utils/get-change-value';

	type $$Props = SliderProps;

	export let min: $$Props['min'] = 0;
	export let max: $$Props['max'] = 100;
	export let step: $$Props['step'] = 1;
	export let labelAlwaysOn: $$Props['labelAlwaysOn'] = false;
	export let showLabelOnHover: $$Props['showLabelOnHover'] = false;
	export let inverted: $$Props['inverted'] = false;
	export let value: $$Props['value'] = 0;
	export let scale: $$Props['scale'] = (value: number) => value;
	export let label: $$Props['label'] = '';
	export let disabled: $$Props['disabled'] = false;
	export let marks: $$Props['marks'] = [];
	export let name: $$Props['name'] = '';

	let hovered = false;
	$: _value = clamp(Number(value), min, max);

	let root: HTMLDivElement;
	let container: HTMLDivElement;
	let thumb: HTMLDivElement;

	let active = false;
	let isScrubbing = false;

	$: position = getPosition({ value: _value, min: Number(min), max: Number(max) });
	$: scaledValue = typeof scale === 'function' ? scale(_value) : _value;
	$: _label = typeof label === 'function' ? label(scaledValue) : String(label);
	$: precision = $$props.precision ?? getPrecision(Number(step));

	function handleRootMouseDown() {
		root.focus();
	}

	onMount(() => {
		container.addEventListener('mousedown', handleMouseDown);

		return () => {
			container.removeEventListener('mousedown', handleMouseDown);
		};
	});

	function handleMouseMove(event: MouseEvent | TouchEvent) {
		if (isScrubbing) {
			const { clientX } = event instanceof MouseEvent ? event : event.touches[0];

			const rect = container.getBoundingClientRect();

			if (rect.width && rect.height) {
				if (!disabled) {
					const x = clamp((clientX - rect.left) / rect.width, 0, 1);

					const nextValue = getChangeValue({
						value: x,
						min: Number(min),
						max: Number(max),
						step: Number(step),
						precision
					});

					_value = nextValue;
				}
			}
		}
	}

	function handleMouseDown(event: MouseEvent) {
		isScrubbing = true;
		handleMouseMove(event);
	}

	function handleMouseUp(_e: MouseEvent) {
		isScrubbing = false;
	}
</script>

<svelte:document
	on:mousemove={handleMouseMove}
	on:mouseup|preventDefault={handleMouseUp}
	on:touchmove={handleMouseMove}
	on:touchend
/>

<div
	class="relative flex h-4 touch-none flex-col items-center rounded-lg px-2"
	bind:this={root}
	on:mousedown={handleRootMouseDown}
	tabindex="-1"
	role="slider"
	aria-valuenow={scaledValue}
>
	<Track
		{inverted}
		offset={0}
		filled={position}
		{marks}
		min={Number(min)}
		max={Number(max)}
		value={scaledValue}
		{disabled}
		bind:ref={container}
	>
		<Thumb
			bind:ref={thumb}
			min={Number(min)}
			max={Number(max)}
			value={scaledValue}
			{position}
			dragging={active}
			label={_label}
			labelAlwaysOn={Boolean(labelAlwaysOn)}
			showLabelOnHover={Boolean(showLabelOnHover)}
			isHovered={hovered}
			{disabled}
		>
			<slot />
		</Thumb>
	</Track>

	<input type="hidden" {name} value={scaledValue} />
</div>
