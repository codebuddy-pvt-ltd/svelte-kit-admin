<script context="module" lang="ts">
	import type { Color } from '../utils/theme';

	export interface Breadcrumb {
		title: string;
		href: string;
		color?: Color;
	}

	export interface BreadcrumbsProps {
		items: Array<Breadcrumb>;
		color?: Color;
	}
</script>

<script lang="ts">
	import Anchor from './Anchor.svelte';

	type $$Props = BreadcrumbsProps;

	export let items: $$Props['items'] = [];
	export let color: $$Props['color'] = 'primary';
</script>

<div class="flex items-center">
	{#each items as item, index}
		<div class="flex items-center">
			{#if index !== 0}
				<div class="mx-3">
					{#if $$slots.separator}
						<slot name="separator" />
					{:else}
						/
					{/if}
				</div>
			{/if}

			<Anchor href={item.href} color={item.color ?? color}>
				{item.title}
			</Anchor>
		</div>
	{/each}
</div>
