import type { Meta, StoryObj } from '@storybook/svelte';
import AppShell from './AppShell.svelte';

const meta = {
	title: 'Navigation/AppShell',
	component: AppShell,
	tags: ['autodocs'],
	argTypes: {
		layout: {
			control: 'radio',
			options: ['default', 'alternate'],
			defaultValue: 'default'
		},
		isHeaderFixed: {
			control: 'boolean',
			defaultValue: true
		}
	}
} satisfies Meta<AppShell>;

export default meta;

type Story = StoryObj<AppShell>;

export const Default: Story = {
	args: {
		layout: 'default',
		isHeaderFixed: true
	}
};
