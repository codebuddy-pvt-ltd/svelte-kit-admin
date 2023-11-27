<script context="module" lang="ts">
	import type { Option, OptionItem, OptionValue } from './options/types';
	import type { TextInputProps } from './TextInput.svelte';

	export interface MultiSelectProps extends TextInputProps {
		value?: Array<OptionValue>;
		options: Array<OptionItem>;
		clearable?: boolean;
		searchable?: boolean;
		checkIconPosition?: 'left' | 'right';
		withCheckIcon?: boolean;
		disabled?: boolean;
	}
</script>

<script lang="ts">
	import type { ReferenceElement, FloatingElement } from '@floating-ui/core';
	import { autoUpdate, computePosition, flip, offset, size } from '@floating-ui/dom';
	import { getParsedOptions, getFilteredOptions } from './options/utils';
	import { onMount } from 'svelte';
	import Options from './options/Options.svelte';
	import { cn } from '../utils';
	import Input from './Input.svelte';
	import { fade } from 'svelte/transition';

	type $$Props = MultiSelectProps;

	export let options: $$Props['options'] = [];
	export let value: $$Props['value'] = [];
	export let clearable: $$Props['clearable'] = false;
	export let searchable: $$Props['searchable'] = false;
	export let checkIconPosition: $$Props['checkIconPosition'] = 'left';
	export let withCheckIcon: $$Props['withCheckIcon'] = true;
	export let disabled: $$Props['disabled'] = false;
	export let error: $$Props['error'] = undefined;
	export let label: $$Props['label'] = undefined;
	export let id: $$Props['id'] = undefined;

	let selectedOptions: Array<Option> | undefined = undefined;
	let search = '';

	$: parsedOptions = getParsedOptions(options);
	$: filteredOptions = searchable ? getFilteredOptions(parsedOptions, search) : parsedOptions;

	let referenceElement: ReferenceElement;
	let inputElement: HTMLInputElement;
	let floatingElement: FloatingElement;
	let showFloatingElement = false;

	async function updatePosition() {
		const { x, y } = await computePosition(referenceElement, floatingElement, {
			placement: 'bottom',
			strategy: 'absolute',
			middleware: [
				offset(4),
				flip(),
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
			selectedOptions = undefined;
		} else {
			showFloatingElement = true;
		}
	}

	function handleSelect(event: CustomEvent<Option>) {
		const result = event.detail;

		if (selectedOptions?.map((item) => item.value).includes(result.value)) {
			selectedOptions = selectedOptions?.filter((item) => item.value !== result.value);
		} else {
			selectedOptions = [...(selectedOptions ?? []), result];
		}

		showFloatingElement = false;
	}

	function handleTextChange(event: Event) {
		search = (event.target as HTMLInputElement).value;
	}
</script>

<svelte:window on:click={handleWindowClick} on:keydown={handleKeyDown} />

<div class="w-full">
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

	<div
		class={cn(
			'flex w-full items-center rounded-lg border border-primary focus-within:ring-2 focus-within:ring-white',
			error ? 'border-danger' : 'border-dark'
		)}
		bind:this={referenceElement}
	>
		<div class="flex flex-wrap px-1">
			{#if selectedOptions}
				{#each selectedOptions as option}
					<span
						class="mr-1 inline-flex items-center rounded-full bg-primary px-2 py-[2px] text-sm text-white"
					>
						<span>{option.label}</span>
						<button
							type="button"
							class="ml-1 h-4 w-4"
							on:click|preventDefault|stopPropagation={() => {
								selectedOptions = selectedOptions?.filter((item) => item.value !== option.value);
							}}
						>
							<iconify-icon icon="mdi:close" width="16px" height="16px"></iconify-icon>
						</button>
					</span>
				{/each}
			{/if}
		</div>

		<Input
			{...$$restProps}
			{disabled}
			bind:value={search}
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
			borderless
			classes={{
				container: 'flex-1'
			}}
		>
			<svelte:fragment slot="right">
				<button type="button" tabindex="-1" on:click={handleAction} class="h-[16px] w-[16px]">
					{#if clearable && value !== undefined}
						<iconify-icon icon="mdi:close" width="16px" height="16px"></iconify-icon>
					{:else}
						<iconify-icon icon="mdi:unfold-more-horizontal" width="16px" height="16px"
						></iconify-icon>
					{/if}
				</button>
			</svelte:fragment>
		</Input>
	</div>

	<!-- Floating Element -->
	<div
		bind:this={floatingElement}
		class={cn(
			'absolute left-0 top-0 w-max rounded-lg border-2 border-primary bg-white p-1 shadow-lg',
			{ hidden: !showFloatingElement }
		)}
	>
		<div class="w-full overflow-y-auto" style:max-height="220px">
			<Options
				options={filteredOptions}
				{disabled}
				on:select={handleSelect}
				value={selectedOptions}
				{withCheckIcon}
				{checkIconPosition}
				multiple={true}
			/>
		</div>
	</div>

	{#if error}
		<p transition:fade class="text-medium text-sm text-danger">{error}</p>
	{/if}
</div>
