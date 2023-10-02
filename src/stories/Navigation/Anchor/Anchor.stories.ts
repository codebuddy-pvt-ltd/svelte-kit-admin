import { Colors } from '$lib/components/utils/theme';
import type { Meta, StoryObj } from '@storybook/svelte';
import Anchor from './Anchor.svelte';

const meta = {
	title: 'Navigation/Anchor',
	component: Anchor,
	tags: ['autodocs'],
	argTypes: {
		color: {
			control: 'select',
			options: Object.values(Colors),
			defaultValue: 'primary',
			description: 'The variant of the button'
		},
		underline: {
			control: 'radio',
			options: ['always', 'hover', 'none'],
			defaultValue: 'hover'
		}
	}
} satisfies Meta<Anchor>;

export default meta;

type Story = StoryObj<Anchor>;

export const Default: Story = {
	args: {
		color: 'primary',
		underline: 'hover'
	}
};
