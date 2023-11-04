<script context="module" lang="ts">
	import type { HTMLBaseAttributes } from 'svelte/elements';
	import { cn } from '../utils';

	export interface AspectRatioProps extends HTMLBaseAttributes {
		ratio?: number;
	}
</script>

<script lang="ts">
	type $$Props = AspectRatioProps;

	export let ratio: $$Props['ratio'] = 1;
</script>

<div
	{...$$restProps}
	class={cn('relative', $$restProps?.class)}
	style="padding-bottom: calc(100% / {ratio});"
>
	<div class="absolute inset-0">
		<slot />
	</div>
</div>
