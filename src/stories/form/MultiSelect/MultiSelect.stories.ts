import MultiSelect from '$lib/components/Form/MultiSelect.svelte';
import type { Meta, StoryObj } from '@storybook/svelte';

const meta = {
	title: 'Components/MultiSelect',
	component: MultiSelect,
	tags: ['autodocs'],
	argTypes: {
		clearable: { control: 'boolean' },
		disabled: { control: 'boolean' },
		searchable: { control: 'boolean' },
		withCheckIcon: { control: 'boolean' },
		checkIconPosition: {
			control: 'select',
			options: ['left', 'right'],
			defaultValue: 'right'
		},
		label: { control: 'text' },
		error: { control: 'text' }
	}
} satisfies Meta<MultiSelect>;

export default meta;

type Story = StoryObj<MultiSelect>;

export const Default: Story = {
	args: {
		clearable: false,
		disabled: false,
		searchable: false,
		withCheckIcon: false,
		checkIconPosition: 'right',
		options: [
			{ value: '1', label: 'Option 1' },
			{ value: '2', label: 'Option 2' },
			{ value: '3', label: 'Option 3' }
		],
		label: 'MultiSelect'
	}
};
