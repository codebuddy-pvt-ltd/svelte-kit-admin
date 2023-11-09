<script lang="ts">
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
	import Divider from '$lib/components/layouts/Divider.svelte';
</script>

<Meta title="Layout/Divider" component={Divider} />

<Template let:args>
	<Divider {...args} />
	<Divider {...args} thickness={8} />
	<Divider {...args}>Hello World</Divider>
	<Divider {...args} thickness={4}>Hello World</Divider>
	<Divider {...args} thickness={4} color="success">Hello World</Divider>
</Template>

<Story name="Variants" />
