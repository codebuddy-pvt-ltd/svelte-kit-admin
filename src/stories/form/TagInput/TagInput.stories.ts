import TagInput from '$lib/components/Form/TagInput/TagInput.svelte';
import type { Meta, StoryObj } from '@storybook/svelte';

const meta = {
	title: 'Components/TagInput',
	component: TagInput,
	tags: ['autodocs'],
	argTypes: {
		label: {
			control: 'text',
			defaultValue: 'Select',
			description: 'The label of the select'
		},
		clearable: {
			control: 'boolean',
			defaultValue: false,
			description: 'Whether the select is clearable'
		},
		searchable: {
			control: 'boolean',
			defaultValue: false,
			description: 'Whether the select is searchable'
		},
		disabled: {
			control: 'boolean',
			defaultValue: false,
			description: 'Whether the select is disabled'
		},
		allowDuplicates: {
			control: 'boolean'
		},
		limit: {
			control: 'number',
			min: 0
		},
		error: {
			control: 'text'
		},
		required: {
			control: 'boolean'
		}
	}
} satisfies Meta<TagInput>;

export default meta;

type Story = StoryObj<TagInput>;

export const Default: Story = {
	args: {
		label: 'Select',
		clearable: false,
		searchable: false,
		disabled: false,
		allowDuplicates: false,
		limit: 0,
		error: '',
		required: false,
		options: ['React', 'Svelte', 'Vue', 'Angular', 'Ember']
	}
};
