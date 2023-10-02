<script context="module" lang="ts">
	import type { HTMLAnchorAttributes } from 'svelte/elements';
	import type { Color } from '../utils/theme';

	export interface AnchorProps extends HTMLAnchorAttributes {
		ref?: HTMLAnchorElement;
		underline?: 'always' | 'hover' | 'never';
		color?: Color;
	}
</script>

<script lang="ts">
	import { cva } from 'class-variance-authority';
	import { cn } from '../utils';

	type $$Props = AnchorProps;

	export let ref: $$Props['ref'] = undefined;
	export let underline: $$Props['underline'] = 'hover';
	export let color: $$Props['color'] = 'primary';
	export let href: $$Props['href'] = '#';

	let anchorVariants = cva([''], {
		variants: {
			color: {
				primary: 'text-primary',
				accent: 'text-accent',
				dark: 'text-dark',
				light: 'text-light',
				success: 'text-success',
				warning: 'text-warning',
				danger: 'text-danger'
			},
			underline: {
				always: 'underline underline-offset-1',
				hover: 'hover:underline focus:underline',
				never: 'no-underline'
			}
		}
	});
</script>

<a
	{...$$restProps}
	{href}
	bind:this={ref}
	class={cn(anchorVariants({ underline, color }), $$restProps.class)}
>
	<slot />
</a>
