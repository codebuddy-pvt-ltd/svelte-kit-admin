<script context="module" lang="ts">
	import type { InputProps } from './Input.svelte';

	export interface TextInputProps extends Omit<InputProps, 'error'> {
		ref?: HTMLInputElement;
		containerRef?: HTMLDivElement;
		error?: string;
		label?: string;
	}
</script>

<script lang="ts">
	import { v4 } from 'uuid';
	import { fade } from 'svelte/transition';
	import Input from './Input.svelte';
	import { cn } from '../utils';

	type $$Props = TextInputProps;

	export let error: $$Props['error'] = undefined;
	export let label: $$Props['label'] = undefined;
	export let id: $$Props['id'] = v4();
	export let ref: $$Props['ref'] = undefined;
	export let containerRef: $$Props['containerRef'] = undefined;
</script>

<div class="w-full rounded-lg border" bind:this={containerRef}>
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

	<Input
		{id}
		{...$$restProps}
		error={Boolean(error)}
		class={cn($$props.class, 'outline-none')}
		bind:ref
		on:focus
		on:blur
		on:click
		on:keypress
		on:keydown
		on:keyup
		on:change
		on:click
		on:input
	>
		<svelte:fragment slot="left">
			{#if $$slots.left}
				<slot name="left" />
			{/if}
		</svelte:fragment>
		<svelte:fragment slot="right">
			{#if $$slots.right}
				<slot name="right" />
			{/if}
		</svelte:fragment>
	</Input>

	{#if error}
		<p transition:fade class="text-medium text-sm text-danger">{error}</p>
	{/if}
</div>
