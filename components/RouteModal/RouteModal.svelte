<script>
	import { fade } from 'svelte/transition'
	import { path, goto, query as q } from '~/lib'
	import Route from './Route.svelte'

	const fetchModals = async () => {
		const res = await fetch('data/data-modals.json')
		return await res.json()
	}

	function closeExactly({ target }) {
    if (target.getAttribute('role') === 'dialog') {
      q('body').classList.remove('is-modal-open')
      goto('')
    }
	}
</script>

<style>
	div {
		background: rgb(0 0 0 / 50%);
		transform: translateZ(0);
	}
</style>

{#await fetchModals() then modals}
	{#if $path !== '' && window.location.hash.substring(1) !== 'TipsFold'}
		<div
			role="dialog"
			aria-modal="true"
			class="fixed inset-0 z-40"
			transition:fade="{{ duration: 100 }}"
			on:click="{closeExactly}"
		>
			{#each modals as modal, index}
				<Route name="{modal.route}" currentIndex="{index}" data="{modals}" />
			{/each}
			<Route name="agenda" />
		</div>
	{/if}
{/await}
