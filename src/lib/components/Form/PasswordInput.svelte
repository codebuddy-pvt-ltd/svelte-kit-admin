<script context="module" lang="ts">
	import type { TextInputProps } from './TextInput.svelte';

	export interface PasswordInput extends Omit<TextInputProps, 'type'> {
		type?: 'password' | 'text';
	}
</script>

<script lang="ts">
	import TextInput from './TextInput.svelte';

	type $$Props = PasswordInput;

	export let type: $$Props['type'] = 'password';

	function toggleType() {
		type = type === 'password' ? 'text' : 'password';
	}
</script>

<TextInput {...$$restProps} {type}>
	<svelte:fragment slot="right">
		<button
			type="button"
			on:click={toggleType}
			class="flex h-[1rem] w-[1rem] items-center justify-center"
		>
			{#if type === 'password'}
				<iconify-icon icon="mdi:eye-off-outline"></iconify-icon>
			{:else}
				<iconify-icon icon="mdi:eye-outline"></iconify-icon>
			{/if}
		</button>
	</svelte:fragment>
</TextInput>
