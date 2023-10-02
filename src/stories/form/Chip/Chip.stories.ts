import type { Meta, StoryObj } from '@storybook/svelte';
import Chip from './Chip.svelte';
import { Colors, Radii, Sizes } from '$lib/components/utils/theme';

const meta = {
	title: 'Components/Chip',
	component: Chip,
	tags: ['autodocs'],
	argTypes: {
		variant: {
			control: 'select',
			options: ['filled', 'outline', 'subtle'],
			defaultValue: 'filled'
		},
		color: {
			control: 'select',
			options: Object.values(Colors),
			defaultValue: 'primary',
			description: 'The variant of the button'
		},
		disabled: {
			control: 'boolean',
			defaultValue: false,
			description: 'Whether the button is disabled'
		},
		size: {
			control: 'select',
			options: Object.values(Sizes),
			defaultValue: 'md',
			description: 'The size of the button'
		},
		radius: {
			control: 'select',
			options: Object.values(Radii),
			defaultValue: 'default',
			description: 'The radius of the button'
		}
	}
} satisfies Meta<Chip>;

export default meta;

type Story = StoryObj<Chip>;

export const Default: Story = {
	args: {
		variant: 'filled',
		color: 'primary',
		size: 'md',
		radius: 'full',
		disabled: false,
		checked: true
	}
};
