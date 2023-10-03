import type { Meta, StoryObj } from '@storybook/svelte';
import NavLink from './NavLink.svelte';
import { Colors } from '$lib/components/utils/theme';

const meta = {
	title: 'Navigation/NavLink',
	component: NavLink,
	tags: ['autodocs'],
	argTypes: {
		variant: {
			control: { type: 'radio' },
			options: ['filled', 'subtle', 'default']
		},
		color: {
			control: { type: 'radio' },
			options: Object.values(Colors)
		},
		active: {
			control: { type: 'boolean' },
			defaultValue: false
		}
	}
} satisfies Meta<NavLink>;

export default meta;

type Story = StoryObj<NavLink>;

export const Default: Story = {
	args: {
		variant: 'default',
		color: 'primary',
		active: false,
		leftIcon: 'mdi:nodejs',
		rightIcon: 'mdi:chevron-right'
	}
};
