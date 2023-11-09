import type { Meta, StoryObj } from '@storybook/svelte';
import Group from './Group.svelte';
import { FlexItemsAlignments, FlexJustifyContents, Sizes } from '$lib/components/utils/theme';

const meta = {
	title: 'layouts/Group',
	component: Group,
	tags: ['autodocs'],
	argTypes: {
		align: {
			control: 'select',
			options: Object.values(FlexItemsAlignments),
			defaultValue: FlexItemsAlignments.CENTER
		},
		justify: {
			control: 'select',
			options: Object.values(FlexJustifyContents),
			defaultValue: FlexJustifyContents.CENTER
		},
		gap: {
			control: 'select',
			options: Object.values(Sizes),
			defaultValue: Sizes.SMALL
		},
		grow: {
			control: 'boolean',
			defaultValue: false
		},
		preventGrowOverflow: {
			control: 'boolean',
			defaultValue: false
		},
		wrap: {
			control: 'boolean',
			defaultValue: false
		}
	}
} satisfies Meta<Group>;

export default meta;

type Story = StoryObj<Group>;

export const Default: Story = {
	args: {
		align: FlexItemsAlignments.CENTER,
		justify: FlexJustifyContents.CENTER,
		gap: Sizes.SMALL,
		grow: false,
		preventGrowOverflow: false,
		wrap: false
	}
};
