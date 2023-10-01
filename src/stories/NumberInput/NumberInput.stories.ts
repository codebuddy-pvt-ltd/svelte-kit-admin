import NumberInput from '$lib/components/Form/NumberInput.svelte';
import type { Meta, StoryObj } from '@storybook/svelte';

const meta = {
	title: 'Components/NumberInput',
	component: NumberInput,
	tags: ['autodocs'],
	argTypes: {
		name: { control: 'text', defaultValue: '' },
		placeholder: { control: 'text', defaultValue: 'Write here...' },
		error: { control: 'text', defaultValue: undefined }
	}
} satisfies Meta<NumberInput>;

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
