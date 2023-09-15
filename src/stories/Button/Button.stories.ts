import type { Meta, StoryObj } from '@storybook/svelte';
import Button from './Button.svelte';

const meta = {
	title: 'Components/Button',
	component: Button,
	tags: ['autodocs'],
	argTypes: {
		isLoading: {
			control: 'boolean',
			defaultValue: false,
			description: 'Whether the button is loading'
		},
		disabled: {
			control: 'boolean',
			defaultValue: false,
			description: 'Whether the button is disabled'
		},
		block: {
			control: 'boolean',
			defaultValue: false,
			description: 'Whether the button is displayed as a block'
		},
		fullWidth: {
			control: 'boolean',
			defaultValue: false,
			description: 'Whether the button is full width'
		},
		variant: {
			control: 'select',
			options: ['filled', 'outline', 'subtle', 'text'],
			defaultValue: 'filled'
		},
		color: {
			control: 'select',
			options: ['primary', 'accent', 'dark', 'light', 'success', 'warning', 'danger'],
			defaultValue: 'primary',
			description: 'The variant of the button'
		},
		size: {
			control: 'select',
			options: ['xs', 'sm', 'md', 'lg', 'xl'],
			defaultValue: 'md',
			description: 'The size of the button'
		}
	}
} satisfies Meta<Button>;

export default meta;

type Story = StoryObj<Button>;

export const Default: Story = {
	args: {
		variant: 'filled',
		color: 'primary',
		size: 'md'
	}
};
