<script>
	import { onMount } from 'svelte';
	import NavBar from '$lib/NavBar.svelte';
	import Button from '$lib/Button.svelte';

	let selectedSummaryType = 'get-summary';
	let inputUrl;
	let paraText;
	let isLoading = false;
	let error = null;
	let response = null;

	const getEndpoint = 'https://article-extractor-and-summarizer.p.rapidapi.com/summarize';
	const postEndpoint = 'https://article-extractor-and-summarizer.p.rapidapi.com/summarize-text';
	const apiKey = import.meta.env.VITE_RAPID_API_KEY;
	const host = import.meta.env.VITE_RAPID_APP_HOST;

	const handleSubmit = async (e) => {
		e.preventDefault();

		// Check if the button is already loading to prevent double-click
		if (isLoading) return;

		const url = inputUrl?.value?.trim();
		const para = paraText?.value?.trim();
		isLoading = true; // Disable button here immediately
		error = null;
		response = null;

		try {
			if (selectedSummaryType === 'get-summary') {
				if (!url) {
					error = 'Please enter a URL';
					return;
				}
				// GET request - URL as query parameter
				const res = await fetch(`${getEndpoint}?url=${encodeURIComponent(url)}`, {
					method: 'GET',
					headers: {
						'x-rapidapi-host': host,
						'x-rapidapi-key': apiKey
					}
				});

				if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
				const data = await res.json();
				response = data?.summary;
			} else {
				// POST request - URL in request body
				if (!para) {
					error = 'Please enter a paragraph';
					return;
				}

				const res = await fetch(postEndpoint, {
					method: 'POST',
					headers: {
						'x-rapidapi-host': host,
						'x-rapidapi-key': apiKey,
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						lang: 'en',
						text: para
					})
				});

				if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
				const data = await res.json();
				response = data?.summary;
			}
		} catch (err) {
			error = err.message || 'Failed to fetch summary';
			console.error('Error:', err);
		} finally {
			isLoading = false;
		}
	};
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
		<h2 class="w-full text-left text-3xl font-bold text-white/80 md:text-5xl">
			Article Extractor And <br class="hidden md:block" /> Summarizer
		</h2>
		<div class="flex w-full flex-col gap-2">
			<div>
				<input
					type="radio"
					name="summary-type"
					value="get-summary"
					id="get-summary"
					bind:group={selectedSummaryType}
				/>
				<label for="get-summary">Get summary</label>
			</div>
			<div>
				<input
					type="radio"
					name="summary-type"
					value="post-summary"
					id="post-summary"
					bind:group={selectedSummaryType}
				/>
				<label for="post-summary">Post summary</label>
			</div>
		</div>

		<form on:submit={handleSubmit} class="flex w-full flex-col items-center justify-center gap-4">
			<div class="w-full">
				<label for="url" class="sr-only"> Enter URL </label>

				{#if selectedSummaryType === 'get-summary'}
					<input
						bind:this={inputUrl}
						type="url"
						name="url"
						placeholder="Enter the URL here (It can be a news url or some article url)"
						class="w-full rounded-md px-4 py-2.5 outline outline-white/50"
						required
					/>
				{/if}
				{#if selectedSummaryType === 'post-summary'}
					<textarea
						bind:this={paraText}
						type="url"
						rows="4"
						name="url"
						placeholder="Enter Your Paragraph"
						class="w-full rounded-md px-4 py-2.5 outline outline-white/50"
						required
					></textarea>
				{/if}
			</div>
			<div class="flex w-full gap-2">
				<Button text={isLoading ? 'Loading...' : 'Extract'} disabled={isLoading} />
			</div>
			{#if error}
				<p class="error">{error}</p>
			{/if}
		</form>

		{#if response}
			<div class="flex w-full flex-col gap-2 rounded-md p-4 outline outline-white/50">
				<h3 class="text-2xl font-bold text-white/80">Summary</h3>
				<p class="font-mono text-lg font-normal">{response || 'Here will be the summary'}</p>
			</div>
		{/if}
	</div>
</div>
