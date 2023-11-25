<script context="module" lang="ts">
	import type { TextInputProps } from '../TextInput.svelte';

	export interface ColorInputProps extends TextInputProps {
		value?: string;
		disabled?: boolean;
	}
</script>

<script lang="ts">
	import TextInput from '../TextInput.svelte';
	import Saturation from './Saturation.svelte';
	import { parseColor } from './utils/parser';
	import { hsvaToHex } from './utils/converter';
	import ColorSlider from './ColorSlider.svelte';
	import { cn } from '$lib/components/utils';
	import type { ReferenceElement, FloatingElement } from '@floating-ui/core';
	import { autoUpdate, computePosition, flip, offset } from '@floating-ui/dom';
	import { onMount } from 'svelte';

	type $$Props = ColorInputProps;

	export let value = '#ffffff';
	export let disabled: $$Props['disabled'] = false;

	let parsedColor = parseColor(String(value));
	let hue: number = parsedColor.h;

	$: value = hsvaToHex(parsedColor);

	$: parsedColor.h = hue;

	let referenceElement: ReferenceElement;
	let inputElement: HTMLInputElement;
	let floatingElement: FloatingElement;
	let showFloatingElement = false;

	async function updatePosition() {
		const { x, y } = await computePosition(referenceElement, floatingElement, {
			placement: 'bottom',
			strategy: 'absolute',
			middleware: [offset(4), flip()]
		});

		Object.assign(floatingElement.style, {
			left: `${x}px`,
			top: `${y}px`
		});
	}

	onMount(() => {
		const cleanup = autoUpdate(referenceElement, floatingElement, updatePosition);

		return () => {
			cleanup();
		};
	});

	function handleWindowClick(event: MouseEvent) {
		if (
			floatingElement &&
			!floatingElement.contains(event.target as Node) &&
			!referenceElement.contains(event.target as Node)
		) {
			showFloatingElement = false;
		}
	}

	function handleKeyDown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			showFloatingElement = false;
		}
	}

	function handleFocus(_event: FocusEvent) {
		if (!disabled) {
			showFloatingElement = true;
		}
	}
</script>

<svelte:window on:click={handleWindowClick} on:keydown={handleKeyDown} />

<TextInput
	{...$$restProps}
	type="text"
	class="overflow-hidden rounded-lg p-0"
	{value}
	bind:containerRef={referenceElement}
	bind:ref={inputElement}
	on:focus={handleFocus}
	on:blur
	on:click={() => {
		if (!disabled) showFloatingElement = true;
	}}
	on:keydown={(e) => {
		if (e.key === 'Enter') {
			e.preventDefault();
			e.stopPropagation();
			showFloatingElement = true;
		}
	}}
>
	<div class="h-4 w-4 rounded-full" style:background-color={value} slot="left"></div>
</TextInput>

<div
	bind:this={floatingElement}
	class={cn(
		'absolute left-0 top-0 w-max rounded-lg border-2 border-primary bg-white p-1 shadow-lg',
		{ hidden: !showFloatingElement }
	)}
>
	<Saturation bind:value={parsedColor} color={value} class="mb-4" />

	<ColorSlider bind:value={hue} />
</div>
