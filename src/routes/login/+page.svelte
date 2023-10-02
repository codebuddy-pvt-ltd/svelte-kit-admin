<script lang="ts">
	import Chip from '$lib/components/Form/Chip.svelte';
	import Switch from '$lib/components/Form/Switch.svelte';
	import TabSelect from '$lib/components/Form/TabSelect.svelte';
	import TextInput from '$lib/components/Form/TextInput.svelte';
	import Anchor from '$lib/components/navigation/Anchor.svelte';
	import Breadcrumbs from '$lib/components/navigation/Breadcrumbs.svelte';

	let radioValue: string | undefined = 'left';

	let options = [
		{ label: 'Left', value: 'left' },
		{ label: 'Right', value: 'right', disabled: true },
		{ label: 'Top', value: 'top' },
		{
			label: 'Bottom',
			value: 'bottom',
			icon: 'mdi:arrow-bottom-left'
		}
	];
</script>

<section class="flex flex-1 flex-col items-center justify-center self-center">
	<form method="post" action="/login" class="rounded-lg bg-white p-5">
		<TextInput required name="email" type="email">
			<svelte:fragment slot="label">Email</svelte:fragment>
			<svelte:fragment slot="left">@</svelte:fragment>
		</TextInput>

		<Chip>Test</Chip>

		<TabSelect {options} bind:group={radioValue} />

		<Switch>Test</Switch>

		<Anchor color="accent" underline="hover">Link</Anchor>

		<Breadcrumbs
			items={[
				{ title: 'Level 1', href: '#' },
				{ title: 'Level 2', href: '#' },
				{ title: 'Level 3', href: '#' }
			]}
		/>
	</form>
</section>
