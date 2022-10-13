<script context="module">
	export const TABS = {}
</script>

<script>
	import { setContext, createEventDispatcher } from 'svelte'
	import { writable } from 'svelte/store'

  const dispatch = createEventDispatcher()
	const tabs = []
	const contents = []
	const selectedTab = writable(null)
	const selectedContent = writable(null)

	export const selectByTab = (tab) => {
		const index = tabs.indexOf(tab)
		selectedTab.set(tab)
		selectedContent.set(contents[index])
    dispatch('change', tab)
	}

	export function nextTab() {
		const nextTabIndex = tabs.indexOf($selectedTab) + 1
		selectByTab(tabs[nextTabIndex])
	}

	export function prevTab() {
		const prevTabIndex = tabs.indexOf($selectedTab) - 1
		selectByTab(tabs[prevTabIndex])
	}

  export function getSelectedTab() {
    return selectedTab
  }

	setContext(TABS, {
		setTab: (tab) => {
			tabs.push(tab)
			selectedTab.update((current) => current || tab)
		},
		setContent: (content) => {
			contents.push(content)
			selectedContent.update((current) => current || content)
		},
		selectByTab: (tab) => selectByTab(tab),
		selectedTab: selectedTab,
		selectedContent: selectedContent
	})
</script>

<div class="Tab {$$props.class || ''}">
	<slot />
</div>
