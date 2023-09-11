<script>
	import Input from '$lib/components/Input.svelte';
</script>

<section class="flex flex-1 flex-col items-center justify-center self-center">
	<form method="post" action="/login" class="rounded-lg bg-white p-5">
		<Input required name="email" type="email">
			<svelte:fragment slot="label">
				Email <strong>@</strong>
			</svelte:fragment>
		</Input>
		<input type="password" name="password" />
		<button type="submit">Login</button>
	</form>
</section>
