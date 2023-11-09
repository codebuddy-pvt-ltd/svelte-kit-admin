<script context="module" lang="ts">
	import type { HTMLBaseAttributes } from 'svelte/elements';
	import {
		FlexItemsAlignments,
		type FlexItemsAlignment,
		type FlexJustifyContent,
		type Size,
		FlexJustifyContents,
		Sizes
	} from '../utils/theme';
	import { cva } from 'class-variance-authority';

	export interface GroupProps extends HTMLBaseAttributes {
		align?: FlexItemsAlignment;
		justify?: FlexJustifyContent;
		gap?: Size;
		grow?: boolean;
		preventGrowOverflow?: boolean;
		wrap?: boolean;
	}
</script>

<script lang="ts">
	import { cn } from '../utils';

	type $Props = GroupProps;

	export let align: $Props['align'] = 'center';
	export let justify: $Props['justify'] = 'center';
	export let gap: $Props['gap'] = 'md';
	export let grow: $Props['grow'] = false;
	export let preventGrowOverflow: $Props['preventGrowOverflow'] = false;
	export let wrap: $Props['wrap'] = false;

	let groupVariants = cva(['flex'], {
		variants: {
			align: {
				[FlexItemsAlignments.BASELINE]: 'items-baseline',
				[FlexItemsAlignments.CENTER]: 'items-center',
				[FlexItemsAlignments.END]: 'items-end',
				[FlexItemsAlignments.START]: 'items-start',
				[FlexItemsAlignments.STRETCH]: 'items-stretch'
			},
			justify: {
				[FlexJustifyContents.START]: 'justify-start',
				[FlexJustifyContents.CENTER]: 'justify-center',
				[FlexJustifyContents.END]: 'justify-end',
				[FlexJustifyContents.BETWEEN]: 'justify-between',
				[FlexJustifyContents.AROUND]: 'justify-around',
				[FlexJustifyContents.EVENLY]: 'justify-evenly'
			},
			gap: {
				[Sizes.EXTRA_SMALL]: 'gap-1',
				[Sizes.SMALL]: 'gap-2',
				[Sizes.MEDIUM]: 'gap-3',
				[Sizes.LARGE]: 'gap-4',
				[Sizes.EXTRA_LARGE]: 'gap-5'
			},
			grow: {
				true: 'flex-grow',
				false: ''
			},
			preventGrowOverflow: {
				true: 'flex-shrink-0',
				false: ''
			},
			wrap: {
				true: 'flex-wrap',
				false: ''
			}
		}
	});
</script>

<div
	class={cn(
		groupVariants({ align, justify, gap, grow, preventGrowOverflow, wrap }),
		$$restProps?.class
	)}
>
	<slot />
</div>
