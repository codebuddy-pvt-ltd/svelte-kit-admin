<script context="module" lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import type { Color, Size, Radius } from './utils/theme';

	export interface ButtonProps extends HTMLButtonAttributes {
		variant?: 'filled' | 'outline' | 'subtle' | 'text';
		color?: Color;
		size?: Size;
		radius?: Radius;
		fullWidth?: boolean;
		block?: boolean;
		isLoading?: boolean;
		ref?: HTMLButtonElement;
	}
</script>

<script lang="ts">
	import { cn } from './utils';
	import { cva } from 'class-variance-authority';
	import { Rounded } from './utils/theme';

	type $$Props = ButtonProps;

	export let variant: $$Props['variant'] = 'filled';
	export let color: $$Props['color'] = 'primary';
	export let size: $$Props['size'] = 'md';
	export let fullWidth: $$Props['fullWidth'] = false;
	export let block: $$Props['block'] = false;
	export let radius: $$Props['radius'] = 'default';
	export let isLoading: $$Props['isLoading'] = false;
	export let disabled: $$Props['disabled'] = false;
	export let ref: $$Props['ref'] = undefined;

	let buttonVariants = cva(
		['relative font-bold transition-all duration-500 border-2 border-transparent'],
		{
			variants: {
				variant: {
					filled: 'shadow shadow-light hover:shadow-lg hover:shadow-light',
					outline: '',
					subtle: '',
					text: ''
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
					xs: 'px-2 py-1 text-xs',
					sm: 'px-3 py-2 text-sm',
					md: 'px-5 py-3 text-md',
					lg: 'px-6 py-4 text-lg',
					xl: 'px-8 py-5 text-lg'
				},
				disabled: {
					true: 'opacity-50 cursor-not-allowed'
				},
				isLoading: {
					true: 'cursor-not-allowed'
				},
				radius: Rounded
			},
			defaultVariants: {
				variant: 'filled',
				color: 'primary',
				size: 'md'
			},
			compoundVariants: [
				// Filled
				{
					variant: 'filled',
					color: 'primary',
					class: 'bg-primary text-white'
				},
				{
					variant: 'filled',
					color: 'accent',
					class: 'bg-accent'
				},
				{
					variant: 'filled',
					color: 'dark',
					class: 'bg-dark text-white'
				},
				{
					variant: 'filled',
					color: 'light',
					class: 'bg-light'
				},
				{
					variant: 'filled',
					color: 'success',
					class: 'bg-success'
				},
				{
					variant: 'filled',
					color: 'warning',
					class: 'bg-warning'
				},
				{
					variant: 'filled',
					color: 'danger',
					class: 'bg-danger'
				},
				// Outlined
				{
					variant: 'outline',
					color: 'primary',
					class: 'border-2 border-primary text-primary'
				},
				{
					variant: 'outline',
					color: 'accent',
					class: 'border-2 border-accent text-accent'
				},
				{
					variant: 'outline',
					color: 'dark',
					class: 'border-2 border-dark text-dark'
				},
				{
					variant: 'outline',
					color: 'light',
					class: 'border-2 border-light text-light'
				},
				{
					variant: 'outline',
					color: 'success',
					class: 'border-2 border-success text-success'
				},
				{
					variant: 'outline',
					color: 'warning',
					class: 'border-2 border-warning text-warning'
				},
				{
					variant: 'outline',
					color: 'danger',
					class: 'border-2 border-danger text-danger'
				},
				{
					variant: 'filled',
					color: 'danger',
					class: 'bg-danger'
				},
				// Subtle
				{
					variant: 'subtle',
					color: 'primary',
					class: 'bg-primary bg-opacity-30 text-primary'
				},
				{
					variant: 'subtle',
					color: 'accent',
					class: 'bg-accent bg-opacity-30 text-accent'
				},
				{
					variant: 'subtle',
					color: 'dark',
					class: 'bg-dark bg-opacity-30 text-dark'
				},
				{
					variant: 'subtle',
					color: 'light',
					class: 'bg-light bg-opacity-30 text-light'
				},
				{
					variant: 'subtle',
					color: 'success',
					class: 'bg-success bg-opacity-30 text-success'
				},
				{
					variant: 'subtle',
					color: 'warning',
					class: 'bg-warning bg-opacity-30 text-warning'
				},
				{
					variant: 'subtle',
					color: 'danger',
					class: 'bg-danger bg-opacity-30 text-danger'
				},
				// Text
				{
					variant: 'text',
					color: 'primary',
					class: 'text-primary hover:bg-primary hover:bg-opacity-25'
				},
				{
					variant: 'text',
					color: 'accent',
					class: 'text-accent hover:bg-accent hover:bg-opacity-25'
				},
				{
					variant: 'text',
					color: 'dark',
					class: 'text-dark hover:bg-dark hover:bg-opacity-25'
				},
				{
					variant: 'text',
					color: 'light',
					class: 'text-light hover:bg-light hover:bg-opacity-25'
				},
				{
					variant: 'text',
					color: 'success',
					class: 'text-success hover:bg-success hover:bg-opacity-25'
				},
				{
					variant: 'text',
					color: 'warning',
					class: 'text-warning hover:bg-warning hover:bg-opacity-25'
				},
				{
					variant: 'text',
					color: 'danger',
					class: 'text-danger hover:bg-danger hover:bg-opacity-25'
				}
			]
		}
	);
