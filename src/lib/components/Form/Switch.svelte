<script context="module" lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';

	export interface SwitchProps extends HTMLInputAttributes {
		ref?: HTMLInputElement;
		error?: string;
		labelPosition?: 'left' | 'right';
		description?: string;
		disabled?: boolean;
	}
</script>

<script lang="ts">
	import { v4 } from 'uuid';
	import { cn } from '../utils';
	import { tweened } from 'svelte/motion';
	import { cubicInOut } from 'svelte/easing';

	type $$Props = SwitchProps;

	export let id: $$Props['id'] = v4();
	export let error: $$Props['error'] = undefined;
	export let ref: $$Props['ref'] = undefined;
	export let disabled: $$Props['disabled'] = false;
	export let checked: $$Props['checked'] = false;
	export let labelPosition: $$Props['labelPosition'] = 'right';
	export let description: $$Props['description'] = undefined;

	let switchRef: HTMLLabelElement;
	let dotRef: HTMLDivElement;

	const left = tweened(2, {
		duration: 500,
		easing: cubicInOut
	});

	function handleChange(e: Event) {
		const target = e.target as HTMLInputElement;
		checked = target.checked;

		$left = checked ? switchRef.offsetWidth - dotRef.offsetWidth - 2 : 2;
	}
</script>

<div class="flex gap-x-2">
	{#if labelPosition === 'left'}
		<div class="flex flex-col gap-x-1">
			<label
				for={id}
				class={cn('cursor-pointer text-base', {
					'text-disabled': disabled
				})}
			>
				<slot />
			</label>

			{#if description}
				<p class="text-xs text-primary opacity-50">{description}</p>
			{/if}

			{#if error}
				<p class="text-xs text-danger">{error}</p>
			{/if}
		</div>
	{/if}

	<label
		for={id}
		class={cn('relative h-6 w-12 cursor-pointer rounded-full bg-primary', {
			'bg-opacity-20': disabled,
			'ring ring-danger ring-opacity-50': error
		})}
		bind:this={switchRef}
	>
		<input
			type="checkbox"
			{id}
			{disabled}
			{checked}
			bind:this={ref}
			on:change={handleChange}
			aria-errormessage={error}
			class={cn('appearance-none')}
		/>

		<div
			bind:this={dotRef}
			class={cn('absolute top-[2px] h-5 w-5 rounded-full bg-white')}
			style="left: {$left}px"
		></div>
	</label>

	{#if labelPosition === 'right'}
		<div class="flex flex-col gap-x-1">
			<label
				for={id}
				class={cn('cursor-pointer text-base', {
					'text-disabled': disabled
				})}
			>
				<slot />
			</label>

			{#if description}
				<p class="text-xs text-primary opacity-50">{description}</p>
			{/if}

			{#if error}
				<p class="text-xs text-danger">{error}</p>
			{/if}
		</div>
	{/if}
</div>
