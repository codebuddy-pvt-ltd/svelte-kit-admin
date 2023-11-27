<script context="module" lang="ts">
	import type { HTMLSelectAttributes } from 'svelte/elements';
	import type { OptionItem, OptionValue } from '../options/types';
	import { cn } from '$lib/components/utils';
	import { fade } from 'svelte/transition';
	import { getParsedOptions } from '../options/utils';

	export interface NativeSelectProps extends HTMLSelectAttributes {
		value?: OptionValue;
		options: Array<OptionItem>;
		disabled?: boolean;
		label?: string;
		error?: string;
		description?: string;
		required?: boolean;
		borderless?: boolean;
		containerRef?: HTMLDivElement;
		ref?: HTMLSelectElement;
		classes?: {
			container?: string;
		};
	}
</script>

<script lang="ts">
	import NativeSelectOption from './NativeSelectOption.svelte';

	type $$Props = NativeSelectProps;

	export let options: $$Props['options'] = [];
	export let value: $$Props['value'] = undefined;
	export let disabled: $$Props['disabled'] = false;
	export let error: $$Props['error'] = undefined;
	export let label: $$Props['label'] = undefined;
	export let description: $$Props['description'] = undefined;
	export let required: $$Props['required'] = false;
	export let borderless: $$Props['borderless'] = false;
	export let containerRef: $$Props['containerRef'] = undefined;
	export let ref: $$Props['ref'] = undefined;
	export let classes: $$Props['classes'] = {};
	export let id: $$Props['id'] = undefined;

	$: parsedOptions = getParsedOptions(options);
</script>

<div bind:this={containerRef}>
	{#if label || $$slots.label}
		<label for={id} class={cn('block', error ? 'text-danger' : '')}>
			{#if $$slots.label}
				<slot name="label" />
			{:else if label}
				{label}
			{/if}
			{#if required}
				<span class="text-medium text-danger">*</span>
			{/if}
		</label>
	{/if}

	{#if description}
		<p class="text-xs text-dark opacity-50">{description}</p>
	{/if}

	<div
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

		<select
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
			bind:value
		>
			<NativeSelectOption options={parsedOptions} />
		</select>

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

	{#if error}
		<p transition:fade class="text-medium text-sm text-danger">{error}</p>
	{/if}
</div>
