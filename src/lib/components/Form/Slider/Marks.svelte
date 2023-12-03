<script context="module" lang="ts">
	import type { HTMLBaseAttributes } from 'svelte/elements';
	import { getPosition } from './utils/get-position';
	import { isMarkFilled } from './utils/is-mark-filled';
	import { cn } from '$lib/components/utils';

	export interface Mark {
		value: number;
		label: string;
	}

	export interface MarksProps extends HTMLBaseAttributes {
		marks?: Array<Mark>;
		min: number;
		max: number;
		value: number;
		offset?: number;
		disabled?: boolean;
		inverted?: boolean;
	}
</script>

<script lang="ts">
	type $$Props = MarksProps;

	export let marks: $$Props['marks'] = [];
	export let min: $$Props['min'] = 0;
	export let max: $$Props['max'] = 100;
	export let value: $$Props['value'] = 0;
	export let offset: $$Props['offset'] = 0;
	export let disabled: $$Props['disabled'] = false;
	export let inverted: $$Props['inverted'] = false;
</script>

{#if marks}
	<div>
		{#each marks as mark}
			{@const markOffset = getPosition({ value: mark.value, min: Number(min), max: Number(max) })}
			{@const filled = isMarkFilled({ mark, value, offset, inverted })}

			<div class="absolute top-0 z-[2] h-0" style:left={`calc(${markOffset}% -8px / 2)`}>
				<div class="h-2 w-2 translate-x-[calc(8px/-2)] rounded-full border-2 border-white bg-white">
					{#if mark.label}
						<div
							class={cn(
								'translate-x-[calc(-50%+8px/2),calc(4px/2)] cursor-pointer select-none whitespace-nowrap',
								filled ? 'text-white' : 'text-dark',
								disabled ? 'opacity-50' : 'opacity-100'
							)}
						>
							{mark.label}
						</div>
					{/if}
				</div>
			</div>
		{/each}
	</div>
{/if}
