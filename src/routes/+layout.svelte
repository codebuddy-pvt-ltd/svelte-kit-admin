<script lang="ts">
	import '../app.css';
	import { QueryClientProvider } from '@tanstack/svelte-query';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<QueryClientProvider client={data.queryClient}>
	<main class="bg-dark flex min-h-screen flex-col">
		<slot />
	</main>
</QueryClientProvider>
