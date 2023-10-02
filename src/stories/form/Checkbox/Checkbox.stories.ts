import type { Meta, StoryObj } from '@storybook/svelte';
import Checkbox from './Checkbox.svelte';

const meta = {
	title: 'Components/Checkbox',
	component: Checkbox,
	tags: ['autodocs'],
	argTypes: {
		disabled: {
			control: 'boolean',
			defaultValue: false,
			description: 'Whether the checkbox is disabled'
		},
		description: {
			control: 'text',
			defaultValue: 'Description'
		},
		error: {
			control: 'text',
			defaultValue: 'Checkbox'
		},
		labelPosition: {
			control: 'inline-radio',
			options: ['left', 'right'],
			defaultValue: 'right'
		}
	}
} satisfies Meta<Checkbox>;

export default meta;

type Story = StoryObj<Checkbox>;

export const Default: Story = {
	args: {
		description: 'This is a checkbox',
		labelPosition: 'right'
	}
};
