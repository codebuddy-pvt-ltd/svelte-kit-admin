<script context="module" lang="ts">
	import type { HTMLBaseAttributes } from 'svelte/elements';

	export interface ColorSliderProps extends HTMLBaseAttributes {
		value: number;
	}
</script>

<script lang="ts">
	import { clamp } from '$lib/components/utils';
	import Thumb from './Thumb.svelte';
	import { onMount } from 'svelte';

	type $$Props = ColorSliderProps;

	export let value: $$Props['value'] = 0;

	$: thumbColor = `hsl(${value}, 100%, 50%)`;

	let ref: HTMLDivElement;
	let isScrubbing = false;
	let position = { x: 0, y: 0 };

	$: value = Math.round(position.x * 100);

	onMount(() => {
		ref.addEventListener('mousedown', handleMouseDown);

		return () => {
			ref.removeEventListener('mousedown', handleMouseDown);
		};
	});

	function handleMouseMove(event: MouseEvent | TouchEvent) {
		if (isScrubbing) {
			const { clientX } = event instanceof MouseEvent ? event : event.touches[0];

			const rect = ref.getBoundingClientRect();

			if (rect.width && rect.height) {
				position = {
					x: clamp((clientX - rect.left) / rect.width, 0, 1),
					y: position.y
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
	on:touchmove
	on:touchend
/>

<div bind:this={ref} class="relative mx-2 h-[calc(1rem+0.125rem)] w-40 rounded">
	<div
		class="absolute bottom-0 top-0 rounded-lg"
		style:left="calc(1rem * -1 / 2 - 0.0625rem)"
		style:right="calc(1rem * -1 / 2 - 0.0625rem)"
		style:background-image={`linear-gradient(to right,hsl(0,100%,50%),hsl(60,100%,50%),hsl(120,100%,50%),hsl(170,100%,50%),hsl(240,100%,50%),hsl(300,100%,50%),hsl(360,100%,50%))`}
	></div>

	<div
		class="absolute bottom-0 top-0 rounded-lg"
		style:left="calc(1rem * -1 / 2 - 0.0625rem)"
		style:right="calc(1rem * -1 / 2 - 0.0625rem)"
		style:box-shadow={'gba(0, 0, 0, .1) 0 0 0 ${rem(1)} inset, rgb(0, 0, 0, .15) 0 0 ${rem(4)} inset'}
	></div>

	<Thumb {position} color={thumbColor} styles={{ top: '0rem' }} />
</div>
