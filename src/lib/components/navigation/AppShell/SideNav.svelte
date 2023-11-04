<script context="module" lang="ts">
	export interface SideNavProps {
		class?: string;
	}
</script>

<script lang="ts">
	import { cn } from '$lib/components/utils';
	import { tweened } from 'svelte/motion';
	import appShellStore from './store';
	import { linear } from 'svelte/easing';

	type $$Props = SideNavProps;

	let clx: $$Props['class'] = '';
	export { clx as class };

	let position = tweened(0, {
		duration: 200,
		easing: linear
	});

	$: $position = $appShellStore.isSideNavOpen ? 0 : 100;

	let scrollY: number;

	$: gap =
		$appShellStore.layout === 'alternate' ? 0 : $appShellStore.headerHeight - Math.max(scrollY, 0);
</script>

<svelte:window bind:scrollY />

<nav
	class={cn('fixed z-10 w-[256px] p-4 transition-transform', clx)}
	style:transform={`translateX(-${$position}%)`}
	style:height={`calc(100dvh - ${gap}px)`}
	style:top={`${gap}px`}
>
	<slot />
</nav>
