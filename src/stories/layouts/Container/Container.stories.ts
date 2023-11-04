import type { Meta, StoryObj } from '@storybook/svelte';
import Container from './Container.svelte';
import { Sizes } from '$lib/components/utils/theme';

const meta = {
	title: 'Layouts/Container',
	component: Container,
	tags: ['autodocs'],
	argTypes: {
		fluid: {
			control: 'boolean',
			defaultValue: false
		},
		size: {
			control: 'select',
			options: Object.values(Sizes),
			defaultValue: Sizes.LARGE
		}
	}
} satisfies Meta<Container>;

export default meta;

type Story = StoryObj<Container>;

export const Default: Story = {
	args: {
		fluid: false,
		size: Sizes.LARGE
	}
};
