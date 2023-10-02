import Textarea from '$lib/components/Form/Textarea.svelte';
import type { Meta, StoryObj } from '@storybook/svelte';

const meta = {
	title: 'Components/Textarea',
	component: Textarea,
	tags: ['autodocs'],
	argTypes: {
		name: { control: 'text', defaultValue: '' },
		placeholder: { control: 'text', defaultValue: 'Write here...' },
		label: { control: 'text', defaultValue: 'Label' },
		description: { control: 'text', defaultValue: 'Description' },
		error: { control: 'text', defaultValue: 'Error' },
		disabled: { control: 'boolean' }
	}
} satisfies Meta<Textarea>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		name: 'textarea',
		placeholder: 'Write here...',
		label: 'Label',
		description: 'Description',
		error: '',
		disabled: false
	}
};
