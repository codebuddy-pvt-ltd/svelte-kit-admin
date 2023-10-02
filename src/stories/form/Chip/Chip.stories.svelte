<script>
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
	import Chip from '$lib/components/Form/Chip.svelte';
</script>

<Meta title="Components/Chip" component={Chip} />

<Template let:args>
	<div class="mb-7 flex gap-4">
		<Chip {...args} color="primary">Label</Chip>
		<Chip {...args} color="accent">Label</Chip>
		<Chip {...args} color="dark">Label</Chip>
		<Chip {...args} color="light">Label</Chip>
		<Chip {...args} color="success">Label</Chip>
		<Chip {...args} color="warning">Label</Chip>
		<Chip {...args} color="danger">Label</Chip>
	</div>
	<div class="mb-7 flex gap-4">
		<Chip {...args} checked color="primary">Label</Chip>
		<Chip {...args} checked color="accent">Label</Chip>
		<Chip {...args} checked color="dark">Label</Chip>
		<Chip {...args} checked color="light">Label</Chip>
		<Chip {...args} checked color="success">Label</Chip>
		<Chip {...args} checked color="warning">Label</Chip>
		<Chip {...args} checked color="danger">Label</Chip>
	</div>

	<div class="mb-7 flex gap-4">
		<Chip {...args} variant="outline" color="primary">Label</Chip>
		<Chip {...args} variant="outline" color="accent">Label</Chip>
		<Chip {...args} variant="outline" color="dark">Label</Chip>
		<Chip {...args} variant="outline" color="light">Label</Chip>
		<Chip {...args} variant="outline" color="success">Label</Chip>
		<Chip {...args} variant="outline" color="warning">Label</Chip>
		<Chip {...args} variant="outline" color="danger">Label</Chip>
	</div>
	<div class="mb-7 flex gap-4">
		<Chip {...args} checked variant="outline" color="primary">Label</Chip>
		<Chip {...args} checked variant="outline" color="accent">Label</Chip>
		<Chip {...args} checked variant="outline" color="dark">Label</Chip>
		<Chip {...args} checked variant="outline" color="light">Label</Chip>
		<Chip {...args} checked variant="outline" color="success">Label</Chip>
		<Chip {...args} checked variant="outline" color="warning">Label</Chip>
		<Chip {...args} checked variant="outline" color="danger">Label</Chip>
	</div>

	<div class="mb-7 flex gap-4">
		<Chip {...args} variant="subtle" color="primary">Label</Chip>
		<Chip {...args} variant="subtle" color="accent">Label</Chip>
		<Chip {...args} variant="subtle" color="dark">Label</Chip>
		<Chip {...args} variant="subtle" color="light">Label</Chip>
		<Chip {...args} variant="subtle" color="success">Label</Chip>
		<Chip {...args} variant="subtle" color="warning">Label</Chip>
		<Chip {...args} variant="subtle" color="danger">Label</Chip>
	</div>
	<div class="mb-7 flex gap-4">
		<Chip {...args} checked variant="subtle" color="primary">Label</Chip>
		<Chip {...args} checked variant="subtle" color="accent">Label</Chip>
		<Chip {...args} checked variant="subtle" color="dark">Label</Chip>
		<Chip {...args} checked variant="subtle" color="light">Label</Chip>
		<Chip {...args} checked variant="subtle" color="success">Label</Chip>
		<Chip {...args} checked variant="subtle" color="warning">Label</Chip>
		<Chip {...args} checked variant="subtle" color="danger">Label</Chip>
	</div>
</Template>

<Story name="Variants" />
