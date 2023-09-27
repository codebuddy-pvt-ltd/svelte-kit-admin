<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Select from '$lib/components/Form/Select.svelte';
	import TextInput from '$lib/components/Form/TextInput.svelte';

	let options = [
		{
			label: 'Option 1',
			value: 'option-1'
		},
		{
			label: 'Option 2',
			value: 'option-2'
		},
		{
			label: 'Option 3',
			value: 'option-3'
		}
	];
</script>

<section class="flex flex-1 flex-col items-center justify-center self-center">
	<form method="post" action="/login" class="rounded-lg bg-white p-5">
		<TextInput required name="email" type="email">
			<svelte:fragment slot="label">Email</svelte:fragment>
			<svelte:fragment slot="left">@</svelte:fragment>
		</TextInput>

		<Button block fullWidth class="mt-3">Settings</Button>

		<Select {options} clearable searchable label="Label" placeholder="asd" />
	</form>
</section>
