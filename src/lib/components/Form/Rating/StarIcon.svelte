<script context="module" lang="ts">
	import { cn } from '$lib/components/utils';
	import type { SVGAttributes } from 'svelte/elements';

	export interface StarIconProps extends SVGAttributes<SVGAElement> {
		full?: boolean;
	}
</script>

<script lang="ts">
	type $$Props = StarIconProps;

	export let width: $$Props['width'] = '24px';
	export let height: $$Props['height'] = '24px';
	export let style: $$Props['style'] = '';
	export let full: $$Props['full'] = false;
</script>

<svg
	viewBox="0 0 24 24"
	stroke-linecap="round"
	stroke-linejoin="round"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
	style:width
	style:height
	{style}
	{...$$restProps}
	class={cn(
		'block',
		{
			'fill-primary stroke-primary': !full,
			'fill-warning stroke-warning': full
		},
		$$restProps.class
	)}
>
	<path
		d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z"
	/>
</svg>
