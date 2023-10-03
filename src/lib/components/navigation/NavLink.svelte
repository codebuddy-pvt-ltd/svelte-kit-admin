<script context="module" lang="ts">
	import { cva } from 'class-variance-authority';
	import type { Color } from '../utils/theme';
	import { cn } from '../utils';

	export interface NavLinkProps {
		variant?: 'filled' | 'subtle' | 'default';
		color?: Color;
		active?: boolean;
		leftIcon?: string;
		rightIcon?: string;
		component?: 'button' | 'a';
	}
</script>

<script lang="ts">
	type $$Props = NavLinkProps;

	export let variant: $$Props['variant'] = 'default';
	export let color: $$Props['color'] = 'primary';
	export let active: $$Props['active'] = false;
	export let leftIcon: $$Props['leftIcon'] = '';
	export let rightIcon: $$Props['rightIcon'] = '';
	export let component: $$Props['component'] = 'a';

	let navLinkVariants = cva(
		['flex items-center gap-x-3 cursor-pointer px-3 py-1 transition-colors'],
		{
			variants: {
				variant: {
					filled: '',
					subtle: '',
					default: ''
				},
				color: {
					primary: 'bg-primary bg-opacity-0 text-primary',
					accent: 'bg-accent bg-opacity-0 text-accent',
					dark: 'bg-dark bg-opacity-0 text-dark',
					light: 'bg-light bg-opacity-0 text-light',
					success: 'bg-success bg-opacity-0 text-success',
					danger: 'bg-danger bg-opacity-0 text-danger',
					warning: 'bg-warning bg-opacity-0 text-warning'
				},
				active: {
					true: 'font-semibold',
					false: 'font-normal'
				}
			},
			compoundVariants: [
				// default
				{
					variant: 'default',
					color: 'primary',
					class: 'hover:bg-primary hover:bg-opacity-50'
				},
				{
					variant: 'default',
					color: 'accent',
					class: 'hover:bg-accent hover:bg-opacity-50'
				},
				{
					variant: 'default',
					color: 'dark',
					class: 'hover:bg-dark hover:bg-opacity-50'
				},
				{
					variant: 'default',
					color: 'light',
					class: 'hover:bg-light hover:bg-opacity-50'
				},
				{
					variant: 'default',
					color: 'success',
					class: 'hover:bg-success hover:bg-opacity-50'
				},
				{
					variant: 'default',
					color: 'danger',
					class: 'hover:bg-danger hover:bg-opacity-50'
				},
				{
					variant: 'default',
					color: 'warning',
					class: 'hover:bg-warning hover:bg-opacity-50'
				},
				// Subtle
				{
					variant: 'subtle',
					color: 'primary',
					class: 'hover:bg-primary hover:bg-opacity-40'
				},
				{
					variant: 'subtle',
					color: 'accent',
					class: 'hover:bg-accent hover:bg-opacity-40'
				},
				{
					variant: 'subtle',
					color: 'dark',
					class: 'hover:bg-dark hover:bg-opacity-40'
				},
				{
					variant: 'subtle',
					color: 'light',
					class: 'hover:bg-light hover:bg-opacity-40'
				},
				{
					variant: 'subtle',
					color: 'success',
					class: 'hover:bg-success hover:bg-opacity-40'
				},
				{
					variant: 'subtle',
					color: 'danger',
					class: 'hover:bg-danger hover:bg-opacity-40'
				},
				{
					variant: 'subtle',
					color: 'warning',
					class: 'hover:bg-warning hover:bg-opacity-40'
				},
				// Filled
				{
					variant: 'filled',
					color: 'primary',
					class: 'hover:bg-opacity-80'
				},
				{
					variant: 'filled',
					color: 'accent',
					class: 'hover:bg-opacity-80'
				},
				{
					variant: 'filled',
					color: 'dark',
					class: 'hover:bg-opacity-80'
				},
				{
					variant: 'filled',
					color: 'light',
					class: 'hover:bg-opacity-80'
				},
				{
					variant: 'filled',
					color: 'success',
					class: 'hover:bg-opacity-80'
				},
				{
					variant: 'filled',
					color: 'danger',
					class: 'hover:bg-opacity-80'
				},
				{
					variant: 'filled',
					color: 'warning',
					class: 'hover:bg-opacity-80'
				},
				// Active
				{
					variant: 'filled',
					active: true,
					class: 'bg-opacity-100 text-white'
				},
				{
					variant: 'subtle',
					active: true,
					class: 'bg-opacity-60'
				},
				{
					variant: 'default',
					active: true,
					class: 'bg-opacity-10'
				}
			]
		}
	);
</script>

<svelte:element this={component} class={cn(navLinkVariants({ variant, color, active }))}>
	{#if $$slots.left}
		<slot name="left" />
	{:else if leftIcon}
		<iconify-icon icon={leftIcon} class="h-4 w-4" />
	{/if}

	<div class="flex gap-y-1">
		<slot />
		<slot name="description" />
	</div>

	{#if $$slots.right}
		<slot name="right" />
	{:else if rightIcon}
		<iconify-icon icon={rightIcon} class="ml-auto h-4 w-4" />
	{/if}
</svelte:element>
