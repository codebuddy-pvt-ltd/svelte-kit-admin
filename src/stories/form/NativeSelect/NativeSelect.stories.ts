import NativeSelect from '$lib/components/Form/NativeSelect/NativeSelect.svelte';
import type { Meta, StoryObj } from '@storybook/svelte';

const meta = {
	title: 'Components/NativeSelect',
	component: NativeSelect,
	tags: ['autodocs'],
	argTypes: {
		label: {
			control: 'text',
			defaultValue: 'Select',
			description: 'The label of the select'
		},
		description: {
			control: 'text',
			defaultValue: 'Description',
			description: 'The description of the select'
		},
		error: { control: 'text', defaultValue: '' },
		disabled: {
			control: 'boolean',
			defaultValue: false,
			description: 'Whether the select is disabled'
		},
		required: { control: 'boolean', defaultValue: false }
	}
} satisfies Meta<NativeSelect>;

export default meta;

type Story = StoryObj<NativeSelect>;

export const Default: Story = {
	args: {
		label: 'Select',
		description: 'Description',
		error: '',
		disabled: false,
		required: false,
		options: [
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
			9
		]
	}
};
