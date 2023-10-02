import Breadcrumbs from '$lib/components/navigation/Breadcrumbs.svelte';
import { Colors } from '$lib/components/utils/theme';
import type { Meta, StoryObj } from '@storybook/svelte';

const meta = {
	title: 'Navigation/Breadcrumbs',
	component: Breadcrumbs,
	tags: ['autodocs'],
	argTypes: {
		color: {
			control: 'select',
			options: Object.values(Colors),
			defaultValue: 'primary',
			description: 'The variant of the anchor'
		}
	}
} satisfies Meta<Breadcrumbs>;

export default meta;

type Story = StoryObj<Breadcrumbs>;

export const Default: Story = {
	args: {
		color: 'primary',
		items: [
			{ title: 'Level 1', href: '#' },
			{ title: 'Level 2', href: '#' },
			{ title: 'Level 3', href: '#' }
		]
	}
};
