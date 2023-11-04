<script context="module" lang="ts">
	import type { HTMLBaseAttributes } from 'svelte/elements';
	import type { Size } from '../utils/theme';

	export interface ContainerProps extends HTMLBaseAttributes {
		fluid?: boolean;
		size?: Size;
	}
</script>

<script lang="ts">
	import { cn } from '../utils';
	import { cva } from 'class-variance-authority';

	type $Props = ContainerProps;

	export let fluid: $Props['fluid'] = false;
	export let size: $Props['size'] = 'md';

	let containerVariants = cva(['bg-accent'], {
		variants: {
			size: {
				xs: 'xs:container xs:mx-auto',
				sm: 'sm:container sm:mx-auto',
				md: 'md:container md:mx-auto',
				lg: 'lg:container lg:mx-auto',
				xl: 'xl:container xl:mx-auto'
			}
		}
	});
</script>

<section class={cn(fluid ? 'w-full' : containerVariants({ size }), $$restProps?.class)}>
	<slot />
</section>
