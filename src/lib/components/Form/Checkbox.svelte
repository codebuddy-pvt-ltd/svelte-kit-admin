<script context="module" lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';

	export interface InputProps extends HTMLInputAttributes {
		ref?: HTMLInputElement;
		error?: string;
		labelPosition?: 'left' | 'right';
		description?: string;
		intermediate?: boolean;
	}
</script>

<script lang="ts">
	import { v4 } from 'uuid';
	import { cn } from '../utils';

	type $$Props = InputProps;

	export let id: $$Props['id'] = v4();
	export let error: $$Props['error'] = undefined;
	export let ref: $$Props['ref'] = undefined;
	export let disabled: $$Props['disabled'] = false;
	export let labelPosition: $$Props['labelPosition'] = 'right';
	export let description: $$Props['description'] = undefined;
	export let intermediate: $$Props['intermediate'] = false;
	export let checked: $$Props['checked'] = false;

	function handleChange(e: Event) {
		const target = e.target as HTMLInputElement;
		if (!intermediate) {
			checked = target.checked;
		}
	}
</script>

<div class="flex gap-x-2">
	{#if labelPosition === 'left'}
		<div class="flex flex-col gap-x-1">
			<label
				for={id}
				class={cn('cursor-pointer text-base', {
					'text-disabled': disabled
				})}><slot /></label
			>

			{#if description}
				<p class="text-xs text-primary opacity-50">{description}</p>
			{/if}

			{#if error}
				<p class="text-xs text-danger">{error}</p>
			{/if}
		</div>
	{/if}

	<div class="relative">
		<input
			type="checkbox"
			{id}
			{disabled}
			{checked}
			bind:this={ref}
			on:change={handleChange}
			aria-errormessage={error}
			class={cn(
				'block h-6 w-6 cursor-pointer appearance-none rounded-full border',
				'focus:ring-2 focus:ring-primary focus:ring-opacity-50',
				{
					'cursor-not-allowed': disabled,
					'border-danger': error,
					'border-disabled': disabled,
					'border-primary': !disabled && !error,
					'bg-primary': checked
				}
			)}
		/>
		<iconify-icon
			icon={intermediate ? 'mdi:minus' : 'mdi:check'}
			width="1rem"
			height="1rem"
			class={cn(
				'absolute left-[0.725rem] top-[0.725rem] -translate-x-1/2 -translate-y-1/2 text-white',
				{
					block: checked,
					hidden: !checked
				}
			)}
		></iconify-icon>
	</div>

	{#if labelPosition === 'right'}
		<div class="flex flex-col gap-x-1">
			<label
				for={id}
				class={cn('cursor-pointer text-base', {
					'text-disabled': disabled
				})}><slot /></label
			>

			{#if description}
				<p class="text-xs text-primary opacity-50">{description}</p>
			{/if}

			{#if error}
				<p class="text-xs text-danger">{error}</p>
			{/if}
		</div>
	{/if}
</div>
