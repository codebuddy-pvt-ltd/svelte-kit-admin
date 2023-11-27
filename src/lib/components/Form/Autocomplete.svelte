<script context="module" lang="ts">
	import type { TextInputProps } from './TextInput.svelte';
	import type { OptionValue, Option, GroupedBaseOption } from './options/types';

	export interface AutocompleteProps extends TextInputProps {
		value?: OptionValue;
		options: Array<OptionValue | GroupedBaseOption>;
		disabled?: boolean;
	}
</script>

<script lang="ts">
	import { onMount } from 'svelte';
	import TextInput from './TextInput.svelte';
	import type { ReferenceElement, FloatingElement } from '@floating-ui/core';
	import { autoUpdate, computePosition, offset, size, flip } from '@floating-ui/dom';
	import { cn } from '../utils';
	import Options from './options/Options.svelte';
	import { isOptionValue, getParsedOptions, getFilteredOptions } from './options/utils';

	type $$Props = AutocompleteProps;

	export let options: $$Props['options'] = [];
	export let value: $$Props['value'] = undefined;
	export let disabled: $$Props['disabled'] = false;

	let referenceElement: ReferenceElement;
	let inputElement: HTMLInputElement;
	let floatingElement: FloatingElement;

	let showFloatingElement = false;
	let search = '';

	$: parsedOptions = getParsedOptions(options);

	$: filteredOptions = getFilteredOptions(parsedOptions, search);

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

	function handleSelect(event: CustomEvent<OptionValue | Option>) {
		const result = event.detail;
		if (isOptionValue(result)) {
			value = result;
			search = typeof result === 'string' ? result : result.toString();
		} else {
			value = result.label;
			search = result.label;
		}

		showFloatingElement = false;
	}

	function handleTextChange(event: Event) {
		search = (event.target as HTMLInputElement).value;

		if (!showFloatingElement) {
			showFloatingElement = true;
		}
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
	/>

	<div
		bind:this={floatingElement}
		class={cn(
			'absolute left-0 top-0 w-max rounded-lg border-2 border-primary bg-white p-1 shadow-lg',
			{ hidden: !showFloatingElement }
		)}
	>
		<div class="w-full overflow-y-auto" style:max-height="220px">
			<Options options={filteredOptions} {disabled} on:select={handleSelect} />
		</div>
	</div>
</div>
