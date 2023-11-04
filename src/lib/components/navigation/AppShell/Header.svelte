<script context="module" lang="ts">
	export interface HeaderProps {
		class?: string;
	}
</script>

<script lang="ts">
	import { cn } from '$lib/components/utils';
	import { onMount } from 'svelte';

	import appShellStore from './store';

	type $$Props = HeaderProps;

	let clx: $$Props['class'] = '';
	export { clx as class };

	function handleToggle() {
		$appShellStore.isSideNavOpen = !$appShellStore.isSideNavOpen;
	}

	function handleToggleAside() {
		$appShellStore.isAsideOpen = !$appShellStore.isAsideOpen;
	}

	let ref: HTMLElement;

	onMount(() => {
		const resizeObserver = new ResizeObserver((entries) => {
			const entry = entries[0];

			$appShellStore.headerHeight = entry.contentBoxSize[0].blockSize;
		});

		resizeObserver.observe(ref as HTMLElement);

		return () => resizeObserver.unobserve(ref as HTMLElement);
	});
</script>

<header
	class={cn('min-h-[4rem] p-4', clx, {
		fixed: $appShellStore.layout === 'default' && $appShellStore.isHeaderFixed
	})}
	bind:this={ref}
>
	<nav class="flex items-center">
		<button type="button" on:click={handleToggle}>SIDE NAV</button>
		<div class="flex-1">
			<slot />
		</div>
		<button type="button" on:click={handleToggleAside}>ASIDE</button>
	</nav>
</header>
