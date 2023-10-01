<script lang="ts">
	import Chip from '$lib/components/Form/Chip.svelte';
	import NumberInput from '$lib/components/Form/NumberInput.svelte';
	import TextInput from '$lib/components/Form/TextInput.svelte';
</script>

<section class="flex flex-1 flex-col items-center justify-center self-center">
	<form method="post" action="/login" class="rounded-lg bg-white p-5">
		<TextInput required name="email" type="email">
			<svelte:fragment slot="label">Email</svelte:fragment>
			<svelte:fragment slot="left">@</svelte:fragment>
		</TextInput>

		<Chip>Test</Chip>

		<NumberInput />
	</form>
</section>
