<script context="module" lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';

	export interface RatingProps extends Omit<HTMLInputAttributes, 'type'> {
		count?: number;
		fractions?: number;
		readonly?: boolean;
	}
</script>

<script lang="ts">
	import RatingItem from './RatingItem.svelte';
	import { clamp, cn, roundValueTo } from '$lib/components/utils';
	import { v4 } from 'uuid';

	type $$Props = RatingProps;

	export let count: $$Props['count'] = 5;
	export let fractions: $$Props['fractions'] = 4;
	export let readonly: $$Props['readonly'] = false;
	export let id: $$Props['id'] = v4();

	let hovered = -1;
	let isOutside = true;

	let _value = 3;
	$: _fractions = Math.floor(Number(fractions));
	$: _count = Math.floor(Number(count));

	$: decimalUnit = 1 / _fractions;
	$: stableValueRounded = roundValueTo(_value, decimalUnit);
	$: finalValue = hovered !== -1 ? hovered : stableValueRounded;

	let rootElement: HTMLElement;

	function getRatingFromCoordinates(x: number) {
		const { left, width } = rootElement.getBoundingClientRect();
		const symbolWidth = width / _count;

		const hoverPosition = x - left;
		const hoverValue = hoverPosition / symbolWidth;

		return clamp(roundValueTo(hoverValue + decimalUnit / 2, decimalUnit), decimalUnit, _count);
	}

	function handleMouseEnter(_event: MouseEvent) {
		isOutside = false;
	}

	function handleMouseMove(event: MouseEvent) {
		if (readonly) {
			return;
		}

		const rounded = getRatingFromCoordinates(event.clientX);

		hovered = rounded;
	}

	const handleMouseLeave = (_event: MouseEvent) => {
		if (readonly) {
			return;
		}

		hovered = -1;
		isOutside = true;
	};

	const handleItemBlur = () => isOutside && (hovered = -1);

	const handleChange = (event: Event) => {
		const target = event.target as HTMLInputElement;
		if (!readonly) {
			_value = Number(target.value);
		}
	};
</script>

<!-- svelte-ignore a11y-interactive-supports-focus -->
<div
	class="flex w-max"
	role="radiogroup"
	bind:this={rootElement}
	on:mousemove={handleMouseMove}
	on:mouseenter={handleMouseEnter}
	on:mouseleave={handleMouseLeave}
>
	{#each Array(_count).fill(0) as _, index (index + 1)}
		{@const integerValue = index + 1}
		{@const fractionItems = Array.from(new Array(index === 0 ? _fractions + 1 : _fractions))}
		{@const isGroupActive = !readonly && Math.ceil(hovered) === integerValue}

		<div
			class={cn('relative transition-transform duration-100', {
				'z-[1] scale-100': isGroupActive
			})}
		>
			{#each fractionItems as __, fractionIndex (`${integerValue}-${roundValueTo(integerValue - 1 + fractionIndex * decimalUnit, decimalUnit)}`)}
				{@const fractionValue = decimalUnit * (index === 0 ? fractionIndex : fractionIndex + 1)}
				{@const symbolValue = roundValueTo(integerValue - 1 + fractionValue, decimalUnit)}

				<RatingItem
					{...$$restProps}
					full={symbolValue <= finalValue}
					active={symbolValue === finalValue}
					checked={symbolValue === stableValueRounded}
					{readonly}
					{fractionValue}
					value={symbolValue}
					id={`${id}-${index}-${fractionIndex}`}
					on:blur={handleItemBlur}
					on:input={handleChange}
				/>
			{/each}
		</div>
	{/each}
</div>
