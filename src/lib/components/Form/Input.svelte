<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';
	import { cn } from '../utils';

	interface $$Props extends HTMLInputAttributes {
		error?: boolean;
	}

	export let error: $$Props['error'] = false;
</script>

<div
	class={cn(
		'flex flex-row items-center rounded-lg border',
		error ? 'border-2 border-danger' : 'border-dark'
	)}
>
	{#if $$slots.left}
		<div class="rounded-s-lg border-r px-2 py-1 empty:hidden">
			<slot name="left" />
		</div>
	{/if}
	<input {...$$restProps} class={cn('block w-full rounded-lg px-1 py-1', $$props.class)} />
	{#if $$slots.right}
		<div class="rounded-e-lg border-l px-2 py-1 empty:hidden">
			<slot name="right" />
		</div>
	{/if}
</div>