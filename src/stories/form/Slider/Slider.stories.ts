import Slider from '$lib/components/Form/Slider/Slider.svelte';
import type { Meta, StoryObj } from '@storybook/svelte';

const meta = {
	title: 'Components/Slider',
	component: Slider,
	tags: ['autodocs'],
	argTypes: {
		min: { control: 'number', description: 'Minimum value', defaultValue: 0 },
		max: { control: 'number', description: 'Maximum value', defaultValue: 100 },
		step: { control: 'number', description: 'Step value', defaultValue: 1 }
	}
} as Meta<Slider>;

export default meta;

type Story = StoryObj<Slider>;

export const Default: Story = {
	args: {
		min: 0,
		max: 100,
		step: 1
	}
};
