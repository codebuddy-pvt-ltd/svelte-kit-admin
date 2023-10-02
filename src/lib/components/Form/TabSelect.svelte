<script context="module" lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';

	type TabOption = {
		label: string;
		value: string;
		disabled?: boolean;
		icon?: string;
	};

	export interface TabSelectProps extends HTMLInputAttributes {
		options: Array<TabOption>;
		group?: string;
		error?: string;
	}
</script>

<script lang="ts">
	import { cn } from '../utils';

	type $$Props = TabSelectProps;

	export let options: $$Props['options'] = [];
	export let group: $$Props['group'] = undefined;
	export let error: $$Props['error'] = undefined;
	export let disabled: $$Props['disabled'] = false;
</script>

<div class="">
	<div class="inline-flex gap-2 rounded bg-primary bg-opacity-20 px-2 py-2">
		{#each options as { label, value, disabled: itemsDisabled, icon }}
			<label for={label} class={cn('cursor-pointer')}>
				<input
					type="radio"
					disabled={disabled || itemsDisabled}
					bind:group
					class={cn('hidden appearance-none')}
					{value}
					id={label}
				/>

				<span
					class={cn('flex items-center gap-x-2 rounded-[5px] px-3 py-1', {
						'bg-primary text-white': value === group,
						'opacity-25': disabled || itemsDisabled
					})}
				>
					{#if icon}
						<iconify-icon {icon} width="1rem" height="1rem"></iconify-icon>
					{/if}

					{label}
				</span>
			</label>
		{/each}
	</div>

	{#if error}
		<p class="text-xs text-danger">{error}</p>
	{/if}
</div>
