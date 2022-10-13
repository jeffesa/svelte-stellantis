<script>
	import { getContext } from 'svelte'
	import { fly } from 'svelte/transition'
	import { ACCORDIONS } from './Accordions.svelte'

	export let show = false;

	const content = {};
	const { setContent, selectedContent } = getContext(ACCORDIONS);

	setContent(content);
</script>

{#if show}
	<div
		in:fly="{{ x: 100, delay: 1000 }}"
		out:fly="{{ x: -100, delay: 0 }}"
		class="Accordion-content w-full {$$props.class || ''} {$selectedContent === content ? 'is-current' : ''}"
	>
		<slot />
	</div>
{/if}
