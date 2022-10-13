<script>
	import { getContext, createEventDispatcher } from 'svelte'
	import { SWIPER } from './Swiper.svelte'

	export let index = 0

	const dispatch = createEventDispatcher()

  const ctx = getContext(SWIPER) || {}

  let activeIndex$
  let axis$

  if (Object.keys(ctx).length) {
    activeIndex$ = ctx.activeIndex$
    axis$ = ctx.axis$
  }
</script>

<div
	on:click="{(evt) => dispatch('click', evt)}"
	class:isSelected="{$activeIndex$ === index}"
	class="flex-none __swiper-item {$$props.class || ''}"
	style="transform: translate3d({$axis$}px, 0, 0)"
>
	<slot />
</div>

<style>
	div {
    will-change: transform;

		:global(> *) {
			@apply select-none;
		}

		:global(img) {
			-webkit-user-drag: none;
		}
	}
</style>
