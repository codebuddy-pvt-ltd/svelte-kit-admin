<script lang="ts">
	import AppShell from '$lib/components/navigation/AppShell/AppShell.svelte';
	import SideNav from '$lib/components/navigation/AppShell/SideNav.svelte';
	import Header from '$lib/components/navigation/AppShell/Header.svelte';
	import Aside from '$lib/components/navigation/AppShell/Aside.svelte';
	import NavLink from '$lib/components/navigation/NavLink.svelte';
	import AspectRatio from '$lib/components/layouts/AspectRatio.svelte';
</script>

<AppShell
	layout="alternate"
	isHeaderFixed={true}
	classes={{
		main: 'bg-white',
		body: 'p-4'
	}}
>
	<Header slot="header" class="border-b border-b-dark/50 bg-primary/60">Header</Header>
	<SideNav slot="sidenav" class="border-r border-r-dark/50 bg-primary/30">
		<NavLink>Dashboard</NavLink>
		<NavLink>Master</NavLink>
		<NavLink>Transaction</NavLink>
		<NavLink>Reports</NavLink>
		<NavLink>Settings</NavLink>
		<NavLink>Logout</NavLink>
	</SideNav>
	<Aside slot="aside" class="border-l border-l-dark/50 bg-primary/30">Aside</Aside>

	<svelte:fragment>
		<AspectRatio ratio={9 / 16}>
			<img
				src="https://picsum.photos/seed/picsum/800/800"
				alt="picsum"
				class="h-full w-full object-cover"
			/>
		</AspectRatio>

		{#each Array(20) as _}
			<div class="m-7 h-16 bg-light"></div>
		{/each}
	</svelte:fragment>
</AppShell>
