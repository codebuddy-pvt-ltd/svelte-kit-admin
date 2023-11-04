import type { Meta, StoryObj } from '@storybook/svelte';
import AspectRatio from './AspectRatio.svelte';

const meta = {
	title: 'Layouts/AspectRatio',
	component: AspectRatio,
	tags: ['autodocs'],
	argTypes: {
		ratio: {
			control: 'number',
			defaultValue: 1
		}
	}
} satisfies Meta<AspectRatio>;

export default meta;

type Story = StoryObj<AspectRatio>;

export const Default: Story = {
	args: {
		ratio: 1
	}
};
