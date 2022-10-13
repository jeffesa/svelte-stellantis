<script>
	import { getContext } from 'svelte'
	import { TABS } from './Tabs.svelte'

	const content = {}
	const { setContent, selectedContent } = getContext(TABS)

	setContent(content)
</script>

{#if $selectedContent === content}
  <div class="Tab-content {$$props.class || ''}">
		<slot />
	</div>
{/if}