</script>

<button
	{...$$restProps}
	class={cn(
		buttonVariants({ variant, color, size, disabled, isLoading, radius }),
		{
			block,
			'w-full': fullWidth,
			'text-opacity-10': isLoading
		},
		$$restProps.class
	)}
	disabled={isLoading || disabled}
	bind:this={ref}
>
	{#if isLoading}
		{#if $$slots.loader}
			<slot name="loader" />
		{:else}
			<span class="loader"></span>
		{/if}
	{/if}
	<span
		class={cn({
			'opacity-0': isLoading
		})}
	>
		<slot />
	</span>
</button>

<style>
	.loader {
		width: 10px;
		height: 10px;
		border-radius: 50%;
		display: block;
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		color: var(--light-color);
		left: -100px;
		box-sizing: border-box;
		animation: shadowRolling 2s linear infinite;
	}

	@keyframes shadowRolling {
		0% {
			box-shadow:
				0px 0 rgba(255, 255, 255, 0),
				0px 0 rgba(255, 255, 255, 0),
				0px 0 rgba(255, 255, 255, 0),
				0px 0 rgba(255, 255, 255, 0);
		}
		12% {
			box-shadow:
				100px 0 var(--light-color),
				0px 0 rgba(255, 255, 255, 0),
				0px 0 rgba(255, 255, 255, 0),
				0px 0 rgba(255, 255, 255, 0);
		}
		25% {
			box-shadow:
				110px 0 var(--light-color),
				100px 0 var(--light-color),
				0px 0 rgba(255, 255, 255, 0),
				0px 0 rgba(255, 255, 255, 0);
		}
		36% {
			box-shadow:
				120px 0 var(--light-color),
				110px 0 var(--light-color),
				100px 0 var(--light-color),
				0px 0 rgba(255, 255, 255, 0);
		}
		50% {
			box-shadow:
				130px 0 var(--light-color),
				120px 0 var(--light-color),
				110px 0 var(--light-color),
				100px 0 var(--light-color);
		}
		62% {
			box-shadow:
				200px 0 rgba(255, 255, 255, 0),
				130px 0 var(--light-color),
				120px 0 var(--light-color),
				110px 0 var(--light-color);
		}
		75% {
			box-shadow:
				200px 0 rgba(255, 255, 255, 0),
				200px 0 rgba(255, 255, 255, 0),
				130px 0 var(--light-color),
				120px 0 var(--light-color);
		}
		87% {
			box-shadow:
				200px 0 rgba(255, 255, 255, 0),
				200px 0 rgba(255, 255, 255, 0),
				200px 0 rgba(255, 255, 255, 0),
				130px 0 var(--light-color);
		}
		100% {
			box-shadow:
				200px 0 rgba(255, 255, 255, 0),
				200px 0 rgba(255, 255, 255, 0),
				200px 0 rgba(255, 255, 255, 0),
				200px 0 rgba(255, 255, 255, 0);
		}
	}
</style>
