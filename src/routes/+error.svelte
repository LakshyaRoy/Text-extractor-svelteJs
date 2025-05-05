<script>
	export let error;
	export let status;
	import { page } from '$app/stores';

	// $: this means that the currentUrl variable will be updated whenever the page.url object changes
	$: currentUrl = $page.url.href;
	$: finalStatus = status || 404;
	$: finalMessage = error?.message || 'Oops! Page not found.';
</script>

<svelte:head>
	<title>{finalStatus} - Page Not Found</title>
</svelte:head>

<div class="flex h-screen w-full flex-col items-center justify-center bg-[#0F0F0F] p-6 text-white">
	<h1 class="text-5xl font-bold">{finalStatus}</h1>
	<h1 class="text-3xl font-bold">{currentUrl}</h1>
	<p class="mt-4 text-lg">{finalMessage}</p>
	<a href="/" class="mt-6 text-blue-400 underline">Go back home</a>
</div>
