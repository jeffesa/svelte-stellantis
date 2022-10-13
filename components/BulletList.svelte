<script>
	import { createEventDispatcher, onMount } from 'svelte'
	import { Button, Icon } from './'
	export let items = []
	export let activedIndex = 0
	export let styles = {}
	export let controlArrows = true
	export let nextLabel = ''
  export let style = ''
	const dispatch = createEventDispatcher()
  let defaultStyles = {
		iconColor: 'bg-secondary',
		bullet: {
			default: '',
			activated: 'bg-secondary border-none'
		},
		bulletActivated: 'bg-trinary'
  }
  onMount(() => {
		console.log('===================================================================')
		console.log('BulletList.activedIndex:', activedIndex); 	
	})
  $: (defaultStyles = {...defaultStyles, ...styles})
</script>

<div style="{style}" class="BulletList px-5 py-4 grid grid-flow-col space-x-7 {$$props.class || ''} {items.length > 1 ? '' : 'invisible'}">
	<!-- PREV -->
	{#if controlArrows}
		<Button class="" on:click="{(evt) => dispatch('prev', evt)}">
			<Icon.Chevron type="left" scale="{1.2}" color="var(--secondary-default)" />
		</Button>
	{/if}

	<!-- BULLETS -->
  <div class="grid grid-cols-{items.length} gap-2 sm:grid-cols-{items.length}-fixed items-center">
		{#each items as _, index}
			<Button
				on:click="{() => dispatch('index', index)}"
				class="w-2 h-2 sm:w-2 sm:h-2 m-auto rounded-full transition duration-700 flex items-center justify-center {defaultStyles.bulletActivated} {index === activedIndex && 'border-0'}"
			>
				<i
					class="block w-2 h-2 transition duration-700 rounded-full {defaultStyles.bullet.default} {index === activedIndex && defaultStyles.bullet.activated}"
				></i>
			</Button>
		{/each}
	</div>

	<!-- NEXT -->
	{#if controlArrows}
		<Button class="flex justify-end secondary-default" on:click="{(evt) => dispatch('next', evt)}">
			{#if nextLabel}
				<div class="flex items-center justify-between w-auto px-2 py-1 text-left">
					<span class="text-secondary text-micro">{nextLabel}</span>
					<Icon.Chevron type="right" color="var(--secondary-default)" scale="{1.2}" />
				</div>
			{:else}
				<Icon.Chevron type="right" scale="{1.2}" color="var(--secondary-default)" />
			{/if}
		</Button>
	{/if}
</div>