<script context="module" lang="ts">
	import type { HTMLTextareaAttributes } from 'svelte/elements';

	export interface TextAreaProps extends HTMLTextareaAttributes {
		ref?: HTMLTextAreaElement;
		containerRef?: HTMLDivElement;
		label?: string;
		description?: string;
		error?: string;
		disabled?: boolean;
	}
</script>

<script lang="ts">
	import { v4 } from 'uuid';
	import { cn } from '../utils';
	import { fade } from 'svelte/transition';

	type $$Props = TextAreaProps;

	export let id: $$Props['id'] = v4();
	export let ref: $$Props['ref'] = undefined;
	export let containerRef: $$Props['containerRef'] = undefined;
	export let label: $$Props['label'] = undefined;
	export let description: $$Props['description'] = undefined;
	export let error: $$Props['error'] = undefined;
	export let disabled: $$Props['disabled'] = false;
</script>

<div class="w-full" bind:this={containerRef}>
	{#if label || $$slots.label}
		<label for={id} class={cn('block', error ? 'text-danger' : '')}>
			{#if $$slots.label}
				<slot name="label" />
			{:else if label}
				{label}
			{/if}
			{#if $$restProps?.required}
				<span class="text-medium text-danger">*</span>
			{/if}
		</label>
	{/if}

	{#if description || $$slots.description}
		{#if description}
			<p class="text-sm text-primary opacity-50">{description}</p>
		{:else if $$slots.description}
			<slot name="description" />
		{/if}
	{/if}

	<textarea
		bind:this={ref}
		{...$$restProps}
		class={cn(
			'block w-full rounded-lg border bg-transparent  px-1 py-1',
			'focus:ring-2 focus:ring-primary',
			$$props.class,
			{
				'cursor-not-allowed': disabled,
				'placeholder:text-danger': error
			}
		)}
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

	{#if error}
		<p transition:fade class="text-medium text-sm text-danger">{error}</p>
	{/if}
</div>
