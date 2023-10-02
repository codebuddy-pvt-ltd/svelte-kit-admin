import type { Meta, StoryObj } from '@storybook/svelte';
import Radio from '$lib/components/Form/Radio.svelte';

const meta = {
	title: 'Components/Radio',
	component: Radio,
	tags: ['autodocs'],
	argTypes: {
		labelPosition: {
			control: 'select',
			options: ['left', 'right'],
			defaultValue: 'right'
		},
		disabled: {
			control: 'boolean',
			defaultValue: false,
			description: 'Whether the select is disabled'
		},
		error: {
			control: 'text'
		}
	}
} satisfies Meta<Radio>;

export default meta;

type Story = StoryObj<Radio>;

export const Default: Story = {
	args: {
		labelPosition: 'right',
		options: [
			{ label: 'Left', value: 'left', description: 'lorem' },
			{ label: 'Right', value: 'right', description: 'lorem' }
		]
	}
};
