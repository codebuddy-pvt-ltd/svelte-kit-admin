<script context="module" lang="ts">
	import type { TextInputProps } from './TextInput.svelte';

	export type Value = string | number;

	export interface Option {
		label: string;
		value: Value;
		disabled?: boolean;
	}

	export interface AutocompleteProps extends TextInputProps {
		value?: Option;
		options: Array<Option>;
		clearable?: boolean;
		searchable?: boolean;
		checkIconPosition?: 'left' | 'right';
		withCheckIcon?: boolean;
		disabled?: boolean;
	}
</script>

<script lang="ts">
	import { onMount } from 'svelte';
	import TextInput from './TextInput.svelte';
	import type { ReferenceElement, FloatingElement } from '@floating-ui/core';
	import { autoUpdate, computePosition, offset, size } from '@floating-ui/dom';
	import { cn } from '../utils';

	type $$Props = AutocompleteProps;

	export let options: $$Props['options'] = [];
	export let value: $$Props['value'] = undefined;
	export let clearable: $$Props['clearable'] = false;
	export let searchable: $$Props['searchable'] = false;
	export let checkIconPosition: $$Props['checkIconPosition'] = 'left';
	export let withCheckIcon: $$Props['withCheckIcon'] = true;
	export let disabled: $$Props['disabled'] = false;

	let referenceElement: ReferenceElement;
	let inputElement: HTMLInputElement;
	let floatingElement: FloatingElement;

	let showFloatingElement = false;
	let search = '';

	$: filteredOptions =
		searchable && value?.label !== search
			? options.filter((option) =>
					search ? String(option.label).toLowerCase().includes(String(search).toLowerCase()) : true
			  )
			: options;

	$: console.log({ search });
	$: console.log({ value });
	$: console.log({ filteredOptions });

	async function updatePosition() {
		const { x, y } = await computePosition(referenceElement, floatingElement, {
			placement: 'bottom',
			strategy: 'absolute',
			middleware: [
				offset(4),
				size({
					apply({ rects, elements }) {
						Object.assign(elements.floating.style, {
							width: `${rects.reference.width}px`
						});
					}
				})
			]
		});

		Object.assign(floatingElement.style, {
			left: `${x}px`,
			top: `${y}px`
		});
	}

	onMount(() => {
		const cleanup = autoUpdate(referenceElement, floatingElement, updatePosition);

		return () => {
			cleanup();
		};
	});

	function handleWindowClick(event: MouseEvent) {
		if (
			floatingElement &&
			!floatingElement.contains(event.target as Node) &&
			!referenceElement.contains(event.target as Node)
		) {
			showFloatingElement = false;
		}
	}

	function handleKeyDown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			showFloatingElement = false;
		}
	}

	function handleFocus(_event: FocusEvent) {
		if (!disabled) {
			showFloatingElement = true;
		}
	}

	function handleAction(event: MouseEvent) {
		event.preventDefault();
		event.stopPropagation();

		if (clearable && value !== undefined) {
			value = undefined;
			search = '';
		} else {
			showFloatingElement = true;
		}
	}

	function handleSelect(event: Event, option: Option) {
		event.preventDefault();
		event.stopPropagation();

		value = option;
		search = option.label;
		inputElement.focus();

		showFloatingElement = false;
	}

	function handleTextChange(event: Event) {
		search = (event.target as HTMLInputElement).value;
	}
</script>

<svelte:window on:click={handleWindowClick} on:keydown={handleKeyDown} />

<div class="w-full">
	<TextInput
		{...$$restProps}
		{disabled}
		bind:value={search}
		bind:containerRef={referenceElement}
		bind:ref={inputElement}
		on:focus={handleFocus}
		on:blur
		on:click={() => {
			if (!disabled) showFloatingElement = true;
		}}
		on:keydown={(e) => {
			if (e.key === 'Enter') {
				e.preventDefault();
				e.stopPropagation();
				showFloatingElement = true;
			}
		}}
		on:input={handleTextChange}
		readonly={searchable ? undefined : true}
	>
		<svelte:fragment slot="right">
			<button type="button" tabindex="-1" on:click={handleAction} class="h-[16px] w-[16px]">
				{#if clearable && value !== undefined}
					<iconify-icon icon="mdi:close" width="16px" height="16px"></iconify-icon>
				{:else}
					<iconify-icon icon="mdi:unfold-more-horizontal" width="16px" height="16px"></iconify-icon>
				{/if}
			</button>
		</svelte:fragment>
	</TextInput>

	<ul
		bind:this={floatingElement}
		class={cn(
			'absolute left-0 top-0 w-max rounded-lg border-2 border-primary bg-white p-1 shadow-lg',
			{
				hidden: !showFloatingElement
			}
		)}
	>
		{#if filteredOptions.length === 0}
			<li class="text-medium text-center text-primary opacity-30">No options</li>
		{:else}
			{#each filteredOptions as option}
				<li class="">
					<button
						type="button"
						disabled={option.disabled || disabled}
						on:click|preventDefault|stopPropagation={(e) => handleSelect(e, option)}
						on:keydown={(e) => {
							if (e.key === 'Enter') {
								handleSelect(e, option);
							}
						}}
						class={cn('flex w-full cursor-pointer items-center rounded-lg px-2 py-1 text-left ', {
							'font-semibold': value?.value === option.value,
							'cursor-not-allowed opacity-30': option.disabled || disabled,
							'hover:bg-primary hover:bg-opacity-30 focus:bg-primary focus:bg-opacity-30': !(
								option.disabled || disabled
							)
						})}
					>
						{#if withCheckIcon && checkIconPosition === 'left' && value?.value === option.value}
							<iconify-icon icon="mdi:check" width="16px" height="16px" class="mr-2"></iconify-icon>
						{/if}
						{option.label}
					</button>
				</li>
			{/each}
		{/if}
	</ul>
</div>
