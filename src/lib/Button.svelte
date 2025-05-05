<script>
	export let text = 'Click me';
	export let onClick = () => {};
	export let isDisabled = false;
</script>

<button
	on:click={onClick}
	disabled={isDisabled}
	type="submit"
	class="h-full w-fit cursor-pointer rounded bg-gray-700 px-4 py-2.5 text-white"
>
	{text}
</button>
