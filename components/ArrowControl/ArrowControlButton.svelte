<script>
	import { createEventDispatcher } from 'svelte'
	import Icon from '../Icon'
	import Button from '../Button'

	export let disabled = false
	export let type = ''

	const dispatch = createEventDispatcher()
</script>

<style>
	:global(.next-prev) {
		width: 64px;
		height: 48px;
	}
</style>

<Button
	disabled="{disabled}"
	on:click="{() => dispatch('click')}"
	class="flex items-center justify-center w-10 h-10 mr-1 bg-secondary rounded-full {disabled && 'cursor-not-allowed opacity-40'} {$$props.class || ''} next-prev"
>
	<Icon.Chevron type="{type}" />
</Button>
