<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Select from '$lib/components/Form/Select.svelte';
	import TextInput from '$lib/components/Form/TextInput.svelte';
	import type { GroupedOption } from '$lib/components/Form/options/types';

	let options1 = [
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

	let option2 = ['Select 1', 'Select 2', 'Select 3'];

	let option3: GroupedOption[] = [
		{ group: 'Group 1', items: ['Cat 1', 'Cat 2', 'Cat 3'] },
		{ group: 'Group 2', items: ['Dog 1', 'Dog 2', 'Dog 3'] },
		{ group: 'Group 3', items: ['Bird 1', 'Bird 2', 'Bird 3'] }
	];
</script>

<section class="flex flex-1 flex-col items-center justify-center self-center">
	<div class="h-[600px] w-full"></div>
	<form method="post" action="/login" class="rounded-lg bg-white p-5">
		<TextInput required name="email" type="email">
			<svelte:fragment slot="label">Email</svelte:fragment>
			<svelte:fragment slot="left">@</svelte:fragment>
		</TextInput>

		<Button block fullWidth class="mt-3">Settings</Button>

		<Select options={options1} label="Label" placeholder="asd" />
		<Select options={option2} label="Label" placeholder="asd" />
		<Select options={option3} label="Label" placeholder="asd" />
	</form>

	<div class="h-[1000px] w-full"></div>
</section>
