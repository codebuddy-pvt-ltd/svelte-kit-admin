import TextInput from '$lib/components/Form/TextInput.svelte';
import type { Meta, StoryObj } from '@storybook/svelte';

const meta = {
	title: 'Components/TextInput',
	component: TextInput,
	tags: ['autodocs'],
	argTypes: {
		name: { control: 'text', defaultValue: '' },
		placeholder: { control: 'text', defaultValue: 'Write here...' },
		type: {
			control: { type: 'select' },
			options: ['text', 'password', 'number', 'email'],
			defaultValue: 'text'
		}
	}
} satisfies Meta<TextInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		label: 'Label',
		name: 'name',
		placeholder: 'Write here...',
		type: 'text',
		error: undefined
	}
};

export const RequiredTextInput: Story = {
	name: 'Required TextInput',
	args: {
		label: 'Label',
		name: 'name',
		placeholder: 'Write here...',
		type: 'text',
		required: true
	}
};

export const WithError: Story = {
	name: 'TextInput with Error',
	args: {
		label: 'Label',
		name: 'name',
		placeholder: 'Write here...',
		type: 'text',
		error: 'This is required'
	}
};

export const DisabledTextInput: Story = {
	name: 'Disabled TextInput',
	args: {
		label: 'Label',
		name: 'name',
		placeholder: 'Write here...',
		type: 'text',
		disabled: true
	}
};
