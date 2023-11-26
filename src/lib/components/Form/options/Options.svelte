<script context="module" lang="ts">
	import type { Option, OptionParsedItem } from './types';

	export interface OptionsProps<T extends boolean = false> {
		ref?: HTMLUListElement;
		options: Array<OptionParsedItem>;
		checkIconPosition?: 'left' | 'right';
		withCheckIcon?: boolean;
		disabled?: boolean;
		value?: T extends true ? Array<Option> : Option;
		multiple?: T;
	}
</script>

<script lang="ts" generics="IsMultiple extends boolean = false">
	import { cn } from '$lib/components/utils';
	import { isOption } from './utils';
	import { createEventDispatcher } from 'svelte';

	// eslint-disable-next-line no-undef
	type T = IsMultiple;

	type $$Props = OptionsProps<T>;

	export let options: $$Props['options'] = [];
	export let checkIconPosition: $$Props['checkIconPosition'] = 'left';
	export let withCheckIcon: $$Props['withCheckIcon'] = false;
	export let disabled: $$Props['disabled'] = false;
	export let value: $$Props['value'] = undefined;
	export let ref: $$Props['ref'] = undefined;
	export let multiple: $$Props['multiple'] = false as T;

	const dispatch = createEventDispatcher<{ select: Option }>();

	function handleSelect(option: Option) {
		dispatch('select', option);
	}

	function isOptionSelected(option: Option) {
		if (multiple && Array.isArray(value)) {
			return value.includes(option);
		} else {
			return value === option;
		}
	}
</script>

<ul bind:this={ref} class="text-dark">
	{#if options.length === 0}
		<li class="text-medium text-center text-primary opacity-30">No options</li>
	{:else}
		{#each options as option}
			{#if isOption(option)}
				{@const item = option}
				{@const isSelected = isOptionSelected(item)}
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
							'font-semibold': isSelected
						})}
					>
						{#if withCheckIcon && checkIconPosition === 'left' && isSelected}
							<iconify-icon icon="mdi:check" width="16px" height="16px" class="mr-2"></iconify-icon>
						{/if}
						<span class="flex-1">{item.label}</span>
						{#if withCheckIcon && checkIconPosition === 'right' && isSelected}
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
