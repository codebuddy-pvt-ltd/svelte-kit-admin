import clsx, { type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...args: ClassValue[]) => twMerge(clsx(args));

export function clamp(value: number, min: number | undefined, max: number | undefined) {
	if (min === undefined && max === undefined) {
		return value;
	}

	if (min !== undefined && max === undefined) {
		return Math.max(value, min);
	}

	if (min === undefined && max !== undefined) {
		return Math.min(value, max);
	}

	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	return Math.min(Math.max(value, min!), max!);
}
