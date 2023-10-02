<script>
	import TextInput from '$lib/components/Form/TextInput.svelte';
</script>

<TextInput>
	<svelte:fragment slot="label">Email</svelte:fragment>
	<svelte:fragment slot="right">@</svelte:fragment>
</TextInput>
