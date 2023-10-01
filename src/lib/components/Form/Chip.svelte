<script context="module" lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';
	import type { Color, Radius, Size } from '../utils/theme';

	export interface ChipProps extends Omit<HTMLInputAttributes, 'size'> {
		variant?: 'filled' | 'subtle' | 'outline';
		color?: Color;
		size?: Size;
		radius?: Radius;
		ref?: HTMLInputElement;
	}
</script>

<script lang="ts">
	import { v4 } from 'uuid';
	import { cva } from 'class-variance-authority';
	import { cn } from '../utils';
	import { scale } from 'svelte/transition';
	import { backInOut } from 'svelte/easing';

	type $$Props = ChipProps;

	export let variant: $$Props['variant'] = 'filled';
	export let color: $$Props['color'] = 'primary';
	export let size: $$Props['size'] = 'md';
	export let radius: $$Props['radius'] = 'full';
	export let disabled: $$Props['disabled'] = false;
	export let ref: $$Props['ref'] = undefined;
	export let id: $$Props['id'] = v4();
	export let checked: $$Props['checked'] = false;

	let chipVariants = cva(
		['inline-flex gap-x-1 items-center cursor-pointer bg-dark py-1 border border-transparent'],
		{
			variants: {
				variant: {
					filled: 'text-white',
					subtle: 'text-white',
					outline: 'bg-transparent'
				},
				color: {
					primary: '',
					accent: '',
					dark: '',
					light: '',
					success: '',
					warning: '',
					danger: ''
				},
				size: {
					xs: 'px-2 text-xs',
					sm: 'px-3 text-sm',
					md: 'px-5 text-md',
					lg: 'px-6 text-lg',
					xl: 'px-8 text-xl'
				},
				radius: {
					none: '',
					sm: 'rounded-sm',
					default: 'rounded',
					md: 'rounded-md',
					lg: 'rounded-lg',
					xl: 'rounded-xl',
					'2xl': 'rounded-2xl',
					'3xl': 'rounded-3xl',
					full: 'rounded-full'
				},
				disabled: {
					true: 'opacity-50 cursor-not-allowed'
				},
				checked: {
					true: 'border',
					false: 'bg-opacity-5'
				}
			},
			defaultVariants: {
				variant: 'filled',
				color: 'primary',
				size: 'md',
				radius: 'default'
			},
			compoundVariants: [
				// Filled
				{
					variant: 'filled',
					color: 'primary',
					checked: true,
					class: 'bg-primary text-white'
				},
				{
					variant: 'filled',
					color: 'accent',
					checked: true,
					class: 'bg-accent text-white'
				},
				{
					variant: 'filled',
					color: 'dark',
					checked: true,
					class: 'bg-dark text-white'
				},
				{
					variant: 'filled',
					color: 'light',
					checked: true,
					class: 'bg-light text-white'
				},
				{
					variant: 'filled',
					color: 'success',
					checked: true,
					class: 'bg-success text-white'
				},
				{
					variant: 'filled',
					color: 'warning',
					checked: true,
					class: 'bg-warning text-white'
				},
				{
					variant: 'filled',
					color: 'danger',
					checked: true,
					class: 'bg-danger text-white'
				},
				// Outline
				{
					variant: 'outline',
					color: 'primary',
					checked: true,
					class: 'border-primary text-primary'
				},
				{
					variant: 'outline',
					color: 'accent',
					checked: true,
					class: 'border-accent text-accent'
				},
				{
					variant: 'outline',
					color: 'dark',
					checked: true,
					class: 'border-dark text-dark'
				},
				{
					variant: 'outline',
					color: 'light',
					checked: true,
					class: 'border-light text-light'
				},
				{
					variant: 'outline',
					color: 'success',
					checked: true,
					class: 'border-success text-success'
				},
				{
					variant: 'outline',
					color: 'warning',
					checked: true,
					class: 'border-warning text-warning'
				},
				{
					variant: 'outline',
					color: 'danger',
					checked: true,
					class: 'border-danger text-danger'
				},
				// Subtle
				{
					variant: 'subtle',
					color: 'primary',
					checked: true,
					class: 'bg-primary bg-opacity-50 text-primary'
				},
				{
					variant: 'subtle',
					color: 'accent',
					checked: true,
					class: 'bg-accent bg-opacity-50 text-accent'
				},
				{
					variant: 'subtle',
					color: 'dark',
					checked: true,
					class: 'bg-dark bg-opacity-50 text-dark'
				},
				{
					variant: 'subtle',
					color: 'light',
					checked: true,
					class: 'bg-light bg-opacity-50 text-light'
				},
				{
					variant: 'subtle',
					color: 'success',
					checked: true,
					class: 'bg-success bg-opacity-50 text-success'
				},
				{
					variant: 'subtle',
					color: 'warning',
					checked: true,
					class: 'bg-warning bg-opacity-50 text-warning'
				},
				{
					variant: 'subtle',
					color: 'danger',
					checked: true,
					class: 'bg-danger bg-opacity-50 text-danger'
				}
			]
		}
	);

	function handleChange(e: Event) {
		const target = e.target as HTMLInputElement;
		checked = target.checked;
	}
</script>

<label for={id} class={cn(chipVariants({ variant, color, size, radius, disabled, checked }))}>
	<input
		{...$$restProps}
		class="hidden"
		type="checkbox"
		{id}
		{checked}
		on:change={handleChange}
		bind:this={ref}
		{disabled}
	/>

	{#if checked}
		<span
			class="flex items-center justify-center"
			in:scale={{ duration: 500, delay: 0, opacity: 0.5, start: 0.5, easing: backInOut }}
		>
			{#if $$slots.icon}
				<slot name="icon" />
			{:else}
				<iconify-icon icon="mdi:check" width="16px" height="16px" />
			{/if}
		</span>
	{/if}

	<span class="">
		<slot />
	</span>
</label>
