<script lang="ts">
	import { twMerge } from 'tailwind-merge';
	import type { HTMLInputAttributes } from 'svelte/elements';

	interface $$Props extends HTMLInputAttributes {
		error?: boolean;
	}

	export let error: $$Props['error'] = false;
</script>

<div
	class={twMerge(
		'flex flex-row items-center rounded-lg border',
		error ? 'border-2 border-danger' : 'border-dark'
	)}
>
	{#if $$slots.left}
		<div class="rounded-s-lg bg-accent px-2 py-1 empty:hidden">
			<slot name="left" />
		</div>
	{/if}
	<input class={twMerge('block w-full rounded-lg px-1 py-1')} {...$$restProps} />
	{#if $$slots.right}
		<div class="rounded-e-lg bg-accent px-2 py-1 empty:hidden">
			<slot name="right" />
		</div>
	{/if}
</div>
