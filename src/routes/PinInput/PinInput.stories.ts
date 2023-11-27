import PinInput from '$lib/components/Form/PinInput.svelte';
import type { Meta, StoryObj } from '@storybook/svelte';

const meta = {
	title: 'Components/PinInput',
	component: PinInput,
	tags: ['autodocs'],
	argTypes: {
		label: { control: 'text', description: 'Label for the input' },
		description: { control: 'text', description: 'Description for the input' },
		placeholder: { control: 'text', description: '○' },
		required: { control: 'boolean' },
		disabled: { control: 'boolean' },
		length: { control: 'number', description: 'Length of the pin', defaultValue: 6 },
		masked: { control: 'boolean', description: 'Mask the input', defaultValue: false },
		type: { control: 'select', options: ['number', 'alphanumeric'], defaultValue: 'number' }
	}
} satisfies Meta<PinInput>;

export default meta;

type Story = StoryObj<PinInput>;

export const Default: Story = {
	args: {
		label: 'Label',
		description: 'Description',
		placeholder: '○',
		required: false,
		disabled: false,
		length: 6,
		masked: false,
		type: 'number'
	}
};
