<script lang="ts">
	import '../app.css';
	import { QueryClientProvider } from '@tanstack/svelte-query';
	import type { PageData } from './$types';
	import 'iconify-icon';

	export let data: PageData;
</script>

<QueryClientProvider client={data.queryClient}>
	<main class="flex min-h-screen flex-col bg-dark/90">
		<slot />
	</main>
</QueryClientProvider>
