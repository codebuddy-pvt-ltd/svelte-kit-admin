import type { Meta, StoryObj } from '@storybook/svelte';
import Center from './Center.svelte';

const meta = {
	title: 'Layouts/Center',
	component: Center,
	tags: ['autodocs'],
	argTypes: {
		inline: {
			control: 'boolean',
			defaultValue: false
		}
	}
} satisfies Meta<Center>;

export default meta;

type Story = StoryObj<Center>;

export const Default: Story = {
	args: {
		inline: false
	}
};
