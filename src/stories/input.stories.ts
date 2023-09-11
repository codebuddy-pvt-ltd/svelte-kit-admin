import Input from '$lib/components/Input.svelte';
import type { Meta, StoryObj } from '@storybook/svelte';

const meta = {
	title: 'Components/Input',
	component: Input,
	tags: ['autodocs'],
	argTypes: {
		label: { control: 'text', defaultValue: 'Label' },
		name: { control: 'text', defaultValue: 'name' },
		error: { control: 'text', defaultValue: '' },
		type: {
			control: { type: 'enum' },
			options: ['text', 'password', 'number', 'email'],
			defaultValue: 'text'
		},
		id: { control: 'text', defaultValue: 'id' },
		required: { control: 'boolean', defaultValue: false }
	}
} satisfies Meta<Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		label: 'Label',
		name: 'name'
	}
};

export const RequiredInput: Story = {
	name: 'Required input',
	args: {
		label: 'Label',
		name: 'name',
		required: true
	}
};

export const WithError: Story = {
	name: 'Input with Error',
	args: {
		label: 'Label',
		name: 'name',
		error: 'Error message'
	}
};
