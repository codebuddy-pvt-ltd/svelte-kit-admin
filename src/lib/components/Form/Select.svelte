<script context="module" lang="ts">
	import type { TextInputProps } from './TextInput.svelte';
	import type { Option, OptionItem, OptionValue } from './options/types';

	export interface SelectProps extends TextInputProps {
		value?: OptionValue;
		options: Array<OptionItem>;
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
	import { autoUpdate, computePosition, flip, offset, size } from '@floating-ui/dom';
	import { cn } from '../utils';
	import { parseOptions, searchFilterOptions } from './options/utils';
	import Options from './options/Options.svelte';

	type $$Props = SelectProps;

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

	let selectedOption: Option | undefined = undefined;
	let search = '';

	$: parsedOptions = parseOptions(options);
	$: filteredOptions = searchable ? searchFilterOptions(parsedOptions, search) : parsedOptions;

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
			selectedOption = undefined;
		} else {
			showFloatingElement = true;
		}
	}

	function handleSelect(event: CustomEvent<Option>) {
		const result = event.detail;

		selectedOption = result;
		value = result.value;
		search = result.label;

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
				value={selectedOption}
				{withCheckIcon}
				{checkIconPosition}
			/>
		</div>
	</div>
</div>
