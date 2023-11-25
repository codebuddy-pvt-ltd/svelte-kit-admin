<script context="module" lang="ts">
	import type { HTMLBaseAttributes } from 'svelte/elements';
	import type { HsvaColor } from './types';

	export interface SaturationProps extends HTMLBaseAttributes {
		value: HsvaColor;
		color: string;
	}
</script>

<script lang="ts">
	import Thumb from './Thumb.svelte';
	import { clamp, cn } from '$lib/components/utils';
	import { onMount } from 'svelte';

	type $$Props = SaturationProps;

	export let value: $$Props['value'] = { h: 0, s: 0, v: 0, a: 1 };
	export let color: $$Props['color'] = '#ffffff';

	let position = { x: 0, y: 0 };
	let ref: HTMLDivElement;
	let isScrubbing = false;

	$: value = {
		...value,
		s: Math.round(position.x * 100),
		v: Math.round((1 - position.y) * 100)
	};

	onMount(() => {
		ref.addEventListener('mousedown', handleMouseDown);

		return () => {
			ref.removeEventListener('mousedown', handleMouseDown);
		};
	});

	function handleMouseMove(event: MouseEvent | TouchEvent) {
		if (isScrubbing) {
			const { clientX, clientY } = event instanceof MouseEvent ? event : event.touches[0];

			const rect = ref.getBoundingClientRect();

			if (rect.width && rect.height) {
				position = {
					x: clamp((clientX - rect.left) / rect.width, 0, 1),
					y: clamp((clientY - rect.top) / rect.height, 0, 1)
				};
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

<div bind:this={ref} class={cn('relative m-2 h-20 w-40 rounded', $$props.class)}>
	<div
		class="absolute"
		style:inset="calc(1rem * -1 / 2 - 0.0625rem)"
		style:background-color={`hsl(${value.h}, 100%, 50%)`}
	></div>

	<div
		class="absolute"
		style:inset="calc(1rem * -1 / 2 - 0.0625rem)"
		style:background-image={'linear-gradient(90deg, #fff, transparent)'}
	></div>

	<div
		class="absolute"
		style:inset="calc(1rem * -1 / 2 - 0.0625rem)"
		style:background-image={'linear-gradient(0deg, #000, transparent)'}
	></div>

	<Thumb {position} {color} />
</div>
