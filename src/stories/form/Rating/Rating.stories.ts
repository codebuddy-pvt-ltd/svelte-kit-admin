import Rating from '$lib/components/Form/Rating/Rating.svelte';
import type { Meta, StoryObj } from '@storybook/svelte';

const meta = {
	title: 'Components/Rating',
	component: Rating,
	tags: ['autodocs'],
	argTypes: {
		count: {
			control: { type: 'number', min: 1, max: 10, step: 1 },
			defaultValue: 5
		},
		fractions: {
			control: { type: 'number', min: 1, max: 5, step: 1 },
			defaultValue: 1
		}
	}
} satisfies Meta<Rating>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		count: 5,
		fractions: 1
	}
};
