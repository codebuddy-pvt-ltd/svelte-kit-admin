<script lang="ts">
	import { v4 } from 'uuid';
	import { fade } from 'svelte/transition';
	import Input from './Input.svelte';
	import type { HTMLInputAttributes } from 'svelte/elements';
	import { cn } from '../utils';

	interface $$Props extends HTMLInputAttributes {
		error?: string;
		label?: string;
	}

	export let error: $$Props['error'] = undefined;
	export let label: $$Props['label'] = undefined;
	export let id: $$Props['id'] = v4();
</script>

<div class="">
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
	<Input {id} {...$$restProps} error={Boolean(error)} class={cn($$props.class, 'outline-none')}>
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
