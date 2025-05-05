<script>
	import { fetchData } from '$lib';
	import Button from '$lib/Button.svelte';
	import NavBar from '$lib/NavBar.svelte';
	import { onMount } from 'svelte';

	let inputUrl;
	let isLoading = false;
	let error = null;
	let response = null;

	onMount(() => {
		const saved = localStorage.getItem('response');
		if (saved) {
			response = JSON.parse(saved);
		}
	});

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (isLoading) return;

		const url = inputUrl?.value?.trim();
		if (!url) return;
		isLoading = true;
		const result = await fetchData(url);
		if (result.error) {
			error = result.error;
		} else {
			response = result?.data;
			localStorage.setItem('response', JSON.stringify(response));
		}
		isLoading = false;
	};

	// $: if (response) {
	// 	// console.log('Updated response:', response);
	// }
</script>

<svelte:head>
	<title>Article Extractor And Summarizer</title>
	<meta charset="UTF-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<meta name="description" content="Extract and summarize any article in seconds with AI." />
	<meta name="keywords" content="Article Extractor, Summarizer, AI Tool, Text Summarizer" />
	<meta name="author" content="Lakshya Roy" />
</svelte:head>

<NavBar />
<div
	class="flex min-h-[calc(100vh-75px)] w-full flex-col items-center justify-start gap-4 bg-[#0F0F0F] p-6 text-white"
>
	<div class="flex w-full flex-col items-center gap-4 py-10 md:w-1/2">
		<h2 class="w-full text-left text-3xl font-bold text-white/80 md:text-5xl">Article Extractor</h2>

		<form on:submit={handleSubmit} class="flex w-full flex-col items-center justify-center gap-4">
			<div class="w-full">
				<input
					bind:this={inputUrl}
					type="url"
					placeholder="Enter the URL here"
					class="w-full rounded-md px-4 py-2.5 outline outline-white/50"
					required
				/>
			</div>

			<div class="flex w-full gap-2">
				<Button text={isLoading ? 'Loading...' : 'Extract'} disabled={isLoading} />
			</div>

			{#if error}
				<p class="text-red-500">{error}</p>
			{/if}

			{#if response}
				<div class="w-full overflow-auto break-words text-white shadow-lg">
					<!-- Title -->
					<h3 class="mb-2 text-2xl font-bold text-white">{response.title}</h3>

					<!-- Image -->
					{#if response.image}
						<img
							src={response.image}
							alt="Article Image"
							class="mb-4 w-full rounded-md"
							aria-hidden="true"
						/>
					{/if}

					<!-- Description -->
					{#if response.description}
						<p class="mb-4 text-white/80">{response.description}</p>
					{/if}

					<!-- Content -->
					{#if response.content}
						<div class="prose prose-sm max-w-none text-white/80">
							{@html response.content}
						</div>
					{/if}

					<!-- Source and Published Date -->
					<p class="mt-4 text-sm text-white/80">
						<strong>Source:</strong>
						{response.source} <br />
						<strong>Published:</strong>
						{response.published}
					</p>

					<!-- Links (if available) -->
					{#if response.links && response.links.length > 0}
						<div class="mt-4">
							<strong>Links:</strong>
							<ul class="ml-4 list-disc">
								{#each response.links as link}
									<li class="mb-2">
										<a href={link} target="_blank" class=" text-blue-400 hover:underline">{link}</a>
									</li>
								{/each}
							</ul>
						</div>
					{/if}

					<!-- Author (if available) -->
					{#if response.author}
						<p class="mt-4 text-sm text-white/80">
							<strong>Author:</strong>
							{response.author}
						</p>
					{/if}

					<!-- Time to Read (if available) -->
					{#if response.ttr}
						<p class="mt-4 text-sm text-white/80">
							<strong>Time to Read:</strong>
							{response.ttr} minutes
						</p>
					{/if}

					<!-- Modified Date (if available) -->
					{#if response.md}
						<p class="mt-4 text-sm text-white/80">
							<strong>Modified Date:</strong>
							{response.md}
						</p>
					{/if}
				</div>
			{/if}
		</form>
	</div>
</div>
