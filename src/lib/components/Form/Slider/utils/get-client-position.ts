export function getClientPosition(event: unknown) {
	if ('TouchEvent' in window && event instanceof window.TouchEvent) {
		const touch = event.touches[0];
		return touch.clientX;
	}

	return (event as MouseEvent).clientX;
}
