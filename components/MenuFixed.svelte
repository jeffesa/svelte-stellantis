<script>
	import { onMount } from 'svelte'
	import { registerTrack } from '~/components/DataLayer/Track.svelte'
  import { debounce } from '~/lib'
	import Button from './Button'

	let isVisible = false
  const hideMenu = debounce(() => isVisible = true, 100)

	onMount(() => {
		const listener = window.addEventListener('scroll', () => {
      isVisible = false
      hideMenu()
    })

		return () => window.removeEventListener('scroll', listener)
	})
</script>

<div
	class:isVisible
	class="fixed inset-x-0 z-20 flex items-stretch items-center invisible w-full p-3 shadow-md transition-all duration-500 shadow-menuShadow -bottom-16" style="background-color: #212121"
>
	<Button
		to="https://www.citroenbr.com.br/monte-o-seu/c4-cactus?utm_source=showroom-cactus&utm_medium=menu-showroom-cactus&utm_campaign=showroom-cactus"
		isBlank
		styles="background-color: #6E6E6E"
		label="Monte o seu"
		class="w-1/2 px-4 py-4 mr-3 text-xl text-center text-white bg-secondary citroen citroen-500"
		on:click="{() => {
			registerTrack('MenuFixed_ClicouMonteOSeu')
		}}"
	/>

	<Button
		to="https://citroenbr.com.br/formulario/proposta/#sticky"
		label="Compre o Seu" styles="background-color: #E1412D"
		class="w-1/2 px-4 py-4 text-xl text-center text-white citroen citroen-500"
		on:click="{() => {
			registerTrack('MenuFixed_ClicouAgendeSeuTesteDrive')
		}}"
	/>
</div>

<style>
	div {
		&.isVisible {
			@apply bottom-0 visible;
		}
	}
</style>
