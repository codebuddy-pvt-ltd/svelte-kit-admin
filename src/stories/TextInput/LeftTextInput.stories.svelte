<script>
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
	import LeftTextInput from './LeftTextInput.svelte';
</script>

<Meta title="Components/TextInput" component={LeftTextInput} />

<Template let:args>
	<LeftTextInput {...args} />
</Template>

<Story name="TextInput with Left" />
