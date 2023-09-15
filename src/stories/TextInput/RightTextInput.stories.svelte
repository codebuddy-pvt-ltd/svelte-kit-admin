<script>
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
	import RightTextInput from './RightTextInput.svelte';
</script>

<Meta title="Components/TextInput" component={RightTextInput} />

<Template let:args>
	<RightTextInput {...args} />
</Template>

<Story name="TextInput with Right" />
