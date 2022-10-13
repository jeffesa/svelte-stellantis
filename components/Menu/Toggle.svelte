<script>
	import { getContext } from 'svelte'
	import Icon from '~/components/Icon'
	import { MENU } from './Menu.svelte'
	import { device as device$ } from '~/lib'

	const { toggled$, toggle } = getContext(MENU)

  export function toggleMenu () {
    toggle()
  }
</script>

{#if $device$.isMobile}
	<div
		aria-label="Fecha o menu"
		role="button"
		class="absolute left-0 w-12 h-12 rounded-sm Toggle-menu sm:w-10 sm:h-10 bg-white sm:left-auto sm:-right-3 md:right-0 lg:-right-3 sm:mt-2"
	>
		<button
			class="flex items-center justify-center w-full h-full text-white border border-gray-100 rounded-sm border-primary-fg sm:border-none"
			on:click="{() => toggle()}"
		>
			{#if $toggled$}
				<Icon.Menu />
			{:else}
				<Icon.Close color="var(--secondary-default)" />
			{/if}
		</button>
	</div>
{/if}