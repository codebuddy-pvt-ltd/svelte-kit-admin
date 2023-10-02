import PasswordInput from '$lib/components/Form/PasswordInput.svelte';
import type { Meta, StoryObj } from '@storybook/svelte';

const meta = {
	title: 'Components/PasswordInput',
	component: PasswordInput,
	tags: ['autodocs'],
	argTypes: {
		name: { control: 'text', defaultValue: '' },
		placeholder: { control: 'text', defaultValue: 'Write here...' },
		error: { control: 'text', defaultValue: undefined }
	}
} satisfies Meta<PasswordInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		label: 'Label',
		name: 'name',
		placeholder: 'Write here...',
		error: undefined
	}
};
