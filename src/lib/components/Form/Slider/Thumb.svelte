<script context="module" lang="ts">
	import type { HTMLBaseAttributes } from 'svelte/elements';

	export interface ThumbProps extends HTMLBaseAttributes {
		min: number;
		max: number;
		value: number;
		position: number;
		dragging: boolean;
		label: string;
		labelAlwaysOn: boolean;
		showLabelOnHover: boolean;
		isHovered?: boolean;
		disabled?: boolean;
		ref?: HTMLDivElement;
	}
</script>

<script lang="ts">
	type $$Props = ThumbProps;

	export let min: $$Props['min'] = 0;
	export let max: $$Props['max'] = 100;
	export let value: $$Props['value'] = 0;
	export let position: $$Props['position'] = 0;
	export let dragging: $$Props['dragging'] = false;
	export let label: $$Props['label'] = '';
	export let labelAlwaysOn: $$Props['labelAlwaysOn'] = false;
	export let showLabelOnHover: $$Props['showLabelOnHover'] = false;
	export let isHovered: $$Props['isHovered'] = false;
	export let disabled: $$Props['disabled'] = false;
	export let ref: $$Props['ref'] = undefined;

	let focused = false;
	$: isVisible = labelAlwaysOn || dragging || focused || (showLabelOnHover && isHovered);
</script>

<div
	bind:this={ref}
	class="absolute top-1/2 z-[3] flex h-2 w-2 -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border-4 border-white bg-dark"
	style:left={`${position}%`}
	aria-valuemax={max}
	aria-valuemin={min}
	aria-valuenow={value}
	aria-disabled={disabled}
	aria-label={label}
	tabIndex={0}
	role="slider"
>
	{#if isVisible}
		<slot />
	{/if}
</div>
