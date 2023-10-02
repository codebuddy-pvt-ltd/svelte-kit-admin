import type { Meta, StoryObj } from '@storybook/svelte';
import Switch from './Switch.svelte';

const meta = {
	title: 'Components/Switch',
	component: Switch,
	tags: ['autodocs'],
	argTypes: {
		disabled: {
			control: 'boolean',
			defaultValue: false,
			description: 'Whether the checkbox is disabled'
		},
		description: {
			control: 'text',
			defaultValue: 'Description',
			description: 'Description of the switch'
		},
		error: {
			control: 'text',
			description: 'Error message to display'
		},
		labelPosition: {
			control: 'inline-radio',
			options: ['left', 'right'],
			defaultValue: 'right',
			description: 'Position of the label'
		}
	}
} satisfies Meta<Switch>;

export default meta;

type Story = StoryObj<Switch>;

export const Default: Story = {
	args: {
		description: 'This is a switch',
		labelPosition: 'right',
		error: '',
		disabled: false
	}
};
