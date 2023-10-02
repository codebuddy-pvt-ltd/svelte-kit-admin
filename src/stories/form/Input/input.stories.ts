import Input from '$lib/components/Form/Input.svelte';
import type { Meta, StoryObj } from '@storybook/svelte';

const meta = {
	title: 'Components/Input',
	component: Input,
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
} satisfies Meta<Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		name: 'name',
		placeholder: 'Write here...',
		type: 'text'
	}
};

export const RequiredInput: Story = {
	name: 'Required input',
	args: {
		name: 'name',
		placeholder: 'Write here...',
		type: 'text',
		required: true
	}
};

export const WithError: Story = {
	name: 'Input with Error',
	args: {
		name: 'name',
		placeholder: 'Write here...',
		type: 'text',
		error: true
	}
};
