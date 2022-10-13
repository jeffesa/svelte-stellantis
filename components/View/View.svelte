<script context="module">
	import { createEventDispatcher } from 'svelte'
	import { scrolled, pageHeight as pageHeight$ } from '~/lib/anchor'
</script>

<script>
	export let name

  let viewEl

  export function getElement () {
    return viewEl 
  }

	const nodeRectTopHeight = (node) => {
		const nodeRect = node.getBoundingClientRect()

		return {
			nearTop: nodeRect.top - 90,
			height: nodeRect.height - 90
		}
	}

	// Custom Event to listen Node moviment
	const dispatch = createEventDispatcher()

	function rect(node) {
		// Listen window scroll to emit the near from top
		scrolled.subscribe(() => dispatch('near', nodeRectTopHeight(node)))

    // Listen page height
    // This value is incremented when some component is changed (style size)
    pageHeight$.subscribe(() => dispatch('near', nodeRectTopHeight(node)))

		// Emit near on create element
		dispatch('near', nodeRectTopHeight(node))

		return {}
	}
</script>

<section 
  bind:this="{viewEl}"
  id="{name}" 
  class="relative {name} {$$props.class || ''}" 
  use:rect
>
	<slot />
</section>
