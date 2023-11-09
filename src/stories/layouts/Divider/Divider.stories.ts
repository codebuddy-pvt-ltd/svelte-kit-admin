import Divider from '$lib/components/layouts/Divider.svelte';
import { Colors } from '$lib/components/utils/theme';
import type { Meta, StoryObj } from '@storybook/svelte';

const meta = {
	title: 'Layout/Divider',
	component: Divider,
	tags: ['autodocs'],
	argTypes: {
		color: {
			control: 'select',
			options: Object.values(Colors),
			defaultValue: Colors.PRIMARY
		},
		labelPosition: {
			control: 'select',
			options: ['left', 'right', 'center'],
			defaultValue: 'left'
		},
		thickness: {
			control: 'number',
			defaultValue: 1
		}
	}
} satisfies Meta<Divider>;

export default meta;

type Story = StoryObj<Divider>;

export const Default: Story = {
	args: {
		color: Colors.PRIMARY,
		labelPosition: 'left',
		thickness: 1
	}
};
