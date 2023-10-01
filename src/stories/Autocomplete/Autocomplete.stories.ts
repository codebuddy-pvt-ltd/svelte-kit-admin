import Autocomplete from '$lib/components/Form/Autocomplete.svelte';
import type { Meta } from '@storybook/svelte';

const meta = {
	title: 'Components/Autocomplete',
	component: Autocomplete,
	tags: ['autodocs'],
	argTypes: {
		disabled: {
			control: 'boolean',
			defaultValue: false,
			description: 'Whether the autocomplete is disabled'
		},
		label: {
			control: 'text',
			defaultValue: 'Select',
			description: 'The label of the select'
		}
	}
} satisfies Meta<Autocomplete>;

export default meta;

export const Default = {
	args: {
		disabled: false,
		label: 'Autocomplete',
		options: [
			{ value: '1', label: 'Option 1' },
			{ value: '2', label: 'Option 2' },
			{ value: '3', label: 'Option 3' }
		]
	}
};
