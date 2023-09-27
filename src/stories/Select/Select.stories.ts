import type { Meta, StoryObj } from '@storybook/svelte';
import Select from '$lib/components/Form/Select.svelte';

const meta = {
	title: 'Components/Select',
	component: Select,
	tags: ['autodocs'],
	argTypes: {
		label: {
			control: 'text',
			defaultValue: 'Select',
			description: 'The label of the select'
		},
		clearable: {
			control: 'boolean',
			defaultValue: false,
			description: 'Whether the select is clearable'
		},
		searchable: {
			control: 'boolean',
			defaultValue: false,
			description: 'Whether the select is searchable'
		},
		checkIconPosition: {
			control: 'select',
			options: ['left', 'right'],
			defaultValue: 'right'
		},
		disabled: {
			control: 'boolean',
			defaultValue: false,
			description: 'Whether the select is disabled'
		}
	}
} satisfies Meta<Select>;

export default meta;

type Story = StoryObj<Select>;

export const Default: Story = {
	args: {
		label: 'Select',
		clearable: false,
		searchable: false,
		checkIconPosition: 'right',
		disabled: false,
		options: [
			{ value: '1', label: 'Option 1' },
			{ value: '2', label: 'Option 2' },
			{ value: '3', label: 'Option 3' }
		]
	}
};
