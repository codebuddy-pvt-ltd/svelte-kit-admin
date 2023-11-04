<script lang="ts">
	import AspectRatio from '$lib/components/layouts/AspectRatio.svelte';
</script>

<AspectRatio {...$$props}>
	<img
		src="https://picsum.photos/seed/picsum/800/800"
		alt="picsum"
		class="h-full w-full object-cover"
	/>
</AspectRatio>
