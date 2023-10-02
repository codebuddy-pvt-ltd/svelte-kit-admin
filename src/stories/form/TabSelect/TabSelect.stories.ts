import type { Meta, StoryObj } from '@storybook/svelte';
import TabSelect from '$lib/components/Form/TabSelect.svelte';

const meta = {
	title: 'Components/TabSelect',
	component: TabSelect,
	tags: ['autodocs'],
	argTypes: {
		error: {
			control: 'text',
			defaultValue: '',
			description: 'The error message to display'
		}
	}
} satisfies Meta<TabSelect>;

export default meta;

type Story = StoryObj<TabSelect>;

export const Default: Story = {
	args: {
		disabled: false,
		options: [
			{ value: '1', label: 'Option 1' },
			{ value: '2', label: 'Option 2' },
			{ value: '3', label: 'Option 3' }
		]
	}
};
