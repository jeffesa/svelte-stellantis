<script>
	import { createEventDispatcher } from 'svelte'
	import ArrowControlButton from './ArrowControlButton.svelte'

	export let disabled = false

	const dispatch = createEventDispatcher()
</script>

<ArrowControlButton 
  class="{$$props.class}"
  type="left" 
  disabled="{disabled}" 
  on:click="{() => dispatch('click')}" 
/>
