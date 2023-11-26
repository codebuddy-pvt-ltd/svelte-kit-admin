<script context="module" lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';

	export interface InputProps extends HTMLInputAttributes {
		ref?: HTMLInputElement;
		containerRef?: HTMLDivElement;
		error?: boolean;
		classes?: {
			container?: string;
		};
		borderless?: boolean;
	}
</script>

<script lang="ts">
	import { cn } from '../utils';

	type $$Props = InputProps;

	export let error: $$Props['error'] = false;
	export let ref: $$Props['ref'] = undefined;
	export let disabled: $$Props['disabled'] = false;
	export let containerRef: $$Props['containerRef'] = undefined;
	export let classes: $$Props['classes'] = {};
	export let borderless: $$Props['borderless'] = false;
</script>

<div
	bind:this={containerRef}
	class={cn(
		'flex flex-row items-center rounded-lg',
		borderless
			? 'border-0 outline-none'
			: 'group border focus-within:ring-2 focus-within:ring-primary',
		error && !borderless ? 'border-2 border-danger' : 'border-dark',
		{
			'bg-dark bg-opacity-10': disabled
		},
		classes?.container
	)}
>
	{#if $$slots.left}
		<div
			class={cn(
				'flex items-center justify-center self-stretch rounded-s-lg border-r px-2 py-1 empty:hidden group-focus-within:border-r-2',
				{ 'border-r-2 border-r-danger': error }
			)}
		>
			<slot name="left" />
		</div>
	{/if}
	<input
		{...$$restProps}
		class={cn('block w-full rounded-lg bg-transparent px-1 py-1', $$props.class, {
			'cursor-not-allowed': disabled,
			'placeholder:text-danger': error,
			'outline-none': borderless
		})}
		bind:this={ref}
		on:focus
		on:blur
		on:click
		on:keypress
		on:keydown
		on:keyup
		on:change
		on:click
		on:input
	/>
	{#if $$slots.right}
		<div
			class={cn(
				'flex items-center justify-center self-stretch rounded-e-lg border-l px-2 py-1 empty:hidden group-focus-within:border-l-2',
				{ 'border-l-2 border-l-danger': error }
			)}
		>
			<slot name="right" />
		</div>
	{/if}
</div>
