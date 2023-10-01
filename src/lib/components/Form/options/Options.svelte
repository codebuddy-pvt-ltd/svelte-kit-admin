<script context="module" lang="ts">
	import type { Option, OptionParsedItem } from './types';

	export interface OptionsProps {
		options: Array<OptionParsedItem>;
		checkIconPosition?: 'left' | 'right';
		withCheckIcon?: boolean;
		disabled?: boolean;
		value?: Option;
		ref?: HTMLUListElement;
	}
</script>

<script lang="ts">
	import { cn } from '$lib/components/utils';
	import { isOption } from './utils';
	import { createEventDispatcher } from 'svelte';

	type $$Props = OptionsProps;

	export let options: $$Props['options'] = [];
	export let checkIconPosition: $$Props['checkIconPosition'] = 'left';
	export let withCheckIcon: $$Props['withCheckIcon'] = false;
	export let disabled: $$Props['disabled'] = false;
	export let value: $$Props['value'] = undefined;
	export let ref: $$Props['ref'] = undefined;

	const dispatch = createEventDispatcher<{ select: Option }>();

	function handleSelect(option: Option) {
		dispatch('select', option);
	}
</script>

<ul bind:this={ref}>
	{#if options.length === 0}
		<li class="text-medium text-center text-primary opacity-30">No options</li>
	{:else}
		{#each options as option}
			{#if isOption(option)}
				{@const item = option}
				<li class="">
					<button
						type="button"
						{disabled}
						on:click|preventDefault|stopPropagation={() => handleSelect(item)}
						on:keydown={(e) => {
							if (e.key === 'Enter') {
								handleSelect(item);
							}
						}}
						class={cn('flex w-full cursor-pointer items-center rounded-lg px-2 py-1 text-left ', {
							'font-semibold': value == item
						})}
					>
						{#if withCheckIcon && checkIconPosition === 'left' && value === item}
							<iconify-icon icon="mdi:check" width="16px" height="16px" class="mr-2"></iconify-icon>
						{/if}
						<span class="flex-1">{item.label}</span>
						{#if withCheckIcon && checkIconPosition === 'right' && value === item}
							<iconify-icon icon="mdi:check" width="16px" height="16px" class="mr-2"></iconify-icon>
						{/if}
					</button>
				</li>
			{:else}
				{@const { group, items } = option}
				<div class="w-full">
					<div class="flex items-center">
						<h3 class="text-sm text-primary opacity-50">{group}</h3>
						<hr class="ml-3 flex-1 border border-primary border-opacity-50" />
					</div>

					<svelte:self
						options={items}
						on:select
						{value}
						{withCheckIcon}
						{checkIconPosition}
						{disabled}
					/>
				</div>
			{/if}
		{/each}
	{/if}
</ul>
