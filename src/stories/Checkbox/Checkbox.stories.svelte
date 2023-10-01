<script>
	import Checkbox from '$lib/components/Form/Checkbox.svelte';
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
</script>

<Meta title="Components/Checkbox" component={Checkbox} />

<Template let:args>
	<Checkbox {...args}>Label</Checkbox>
</Template>

<Story name="Variants" />
