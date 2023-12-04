<script lang="ts">
	import TagInput from '$lib/components/Form/TagInput/TagInput.svelte';

	const options = Array.from({ length: 100 }, (_, i) => `Option ${i + 1}`);
</script>

<div class="p-7 text-white">
	<TagInput {options} searchable clearable limit={3} allowDuplicates />
</div>
