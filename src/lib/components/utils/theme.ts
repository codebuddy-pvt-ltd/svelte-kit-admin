import type { OBjectValues } from '$lib/types';

export const Colors = {
	PRIMARY: 'primary',
	ACCENT: 'accent',
	DARK: 'dark',
	LIGHT: 'light',
	SUCCESS: 'success',
	WARNING: 'warning',
	DANGER: 'danger'
} as const;

export type Color = OBjectValues<typeof Colors>;

export const Sizes = {
	EXTRA_SMALL: 'xs',
	SMALL: 'sm',
	MEDIUM: 'md',
	LARGE: 'lg',
	EXTRA_LARGE: 'xl'
} as const;

export type Size = OBjectValues<typeof Sizes>;

export const Radii = {
	NONE: 'none',
	SMALL: 'sm',
	default: 'default',
	MEDIUM: 'md',
	LARGE: 'lg',
	EXTRA_LARGE: 'xl',
	EXTRA_LARGE_2X: '2xl',
	EXTRA_LARGE_3X: '3xl',
	FULL: 'full'
} as const;

export type Radius = OBjectValues<typeof Radii>;

export const Rounded: Record<Radius, string> = {
	none: 'rounded-none',
	sm: 'rounded-sm',
	default: 'rounded',
	md: 'rounded-md',
	lg: 'rounded-lg',
	xl: 'rounded-xl',
	'2xl': 'rounded-2xl',
	'3xl': 'rounded-3xl',
	full: 'rounded-full'
};
