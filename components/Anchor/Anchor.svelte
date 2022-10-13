<script context="module">
	import View from '~/components/View'
	import { registerTrack } from '~/components/DataLayer/Track.svelte'
	import { scrolled } from '~/lib/anchor'

	let debouncing

	window.addEventListener('scroll', () => {
		clearTimeout(debouncing)
		debouncing = setTimeout(() => {
			scrolled.set(window.scrollY)
		}, 250)
	})
</script>

<script>
	import { onMount } from 'svelte'
	import { anchored, anchors, pageHeight as pageHeight$ } from '~/lib/anchor'

	export let name
	export let track

	let view

	onMount(() => {
		const ro = new ResizeObserver(() => {
			const body = document.body
			const html = document.documentElement

			pageHeight$.set(
				Math.max(
					body.scrollHeight,
					body.offsetHeight,
					html.clientHeight,
					html.scrollHeight,
					html.offsetHeight
				)
			)
		})
		ro.observe(view.getElement())
	})

	const triggerAnchor = ({ detail: { nearTop, height } }) => {
		anchored({ name, nearTop, height })
	}

	$: anchor = $anchors ? $anchors.get(name) : null
	$: isAnchored = anchor ? anchor.isActive : false

	$: if (isAnchored) {
		registerTrack('App_Pageview', track)
	}
</script>

<View
	bind:this="{view}"
	name="{name}"
	class="{$$props.class}"
	on:near="{(evt) => triggerAnchor(evt)}"
>
	<slot />
</View>
