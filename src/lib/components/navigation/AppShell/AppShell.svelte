<script context="module" lang="ts">
	export interface Classes {
		main?: string;
		body?: string;
	}

	export interface AppShellProps {
		layout?: 'default' | 'alternate';
		sideNavBreakpoint?: number;
		asideBreakpoint?: number;
		sidNavWidth?: number;
		asideWidth?: number;
		isHeaderFixed?: boolean;
		classes?: Classes;
	}
</script>

<script lang="ts">
	import { cn } from '$lib/components/utils';
	import { tweened } from 'svelte/motion';
	import appShellStore, { type AppShellStore } from './store';
	import { linear } from 'svelte/easing';

	type $$Props = AppShellProps;

	export let layout: $$Props['layout'] = 'default';
	export let sideNavBreakpoint = 728;
	export let asideBreakpoint = 1024;
	export let sidNavWidth = 256;
	export let asideWidth = 256;
	export let isHeaderFixed = true;
	export let classes: $$Props['classes'] = {};

	$: $appShellStore.layout = layout as AppShellStore['layout'];
	$: $appShellStore.sideNavWidth = sidNavWidth;
	$: $appShellStore.asideWidth = asideWidth;
	$: $appShellStore.isHeaderFixed = isHeaderFixed;

	let screenWidth: number;

	let padLeft = tweened(256, {
		duration: 200,
		easing: linear,
		delay: 200
	});

	let padRight = tweened(256, {
		duration: 200,
		easing: linear,
		delay: 200
	});

	$: $padLeft = screenWidth >= sideNavBreakpoint && $appShellStore.isSideNavOpen ? 256 : 0;
	$: $padRight = screenWidth >= asideBreakpoint && $appShellStore.isAsideOpen ? 256 : 0;

	$: {
		if (screenWidth < sideNavBreakpoint) {
			$appShellStore.isSideNavOpen = false;
		} else {
			$appShellStore.isSideNavOpen = true;
		}

		if (screenWidth < asideBreakpoint) {
			$appShellStore.isAsideOpen = false;
		} else {
			$appShellStore.isAsideOpen = true;
		}
	}

	$: padTop = $appShellStore.isHeaderFixed ? $appShellStore.headerHeight : 0;
</script>

<svelte:window bind:innerWidth={screenWidth} />

<main class={cn(classes?.main)}>
	{#if layout === 'default'}
		<slot name="header" />

		<slot name="sidenav" />

		<section
			class={cn('flow-root min-h-[100dvh] overflow-hidden', classes?.body)}
			style:padding-top={`${padTop}px`}
			style:padding-left={`${$padLeft}px`}
			style:padding-right={`${$padRight}px`}
		>
			<slot />
		</section>

		<slot name="aside" />
	{:else}
		<slot name="sidenav" />

		<section
			class={cn('relative overflow-hidden', {
				'flex h-[100dvh] flex-col': $appShellStore.isHeaderFixed
			})}
			style:margin-left={`${$padLeft}px`}
			style:margin-right={`${$padRight}px`}
		>
			<slot name="header" />

			<section class={cn('flex-1 overflow-auto', classes?.body)}>
				<slot />
			</section>
		</section>

		<slot name="aside" />
	{/if}
</main>
