<script>
	import Checkbox from '$lib/components/Form/Checkbox.svelte';
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
</script>

<Meta title="Components/Checkbox" component={Checkbox} />

<Template let:args>
	<Checkbox {...args}>Normal</Checkbox>
	<Checkbox {...args} description="Lorem Isum de color">With Description</Checkbox>
	<Checkbox {...args} description="Lorem Isum de color" error="required">With Error</Checkbox>
	<Checkbox {...args} description="Lorem Isum de color" error="required" labelPosition="left">
		Left
	</Checkbox>
	<Checkbox
		{...args}
		description="Lorem Isum de color"
		error="required"
		labelPosition="left"
		disabled
	>
		Disabled
	</Checkbox>
</Template>

<Story name="Variants" />
