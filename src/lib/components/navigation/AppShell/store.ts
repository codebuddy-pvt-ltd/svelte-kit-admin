import { writable } from 'svelte/store';

export type AppShellStore = {
	layout: 'default' | 'alternate';
	isSideNavOpen: boolean;
	isAsideOpen: boolean;
	sideNavWidth: number;
	asideWidth: number;
	isHeaderFixed?: boolean;
	headerHeight: number;
};

const appShellStore = writable<AppShellStore>({
	layout: 'default',
	isSideNavOpen: false,
	isAsideOpen: false,
	sideNavWidth: 256,
	asideWidth: 256,
	isHeaderFixed: true,
	headerHeight: 64
});

export default appShellStore;
