import FileInput from '$lib/components/Form/FileInput.svelte';
import type { Meta, StoryObj } from '@storybook/svelte';

const meta = {
	title: 'Components/FileInput',
	component: FileInput,
	tags: ['autodocs'],
	argTypes: {
		clearable: { control: 'boolean', defaultValue: false },
		label: { control: 'text', defaultValue: 'File' },
		description: { control: 'text', defaultValue: '' },
		error: { control: 'text', defaultValue: '' },
		disabled: { control: 'boolean', defaultValue: false },
		multiple: { control: 'boolean', defaultValue: false },
		placeholder: { control: 'text', defaultValue: 'Select a file...' }
	}
} satisfies Meta<FileInput<false>>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		clearable: false,
		label: 'File',
		description: 'Select files to upload',
		error: '',
		disabled: false,
		multiple: false,
		placeholder: 'Select a file...'
	}
};
