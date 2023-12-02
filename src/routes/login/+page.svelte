<script lang="ts">
	import MultiSelect from '$lib/components/Form/MultiSelect.svelte';
	import NativeSelect from '$lib/components/Form/NativeSelect/NativeSelect.svelte';
	import PinInput from '$lib/components/Form/PinInput.svelte';
	import Rating from '$lib/components/Form/Rating/Rating.svelte';
	import type { OptionItem } from '$lib/components/Form/options/types';
	import Divider from '$lib/components/layouts/Divider.svelte';
	import Group from '$lib/components/layouts/Group.svelte';

	const options: Array<OptionItem> = [
		{
			group: 'Group 1',
			items: [
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
			]
		},
		{
			group: 'Group 2',
			items: [
				{
					label: 'Option 4',
					value: 'option-4'
				},
				{
					label: 'Option 5',
					value: 'option-5'
				},
				{
					label: 'Option 6',
					value: 'option-6'
				}
			]
		},
		'Option-7',
		{ value: 'Option-8', label: 'Option-8' },
		123
	];
</script>

<div class="text-white">
	<Group class="text-white">
		<h6>Hello World</h6>
		<h6>Hola Mundo</h6>
		<h6>Buenos dias</h6>
	</Group>

	<Divider />
	<Divider thickness={8} />

	<Divider>Hello World</Divider>

	<MultiSelect {options} searchable={true} />

	<NativeSelect label="Label" description="Description" {options} />

	<PinInput />

	<Rating />
</div>
