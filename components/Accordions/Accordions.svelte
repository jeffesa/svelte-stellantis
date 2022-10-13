<script context="module">
	export const ACCORDIONS = {}
</script>

<script>
	import { setContext, createEventDispatcher, tick } from 'svelte'
	import { writable } from 'svelte/store'
  import { gotoEl } from '~/lib'

  let accordionEl
  const dispatch = createEventDispatcher()
	const accordions = []
	const contents = []
	const selectedAccordion = writable(null)
	const selectedContent = writable(null)

	const selectByAccordion = async (accordion) => {
		const index = accordions.indexOf(accordion)
		selectedAccordion.set(accordion)
		selectedContent.set(contents[index])
    dispatch('change', accordion)

		// await for content expand
		await tick()
    const buttonSelectedEl = accordionEl.querySelector('button.selected')
    gotoEl(buttonSelectedEl, { duration: 700 })
	}

  export function getSelectedAccordion() {
    return $selectedAccordion
  }

	export function nextAccordion() {
		const nextAccordionIndex = accordions.indexOf($selectedAccordion) + 1
		selectByAccordion(accordions[nextAccordionIndex])
	}

	export function prevAccordion() {
		const prevAccordionIndex = accordions.indexOf($selectedAccordion) - 1
		selectByAccordion(accordions[prevAccordionIndex])
	}

	setContext(ACCORDIONS, {
		setAccordion: (accordion) => {
			accordions.push(accordion)
		},
		setContent: (content) => {
			contents.push(content)
		},
		selectByAccordion: (accordion) => selectByAccordion(accordion),
		selectedAccordion: selectedAccordion,
		selectedContent: selectedContent
	})
</script>

<div bind:this="{accordionEl}" class="Accordions {$$props.class || ''}">
	<slot />
</div>
