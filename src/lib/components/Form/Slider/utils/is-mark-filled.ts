interface IsMarkFilled {
	mark: { value: number; label?: string };
	offset?: number;
	value: number;
	inverted?: boolean;
}

export function isMarkFilled({ mark, offset, value, inverted = false }: IsMarkFilled) {
	return inverted
		? typeof offset === 'number'
			? mark.value <= offset || mark.value >= value
			: mark.value >= value
		: typeof offset === 'number'
		? mark.value >= offset && mark.value <= value
		: mark.value <= value;
}
