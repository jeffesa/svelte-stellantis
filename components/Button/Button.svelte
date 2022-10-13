<script>
	import { createEventDispatcher } from 'svelte'

	export let to = ''
	export let isBlank = false
	export let label = ''
  export let disabled = false
  export let styles = ''

	const dispatch = createEventDispatcher()
	const withSlot = $$props.$$slots
</script>

<!-- <style>
  .withHover {
    @apply transition duration-300 hover:opacity-80;
  }
</style> -->

{#if to}
	<a
		on:click="{() => dispatch('click')}"
    style="{styles}"
		href="{to}"
		class="withHover {$$props.class}"
		target="{isBlank ? '_blank' : '_self'}"
  >
    {label}
  </a>
{:else}
	<button
    class="outline-none {!disabled && 'withHover'} focus:outline-none {$$props.class}"
    style="{styles}"
    disabled="{disabled}"
		on:click="{(evt) => dispatch('click', evt)}"
	>
		{#if withSlot}
			<slot />
    {:else}
      {label}
    {/if}
	</button>
{/if}
