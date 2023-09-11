<script lang="ts">
	import { v4 } from 'uuid';
	import { twMerge } from 'tailwind-merge';
	import { fade } from 'svelte/transition';

	/**
	 * Unique identifier for the input
	 */
	export let id = v4();
	/**
	 * Label for the input
	 */
	export let label: string | null | undefined = undefined;
	/**
	 * Is this input required?
	 */
	export let required = false;
	/**
	 * Name of the input
	 */
	export let name: string;
	/**
	 * Error message for the input
	 */
	export let error: string | null | undefined = undefined;
	/**
	 * Type of the input
	 */
	export let type: 'text' | 'number' | 'email' | 'password' = 'text';
</script>

<div class="">
	{#if label || $$slots.label}
		<label for={id} class={twMerge('block', error ? 'text-danger' : '')}>
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
	<div class={twMerge('rounded-lg border', error ? 'border-2 border-danger' : 'border-dark')}>
		<slot name="left" />
		<input class={twMerge('block w-full rounded-lg px-1 py-1')} {type} {id} {name} {required} />
		<slot name="right" />
	</div>
	{#if error}
		<p transition:fade class="text-medium text-sm text-danger">{error}</p>
	{/if}
</div>
