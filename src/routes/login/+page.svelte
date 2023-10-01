<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Checkbox from '$lib/components/Form/Checkbox.svelte';
	import TextInput from '$lib/components/Form/TextInput.svelte';
</script>

<section class="flex flex-1 flex-col items-center justify-center self-center">
	<form method="post" action="/login" class="rounded-lg bg-white p-5">
		<TextInput required name="email" type="email">
			<svelte:fragment slot="label">Email</svelte:fragment>
			<svelte:fragment slot="left">@</svelte:fragment>
		</TextInput>

		<Button block fullWidth class="mt-3">Settings</Button>

		<Checkbox description="Lorem Ipsum" intermediate>Label</Checkbox>
	</form>
</section>
