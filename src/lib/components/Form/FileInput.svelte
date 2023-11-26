<script context="module" lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';

	export interface FileInputProps<T extends boolean> extends Omit<HTMLInputAttributes, 'type'> {
		ref?: HTMLInputElement;
		clearable?: boolean;
		label?: string;
		description?: string;
		error?: string;
		disabled?: boolean;
		multiple?: T;
		value?: (T extends true ? FileList : File) | null | undefined;
	}
</script>

<script lang="ts" generics="Multiple extends boolean = false">
	import { cn } from '../utils';
	import { fade } from 'svelte/transition';
	import { v4 } from 'uuid';

	// TODO: REMOVE WHEN https://github.com/sveltejs/svelte-eslint-parser/issues/306 IS FIXED
	// eslint-disable-next-line no-undef
	type T = Multiple;

	type $$Props = FileInputProps<T>;

	export let ref: $$Props['ref'] = undefined;
	export let clearable: $$Props['clearable'] = false;
	export let label: $$Props['label'] = undefined;
	export let description: $$Props['description'] = undefined;
	export let error: $$Props['error'] = undefined;
	export let disabled: $$Props['disabled'] = false;
	export let multiple: T = false as T;
	export let value: $$Props['value'] = undefined;
	export let id: $$Props['id'] = v4();
	export let placeholder: $$Props['placeholder'] = 'Select your files';

	let files: FileList | null = null;

	$: filenames = files ? Array.from(files).map((file) => file.name) : [];

	function removeFile(index: number) {
		const dataTransfer = new DataTransfer();

		if (files) {
			for (let i = 0; i < files.length; i++) {
				const item = files.item(i);
				if (i !== index && item) {
					dataTransfer.items.add(item);
				}
			}

			files = dataTransfer.files;
		}
	}

	function removeFiles() {
		files = null;
	}

	$: value = (multiple ? files : files?.item(0)) as $$Props['value'];
</script>

<div class={cn($$props.class)}>
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

	{#if description || $$slots.description}
		{#if description}
			<p class="text-sm text-primary opacity-50">{description}</p>
		{:else if $$slots.description}
			<slot name="description" />
		{/if}
	{/if}
	<label for={id} class={cn('flex gap-4 rounded-lg border')}>
		<div
			class={cn('flex w-full items-center px-1 py-1 text-sm', {
				'text-danger': error
			})}
		>
			{#if filenames.length === 0}
				<p class="opacity-50">{placeholder}</p>
			{:else}
				{#each filenames as filename, index}
					<span
						class="inline-flex items-center gap-x-1 rounded-full bg-primary px-2 py-1 text-sm shadow"
					>
						{filename}
						{#if clearable}
							<button
								type="button"
								class="h-4 w-4 text-sm"
								on:click|preventDefault|stopPropagation={() => removeFile(index)}
							>
								<iconify-icon icon="mdi:close" width="1rem" height="1rem"></iconify-icon>
							</button>
						{/if}
					</span>
				{/each}

				{#if clearable}
					<button
						type="button"
						class="ml-auto h-4 w-4 text-sm"
						on:click|preventDefault|stopPropagation={removeFiles}
					>
						<iconify-icon icon="mdi:close" width="1rem" height="1rem"></iconify-icon>
					</button>
				{/if}
			{/if}
		</div>
	</label>

	<input
		{...$$restProps}
		type="file"
		{id}
		bind:this={ref}
		bind:files
		{multiple}
		{disabled}
		class="hidden"
	/>

	{#if error}
		<p transition:fade class="text-medium text-sm text-danger">{error}</p>
	{/if}
</div>
