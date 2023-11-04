<script context="module" lang="ts">
	import type { HTMLBaseAttributes } from 'svelte/elements';
	import { cn } from '../utils';

	export interface CenterProps extends HTMLBaseAttributes {
		inline?: boolean;
	}
</script>

<script lang="ts">
	type $Props = CenterProps;

	export let inline: $Props['inline'] = false;
</script>

<div class={cn('flex justify-center', { 'inline-flex': inline })} {...$$restProps}>
	<div>
		<slot />
	</div>
</div>
