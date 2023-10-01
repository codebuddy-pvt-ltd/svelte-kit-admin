<script context="module" lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';
	import type { OptionValue } from './options/types';

	type RadioOption = {
		label: string;
		value: OptionValue;
		description?: string;
		disabled?: boolean;
		labelPosition?: 'left' | 'right';
	};

	export interface RadioProps extends HTMLInputAttributes {
		ref?: HTMLInputElement;
		error?: string;
		labelPosition?: 'left' | 'right';
		group?: string;
		options: Array<RadioOption>;
	}
</script>

<script lang="ts">
	import { cn } from '../utils';
	import { scale } from 'svelte/transition';
	import { quintInOut } from 'svelte/easing';

	type $$Props = RadioProps;

	export let error: $$Props['error'] = undefined;
	export let ref: $$Props['ref'] = undefined;
	export let disabled: $$Props['disabled'] = false;
	export let labelPosition: $$Props['labelPosition'] = 'right';
	export let options: $$Props['options'] = [];
	export let group: $$Props['group'] = undefined;
</script>

<div class="flex flex-col gap-y-2">
	{#each options as { label, value, description, disabled: itemDisabled }}
		<div class="flex gap-x-2">
			{#if labelPosition === 'left'}
				<div class="flex flex-col gap-x-1">
					<label
						for={label}
						class={cn('cursor-pointer text-base', {
							'text-disabled': disabled
						})}
					>
						<slot />
					</label>

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
					{...$$restProps}
					type="radio"
					id={label}
					{disabled}
					{value}
					bind:this={ref}
					bind:group
					class={cn(
						'block h-6 w-6 cursor-pointer appearance-none rounded-full border',
						'focus:ring-2 focus:ring-primary focus:ring-opacity-50',
						{
							'cursor-not-allowed': disabled || itemDisabled,
							'border-danger': error,
							'border-disabled': disabled || itemDisabled,
							'border-primary': !disabled && !error && !itemDisabled,
							'bg-primary': value === group
						}
					)}
				/>
				{#if value === group}
					<div
						transition:scale={{
							duration: 500,
							delay: 0,
							opacity: 0.5,
							start: 0.5,
							easing: quintInOut
						}}
						class={cn(
							'h-[0.75rem] w-[0.75rem] rounded-full bg-white transition-all duration-300',
							'absolute left-[0.75rem] top-[0.75rem] -translate-x-1/2 -translate-y-1/2'
						)}
					></div>
				{/if}
			</div>

			{#if labelPosition === 'right'}
				<div class="flex flex-col gap-x-1">
					<label
						for={label}
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
	{/each}
</div>
