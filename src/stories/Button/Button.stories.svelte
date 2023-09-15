<script>
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
	import Button from '$lib/components/Button.svelte';
</script>

<Meta title="Components/Button" component={Button} />

<Template let:args>
	<div class="mb-7 flex gap-4">
		<Button {...args} color="primary">Label</Button>
		<Button {...args} color="accent">Label</Button>
		<Button {...args} color="dark">Label</Button>
		<Button {...args} color="light">Label</Button>
		<Button {...args} color="success">Label</Button>
		<Button {...args} color="warning">Label</Button>
		<Button {...args} color="danger">Label</Button>
	</div>

	<div class="mb-7 flex gap-4">
		<Button {...args} variant="outline" color="primary">Label</Button>
		<Button {...args} variant="outline" color="accent">Label</Button>
		<Button {...args} variant="outline" color="dark">Label</Button>
		<Button {...args} variant="outline" color="light">Label</Button>
		<Button {...args} variant="outline" color="success">Label</Button>
		<Button {...args} variant="outline" color="warning">Label</Button>
		<Button {...args} variant="outline" color="danger">Label</Button>
	</div>

	<div class="mb-7 flex gap-4">
		<Button {...args} variant="subtle" color="primary">Label</Button>
		<Button {...args} variant="subtle" color="accent">Label</Button>
		<Button {...args} variant="subtle" color="dark">Label</Button>
		<Button {...args} variant="subtle" color="light">Label</Button>
		<Button {...args} variant="subtle" color="success">Label</Button>
		<Button {...args} variant="subtle" color="warning">Label</Button>
		<Button {...args} variant="subtle" color="danger">Label</Button>
	</div>

	<div class="mb-7 flex gap-4">
		<Button {...args} variant="text" color="primary">Label</Button>
		<Button {...args} variant="text" color="accent">Label</Button>
		<Button {...args} variant="text" color="dark">Label</Button>
		<Button {...args} variant="text" color="light">Label</Button>
		<Button {...args} variant="text" color="success">Label</Button>
		<Button {...args} variant="text" color="warning">Label</Button>
		<Button {...args} variant="text" color="danger">Label</Button>
	</div>
</Template>

<Story name="Variants" />
