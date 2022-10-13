<script>
	import { getContext, createEventDispatcher } from 'svelte'
	import Icon from '../Icon'
	import { theme } from '~/lib'
	import { ACCORDIONS } from './Accordions.svelte'

	export let name = ''
	export let label = ''
	export let accordion
	export let drawLine = true
	export let opened = false

	const dispatch = createEventDispatcher()
	const { setAccordion, selectByAccordion, selectedAccordion } = getContext(ACCORDIONS)

	setAccordion(accordion)

	const selectAccordion = (evt) => {
    // clear selected if was already select
		// if ($selectedAccordion === accordion) {
		if (opened) {
			selectByAccordion(null)
			// drawLine = true
			opened = false
		} else {
			opened = true
			selectByAccordion(accordion)
		}
		dispatch('click', evt)
	}
</script>

<button
	data-accordion-button={name}
	data-accordion-button-opened={opened}
	
	class="outline-none focus:outline-none accordion {$$props.class || ''}"
	class:selected="{$selectedAccordion === accordion}"
	on:click="{(evt) => selectAccordion(evt)}"
>
	<div
		class="flex w-11/12 py-4 pl-0 lg:pl-4 m-auto citroen citroen-500 text-xl a {drawLine && !opened ? 'border-b-2' : 'border-b-0'}"
		style="border-color: #2E2E2E; color: #BABABA"
	>
		<Icon.Chevron
			class="mr-4 relative top-1 animate"
			type="{opened && $selectedAccordion === accordion ? 'up' : 'down'}"
			scale="{0.8}"
			color="#E1412D"
		/>
		{label}
	</div>
</button>
