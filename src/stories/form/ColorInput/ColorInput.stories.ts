import ColorInput from '$lib/components/Form/ColorInput/ColorInput.svelte';
import type { Meta, StoryObj } from '@storybook/svelte';

const meta = {
	title: 'Components/ColorInput',
	component: ColorInput,
	tags: ['autodocs'],
	argTypes: {
		name: { control: 'text', defaultValue: '' },
		placeholder: { control: 'text', defaultValue: 'Write here...' },
		disabled: { control: 'boolean', defaultValue: false }
	}
} satisfies Meta<ColorInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		name: 'name',
		placeholder: 'Write here...',
		disabled: false
	}
};
