<script context="module" lang="ts">
	import type { HTMLBaseAttributes } from 'svelte/elements';

	export interface ThumbProps extends HTMLBaseAttributes {
		ref?: HTMLDivElement;
		position: { x: number; y: number };
		color: string;
		styles?: {
			top?: string;
			bottom?: string;
			left?: string;
			right?: string;
		};
	}
</script>

<script lang="ts">
	type $$Props = ThumbProps;

	export let ref: $$Props['ref'] = undefined;
	export let position: $$Props['position'] = { x: 0, y: 0 };
	export let color: $$Props['color'] = '#ffffff';
	export let styles: $$Props['styles'] = undefined;
</script>

<div
	bind:this={ref}
	class="absolute h-4 w-4 overflow-hidden rounded-full border-2 border-white shadow-md"
	style:top={styles?.top ? styles.top : `calc(${position.y * 100}% - 0.5rem)`}
	style:left={styles?.left ? styles.left : `calc(${position.x * 100}% - 0.5rem)`}
	style:background-color={color}
></div>
