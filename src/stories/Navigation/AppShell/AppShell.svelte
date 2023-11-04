<script lang="ts">
	import AppShell from '$lib/components/navigation/AppShell/AppShell.svelte';
	import Aside from '$lib/components/navigation/AppShell/Aside.svelte';
	import Header from '$lib/components/navigation/AppShell/Header.svelte';
	import SideNav from '$lib/components/navigation/AppShell/SideNav.svelte';
	import NavLink from '$lib/components/navigation/NavLink.svelte';
</script>

<AppShell
	layout="alternate"
	isHeaderFixed={true}
	{...$$props}
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
		{#each Array(4) as _}
			<div class="m-7 h-16 bg-light"></div>
		{/each}
	</svelte:fragment>
</AppShell>
