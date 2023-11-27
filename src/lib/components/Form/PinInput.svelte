<script context="module" lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';

	export interface PinInputProps extends Omit<HTMLInputAttributes, 'type'> {
		error?: string | undefined | null;
		label?: string | undefined | null;
		description?: string | undefined | null;
		required?: boolean;
		disabled?: boolean;
		classes?: {
			container?: string;
		};
		length?: number;
		masked?: boolean;
		oneTimeCode?: boolean;
		type?: 'number' | 'alphanumeric' | RegExp;
	}
</script>

<script lang="ts">
	import { v4 } from 'uuid';
	import { cn } from '../utils';
	import { fade } from 'svelte/transition';

	type $$Props = PinInputProps;

	export let error: $$Props['error'] = undefined;
	export let label: $$Props['label'] = undefined;
	export let description: $$Props['description'] = undefined;
	export let required: $$Props['required'] = false;
	export let disabled: $$Props['disabled'] = false;
	export let classes: $$Props['classes'] = {};
	export let length: $$Props['length'] = 6;
	export let masked: $$Props['masked'] = false;
	export let oneTimeCode: $$Props['oneTimeCode'] = false;
	export let type: $$Props['type'] = 'number';
	export let id: $$Props['id'] = v4();
	export let placeholder: $$Props['placeholder'] = '○';
	export let name: $$Props['name'] = 'pin';
	export let value: $$Props['value'] = '';

	const inputs: Array<HTMLInputElement> = [];
	let focusedIndex = -1;

	function createPinArray(length: number, value: string) {
		if (length < 1) return [];

		const values = new Array<string>(length).fill('');

		if (value) {
			const splitted = value.split('');

			for (let i = 0; i < Math.min(length, splitted.length); i += 1) {
				values[i] = splitted[i];
			}
		}

		return values;
	}

	function validate(charOrValue: string) {
		if (type === 'number') {
			return !isNaN(Number(charOrValue));
		}

		if (type === 'alphanumeric') {
			return /^[a-zA-Z0-9]*$/.test(charOrValue);
		}

		if (type instanceof RegExp) {
			return type.test(charOrValue);
		}

		return true;
	}

	function setFieldValue(val: string, index: number) {
		const values = [...createPinArray(length ?? 0, value)];
		values[index] = val;
		inputs[index].value = val;
		value = values.join('');
	}

	function focusInputField(dir: 'next' | 'prev', index: number) {
		if (dir === 'next') {
			const nextIndex = index + 1;
			inputs[nextIndex < (length ?? 0) ? nextIndex : index].focus();
		}

		if (dir === 'prev') {
			const nextIndex = index - 1;

			inputs[nextIndex > -1 ? nextIndex : index].focus();
		}
	}

	function handleChange(e: Event, index: number) {
		const inputValue = (e.target as HTMLInputElement).value;

		const nextCharOrValue =
			inputValue.length === 2 ? inputValue.split('')[inputValue.length - 1] : inputValue;

		const isValid = validate(nextCharOrValue);

		if (nextCharOrValue.length < 2) {
			if (isValid) {
				setFieldValue(nextCharOrValue, index);
				focusInputField('next', index);
			} else {
				setFieldValue('', index);
			}
		} else if (isValid) {
			value = inputValue;
		}
	}

	function handleFocus(e: Event, index: number) {
		(e.target as HTMLInputElement).select();
		focusedIndex = index;
	}

	function handleBlur() {
		focusedIndex = -1;
	}

	function handleKeyDown(e: Event, index: number) {
		const key = (e as KeyboardEvent).key;

		if (key === 'ArrowLeft') {
			e.preventDefault();
			focusInputField('prev', index);
		} else if (key === 'ArrowRight') {
			e.preventDefault();
			focusInputField('next', index);
		} else if (key === 'Backspace') {
			e.preventDefault();
			setFieldValue('', index);

			if (length === index + 1) {
				if ((e.target as HTMLInputElement).value === '') {
					focusInputField('prev', index);
				}
			} else {
				focusInputField('prev', index);
			}
		} else if (key === 'Delete') {
			e.preventDefault();
			setFieldValue('', index);
			focusInputField('prev', index);
		}
	}
</script>

<div class={cn(classes?.container)}>
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
		<p class="text-gray-400 text-sm">
			{#if $$slots.description}
				<slot name="description" />
			{:else if description}
				{description}
			{/if}
		</p>
	{/if}

	<div class="flex items-center gap-4">
		{#each createPinArray(length ?? 0, value) as char, index}
			<input
				bind:this={inputs[index]}
				id={`${id}-${index}`}
				type={masked ? 'password' : type === 'number' ? 'number' : 'text'}
				autoComplete={oneTimeCode ? 'one-time-code' : 'off'}
				placeholder={focusedIndex === index ? '' : placeholder}
				{...$$restProps}
				{required}
				{disabled}
				class={cn(
					'h-10 w-10 rounded-lg border border-dark bg-transparent text-center text-2xl',
					{
						'bg-dark bg-opacity-10': disabled,
						'border-danger': error,
						'cursor-not-allowed': disabled,
						'placeholder:text-danger': error,
						'appearance-none': true
					},
					$$props.class
				)}
				value={char}
				on:input={(e) => handleChange(e, index)}
				on:keydown={(e) => handleKeyDown(e, index)}
				on:focus={(e) => handleFocus(e, index)}
				on:blur={handleBlur}
			/>
		{/each}

		<input type="hidden" {name} {value} />
	</div>

	{#if error}
		<p transition:fade class="text-medium text-sm text-danger">{error}</p>
	{/if}
</div>
