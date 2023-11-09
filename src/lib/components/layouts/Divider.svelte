<script context="module" lang="ts">
	import type { HTMLBaseAttributes } from 'svelte/elements';
	import { cn } from '../utils';
	import type { Color } from '../utils/theme';
	import { cva } from 'class-variance-authority';

	export interface DividerProps extends HTMLBaseAttributes {
		labelPosition?: 'left' | 'right' | 'center';
		thickness?: number;
		color?: Color;
	}
</script>

<script lang="ts">
	type $Props = DividerProps;

	export let labelPosition: $Props['labelPosition'] = 'center';
	export let thickness: $Props['thickness'] = 1;
	export let color: $Props['color'] = 'primary';

	let dividerVariants = cva(['w-full flex-1'], {
		variants: {
			color: {
				primary: 'bg-primary',
				accent: 'bg-accent',
				dark: 'bg-dark',
				light: 'bg-light',
				success: 'bg-success',
				warning: 'bg-warning',
				danger: 'bg-danger'
			}
		}
	});
</script>

<div class={cn('my-4 flex items-center', $$props.class)} role="separator">
	{#if labelPosition !== 'left'}
		<span class={dividerVariants({ color })} style:height={`${thickness}px`} />
	{/if}
	<div
		class={cn({
			'mx-4': $$slots.default
		})}
	>
		<slot />
	</div>
	{#if labelPosition !== 'right'}
		<span class={dividerVariants({ color })} style:height={`${thickness}px`} />
	{/if}
</div>
