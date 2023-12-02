<script context="module" lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';

	export interface RatingItemProps extends HTMLInputAttributes {
		full: boolean;
		active: boolean;
		fractionValue: number;
		value: number;
		readonly?: boolean;
		checked?: boolean;
	}
</script>

<script lang="ts">
	import StarIcon from './StarIcon.svelte';

	type $$Props = RatingItemProps;

	export let full: $$Props['full'] = false;
	export let active: $$Props['active'] = false;
	export let fractionValue: $$Props['fractionValue'] = 0;
	export let value: $$Props['value'] = 0;
	export let readonly: $$Props['readonly'] = false;
	export let checked: $$Props['checked'] = false;
	export let id: $$Props['id'] = undefined;
	export let name: $$Props['name'] = undefined;
</script>

{#if !readonly}
	<input
		{...$$restProps}
		type="radio"
		{id}
		class="absolute h-0 w-0 overflow-hidden whitespace-nowrap"
		{checked}
		{value}
		{name}
		on:blur
		on:input
	/>
{/if}

<label
	for={id}
	style:z-index={fractionValue === 1 ? undefined : active ? 2 : 0}
	class="absolute left-0 top-0 block cursor-pointer last-of-type:relative"
>
	<div
		class=""
		style:clip-path={fractionValue === 1
			? undefined
			: `inset(0 ${active ? 100 - fractionValue * 100 : 100}% 0 0)`}
	>
		<StarIcon width="20px" height="20px" {full} />
	</div>
</label>
