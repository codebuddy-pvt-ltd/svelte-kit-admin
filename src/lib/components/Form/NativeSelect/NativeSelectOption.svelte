<script context="module" lang="ts">
	import type { HTMLBaseAttributes } from 'svelte/elements';
	import type { OptionParsedItem } from '../options/types';

	export interface NativeSelectOptionProps extends HTMLBaseAttributes {
		options: Array<OptionParsedItem>;
	}
</script>

<script lang="ts">
	import { isOptionGroup } from '../options/utils';

	type $$Props = NativeSelectOptionProps;

	export let options: $$Props['options'] = [];
</script>

{#each options as option}
	{#if isOptionGroup(option)}
		{@const item = option}
		<optgroup label={item.group}>
			<svelte:self options={item.items} />
		</optgroup>
	{:else}
		{@const item = option}
		<option value={item.value}>{item.label}</option>
	{/if}
{/each}
