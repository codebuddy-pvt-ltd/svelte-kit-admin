<script context="module" lang="ts">
	import type { HTMLBaseAttributes } from 'svelte/elements';
	import type { Mark } from './Marks.svelte';
	import { cn } from '$lib/components/utils';

	export interface TrackProps extends HTMLBaseAttributes {
		filled: number;
		offset?: number;
		marksOffset?: number;
		marks?: Array<Mark>;
		min: number;
		max: number;
		value: number;
		disabled?: boolean;
		inverted?: boolean;
		ref: HTMLDivElement;
	}
</script>

<script lang="ts">
	import Marks from './Marks.svelte';

	type $$Props = TrackProps;

	export let filled: $$Props['filled'] = 0;
	export let marksOffset: $$Props['marksOffset'] = 0;
	export let offset: $$Props['offset'] = 0;
	export let disabled: $$Props['disabled'] = false;
	export let inverted: $$Props['inverted'] = false;
	export let ref: $$Props['ref'];
</script>

<div
	bind:this={ref}
	class={cn(
		'flex h-4 w-full cursor-pointer items-center rounded-lg',
		disabled ? 'cursor-not-allowed' : 'cursor-pointer'
	)}
>
	<div
		class={cn(
			'relative h-2 w-full',
			'z-0 rounded-lg bg-dark/10 before:absolute before:-left-2 before:-right-2 before:bottom-0 before:top-0 before:content-[""]'
		)}
	>
		<div
			class="absolute bottom-0 top-0 z-[1] rounded-lg bg-primary"
			style:width={`${filled}%`}
			style:left={`${offset}%`}
		></div>

		<slot />

		<Marks
			offset={marksOffset}
			{disabled}
			{inverted}
			min={$$props.min}
			max={$$props.max}
			marks={$$props.marks}
			value={$$props.value}
		/>
	</div>
</div>
