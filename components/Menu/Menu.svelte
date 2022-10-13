<script context="module">
	export const MENU = {}
</script>

<script>
	import { setContext, onMount } from 'svelte'
	import { writable } from 'svelte/store'
	import { device as device$, query as q } from '~/lib'
	import { registerTrack } from '~/components/DataLayer/Track.svelte'

	const toggled$ = writable(false)
	const menu$ = writable(null)
	const transitions = {
		menu: [{ transform: 'translateX(0)' }, { transform: 'translateX(-100%)' }],
		toggle: [{ right: $device$.isDesk ? '-0.75rem' : 0 }, { right: $device$.isDesk ? '-2.50rem' : '-3rem' }],
		site: [{ marginLeft: '16%' }, { marginLeft: 0 }],
		opt: {
			duration: 250,
			easing: 'ease-in',
			fill: 'forwards'
		}
	}

  let menuEl
  let toggleMenuEl

  onMount(() => {
    menuEl = q('.Menu')
    toggleMenuEl = q('.Toggle-menu')
  })

	$: toggled$.set($device$.isMobile)

	setContext(MENU, {
		toggled$,
		menu$,
    toggle: async () => {
			// close menu and grow site
			if (!$toggled$) {
				registerTrack('Menu_ClicouFechar')
				q('body').classList.remove('is-menu-open')
				// // close menu
				// menuEl.animate(transitions.menu, transitions.opt)
				// // grow site
				// await q('main').animate(transitions.site, transitions.opt).finished
				// toggleMenuEl.animate(transitions.toggle, transitions.opt)
				toggled$.set(true)
			} else {
				registerTrack('Menu_ClicouAbrir')
			// 	// open menu and shrink site
			// 	toggleMenuEl.animate(
			// 		transitions.toggle.slice().reverse(), // reverse array without mutating
			// 		transitions.opt
			// 	)
			// 	// open menu
			// 	$menu$.animate(
			// 		transitions.menu.slice().reverse(), // reverse array without mutating
			// 		transitions.opt
			// 	)
			// 	// shrink site
			// 	await q('main').animate(transitions.site.slice().reverse(), transitions.opt).finished
			// 	// reset animated margin left
			// 	await q('main').animate(transitions.site, {
			// 		duration: 1,
			// 		easing: 'ease-in',
			// 		fill: 'forwards'
			// 	}).finished
				toggled$.set(false)
			// 	// apply site layout
				q('body').classList.add('is-menu-open')
			}
		}
	})

	$: if ($device$.isDesk) {
		q('body').classList.add('is-menu-open')
	} else {
		q('body').classList.remove('is-menu-open')
	}
</script>

<style>
	:global(.is-menu-open) {
		overflow: hidden;
		
		nav {
			left: 0;
			transition: box-shadow,left .2s ease-in-out,-webkit-box-shadow;
		}
	}

	@screen lg {
		:global(.is-menu-open) {
			overflow: auto;
		}
	}

	nav {
		left: -100%;
		transition: box-shadow,left .2s ease-in-out,-webkit-box-shadow;
		transform: translateZ(0);
		box-shadow: 0 0 18px #000;

		&.closed {
			transform: translateZ(0) translateX(-100%);
		}
		&.opened {
			&::after {
				content: '';
				position: absolute;
				width: 100%;
				height: 100%;
				left: 100%;
				top: 0px;
				background-color: black;
				opacity: 0.6;
			}
		}
		&.openedDesk {
			&::after {
				display: none;
			}
		}

		/* background-color: black; */
	}
</style>

<nav
	class="Menu fixed z-30 h-screen {$$props.class || ''}"
	bind:this="{$menu$}"
	class:opened="{!$toggled$}"
	class:openedDesk="{!$toggled$ && !$device$.isMobile}"
	class:closed="{$toggled$}"
>
	<slot />
</nav>
