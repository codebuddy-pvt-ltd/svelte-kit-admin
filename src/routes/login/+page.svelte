<script lang="ts">
	import Divider from '$lib/components/layouts/Divider.svelte';
	import Group from '$lib/components/layouts/Group.svelte';
</script>

<div class="text-white">
	<Group class="text-white">
		<h6>Hello World</h6>
		<h6>Hola Mundo</h6>
		<h6>Buenos dias</h6>
	</Group>

	<Divider />
	<Divider thickness={8} />

	<Divider>Hello World</Divider>
</div>
