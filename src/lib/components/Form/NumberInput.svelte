<script context="module" lang="ts">
	import type { TextInputProps } from './TextInput.svelte';

	export type NumberInputProps = Omit<TextInputProps, 'type'>;
</script>

<script lang="ts">
	import TextInput from './TextInput.svelte';

	type $$Props = NumberInputProps;

	export let value: $$Props['value'] = undefined;

	function handleIncrement() {
		value = (value ?? 0) + 1;
	}

	function handleDecrement() {
		value = (value ?? 0) - 1;
	}
</script>

<TextInput
	{...$$restProps}
	{value}
	type="number"
	class="[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
>
	<div slot="right" class="flex flex-col">
		<button
			type="button"
			on:click={handleIncrement}
			class="flex p-0 text-sm hover:bg-primary hover:bg-opacity-10 focus:bg-primary focus:bg-opacity-10"
		>
			<iconify-icon icon="mdi:chevron-up"></iconify-icon>
		</button>
		<button
			type="button"
			on:click={handleDecrement}
			class="flex p-0 text-sm hover:bg-primary hover:bg-opacity-10 focus:bg-primary focus:bg-opacity-10"
		>
			<iconify-icon icon="mdi:chevron-down"></iconify-icon>
		</button>
	</div>
</TextInput>
