<script>
	import { createEventDispatcher, getContext } from 'svelte'
	import { TABS } from './Tabs.svelte'

	export let label
	export let tab = {}

	const dispatch = createEventDispatcher()
	const { setTab, selectByTab, selectedTab } = getContext(TABS)

	setTab(tab)

	const withSlot = $$props.$$slots
</script>

<button
	class="tab focus:outline-none text-lg	{$$props.class || ''}"
	class:selected="{$selectedTab === tab}"
	on:click="{() => {
		selectByTab(tab)
		dispatch('click', tab)
	}}"
>
	{#if withSlot}
		<slot />
	{:else}{label}{/if}
</button>
