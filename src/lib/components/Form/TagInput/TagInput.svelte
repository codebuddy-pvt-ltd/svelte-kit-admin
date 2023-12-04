<script context="module" lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';

	export interface TagInputProps extends Omit<HTMLInputAttributes, 'type'> {
		allowDuplicates?: boolean;
		clearable?: boolean;
		options?: Array<string>;
		label?: string;
		description?: string;
		disabled?: boolean;
		error?: string;
		limit?: number;
		required?: boolean;
		searchable?: boolean;
	}
</script>

<script lang="ts">
	import { cn } from '$lib/components/utils';
	import { fade } from 'svelte/transition';
	import { autoUpdate, computePosition, flip, offset, size } from '@floating-ui/dom';
	import type { FloatingElement, ReferenceElement } from '@floating-ui/core';
	import { onMount } from 'svelte';
	import Input from '../Input.svelte';
	import Options from '../options/Options.svelte';
	import { getFilteredOptions, getParsedOptions } from '../options/utils';
	import type { Option } from '../options/types';

	type $$Props = TagInputProps;

	export let allowDuplicates: $$Props['allowDuplicates'] = false;
	export let clearable: $$Props['clearable'] = false;
	export let options: $$Props['options'] = [];
	export let label: $$Props['label'] = undefined;
	export let description: $$Props['description'] = undefined;
	export let disabled: $$Props['disabled'] = false;
	export let error: $$Props['error'] = undefined;
	export let limit: $$Props['limit'] = Infinity;
	export let required: $$Props['required'] = false;
	export let value: $$Props['value'] = undefined;
	export let name: $$Props['name'] = undefined;
	export let id: $$Props['id'] = undefined;
	export let searchable: $$Props['searchable'] = false;

	let referenceElement: ReferenceElement;
	let inputElement: HTMLInputElement;
	let floatingElement: FloatingElement;
	let showFloatingElement = false;

	let selectedOptions: Array<string> | undefined = undefined;
	let search = '';

	$: parsedOptions = getParsedOptions(options ?? []);
	$: filteredOptions = searchable ? getFilteredOptions(parsedOptions, search) : parsedOptions;

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

		if (clearable) {
			value = undefined;
			search = '';
			selectedOptions = [];
		} else {
			showFloatingElement = true;
		}
	}

	function handleAddItem(item: string) {
		if (selectedOptions === undefined) {
			selectedOptions = [item];
		} else {
			if (allowDuplicates) {
				if (selectedOptions.length === limit) {
					selectedOptions = [...selectedOptions.slice(1), item];
				} else {
					selectedOptions = [...selectedOptions, item];
				}
			} else {
				if (selectedOptions.length === limit) {
					selectedOptions = [...selectedOptions.slice(1), item];
				} else {
					selectedOptions = [...new Set([...selectedOptions, item])];
				}
			}
		}
	}

	function handleSelect(event: CustomEvent<Option>) {
		const result = event.detail;

		handleAddItem(String(result.value));

		showFloatingElement = false;
	}

	function handleTextChange(event: Event) {
		search = (event.target as HTMLInputElement).value;
	}

	function handleInputKeyDown(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			event.preventDefault();
			event.stopPropagation();
			showFloatingElement = true;

			if (search) {
				handleAddItem(search);
			}

			search = '';
		}
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
			{#if required}
				<span class="text-medium text-danger">*</span>
			{/if}
		</label>
	{/if}

	{#if description || $$slots.description}
		<p class="text-medium text-sm text-dark">
			{#if $$slots.description}
				<slot name="description" />
			{:else if description}
				{description}
			{/if}
		</p>
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
				{#each selectedOptions as option, index}
					<span
						class="mr-1 inline-flex items-center rounded-full bg-primary px-2 py-[2px] text-sm text-white"
					>
						<span>{option}</span>
						<button
							type="button"
							class="ml-1 h-4 w-4"
							on:click|preventDefault|stopPropagation={() => {
								selectedOptions = selectedOptions?.filter((_, i) => i !== index);
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
			on:keydown={handleInputKeyDown}
			on:input={handleTextChange}
			borderless
			classes={{
				container: 'flex-1'
			}}
		>
			<svelte:fragment slot="right">
				<button type="button" tabindex="-1" on:click={handleAction} class="h-[16px] w-[16px]">
					{#if clearable && selectedOptions?.length}
						<iconify-icon icon="mdi:close" width="16px" height="16px"></iconify-icon>
					{/if}
				</button>
			</svelte:fragment>
		</Input>
	</div>

	<input type="hidden" {name} value={selectedOptions?.join(',')} />

	<!-- Floating Element -->

	<div
		bind:this={floatingElement}
		class={cn(
			'absolute left-0 top-0 w-max rounded-lg border-2 border-primary bg-white p-1 shadow-lg',
			{ hidden: !(showFloatingElement && searchable) }
		)}
	>
		<div class="w-full overflow-y-auto" style:max-height="220px">
			<Options
				options={filteredOptions}
				{disabled}
				on:select={handleSelect}
				value={selectedOptions?.map((item) => ({ label: item, value: item })) ?? []}
				multiple={true}
			/>
		</div>
	</div>

	{#if error}
		<p transition:fade class="text-medium text-sm text-danger">{error}</p>
	{/if}
</div>
