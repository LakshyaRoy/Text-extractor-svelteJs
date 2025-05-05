<script>
	import { onMount } from 'svelte';
	import LogoImage from '../asserts/Logo.webp';

	const navItem = [
		{ name: 'Summarize', url: '/' },
		{ name: 'Extract', url: '/extract' }
	];

	let showMenu = false;
	let menuRef;

	const handleCheckMenuClickedOutside = (e) => {
		if (showMenu && menuRef && !menuRef.contains(e.target)) {
			showMenu = false;
		}
	};

	const handleShowMenu = (e) => {
		e.stopImmediatePropagation();
		showMenu = !showMenu;
		// console.log('Menu is now: ', showMenu ? 'Visible' : 'Hidden');
	};

	onMount(() => {
		document.addEventListener('click', handleCheckMenuClickedOutside);
		return () => {
			document.removeEventListener('click', handleCheckMenuClickedOutside);
		};
	});
</script>

<nav class="flex justify-between bg-[#0F0F0F] p-6 text-white">
	<div class="flex items-center gap-2">
		<img src={LogoImage} alt="Logo" class="h-auto w-10" />
		<h1>Article Extractor</h1>
	</div>

	<ul class="hidden gap-4 md:flex">
		{#each navItem as item}
			<li>
				<a
					class=" hover:underline-white !text-white/90 hover:underline hover:underline-offset-2"
					href={item.url}>{item.name}</a
				>
			</li>
		{/each}
	</ul>

	<div class="relative block md:hidden">
		<!-- Add stopPropagation to prevent event bubbling -->
		<button aria-label="Menu" on:click={handleShowMenu}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="h-6 w-6"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"
				/>
			</svg>
		</button>

		{#if showMenu}
			<ul
				bind:this={menuRef}
				class="absolute top-full right-0 z-50 mt-2 flex flex-col gap-2 rounded border-2 border-white/50 bg-[#0F0F0F] p-2"
			>
				{#each navItem as item}
					<li class="rounded p-2 hover:bg-white/10">
						<a class="!text-white/90" href={item.url}>{item.name}</a>
					</li>
				{/each}
			</ul>
		{/if}
	</div>
</nav>
