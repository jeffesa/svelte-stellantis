<script>
	import { createEventDispatcher } from 'svelte'
	import { readable } from 'svelte/store'
	import { device as device$, debounce, ensureSlash } from '~/lib'

	export let waitUntil = null
	export let styles = ''
	export let fold = false
	export let modal = ''
	export let name = ''
	export let ext = 'jpg'
	export let workDir = '/'
	export let resolutions = []
	export let devices = []
	export let alt = ''
	export let mode = 'fill'
	export let fallback = 'jpg'
	export let loading = 'eager'
	export let ratio = null

	const dispatch = createEventDispatcher()
	const withSlot = $$props.$$slots

	let width$
	let width = 0
	let height = 0

	$: if (width$) {
		ratio &&
			dispatch('ratio', {
				width: (width = $width$),
				height: (height = ratio * $width$)
			})
	}

	function syncWidth$(el) {
		return readable(0, (set) => {
			if (!el) return

			const ro = new ResizeObserver(debounce(() => el && set(el.offsetWidth), 100))
			ro.observe(el)

			return () => ro && ro.disconnect()
		})
	}

	function useWidth(node) {
		if (ratio) {
			width$ = syncWidth$(node)
		}
	}

	const withDevicesOrNot = () => (devices.length === 0 ? '' : $device$.isMobile ? 'mobile' : 'desk')

	const dump$ = readable(null, (set) => {
		const sets = [
			'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAXcAAAD+BAMAAAAzJlhpAAAAD1BMVEXt7eP8fD3ywqT4mGb0tJDL+ulCAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAbUlEQVR4nO3OwQmAMAAAsSIOoJsI7r+b/frt5xSSCTIGAAAAAAAAAAAAAAAAAAAAAAAAAAAAvG33dNWLRfs5HfVikXxFviJfka/IV+Qr8hX5inzl13kAAAAAAAAAAAAAAAAAAAAAAAAAAIDPewByKAffd0/srwAAAABJRU5ErkJggg==',
			'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAXcAAAD+BAMAAAAzJlhpAAAAD1BMVEXt7eP8fD3ywqT4mGb0tJDL+ulCAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAbUlEQVR4nO3OMREAIBAEMSygAQkowL8pXsJ3BzNJudWOAQAAAAAAAAAAAAAAAAAAAAAAAAAAAGXt0ooPOrO04oPMp5hPMZ9iPsV8ivkU8ynmU8ynfD0PAAAAAAAAAAAAAAAAAAAAAAAAAADwkwvDOxangTbj5QAAAABJRU5ErkJggg==',
			'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAXcAAAD+BAMAAAAzJlhpAAAAD1BMVEXt7eP8fD3ywqT4mGb0tJDL+ulCAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAe0lEQVR4nO3OQQ2AMBQFwYYgADRggAQF+DdF6+Cf+tIwc9zTtgYAAAAAAAAAAAAAAAAAAAAAAAAAAMB/XU9XituI95yrovfsSnEf8ZhzVWQ+xXyK+RTzKeZTzKeYTzGfYj5l6XkAAAAAAAAAAAAAAAAAAAAAAAAAAIBFfdWnHoVb44yuAAAAAElFTkSuQmCC'
		]

		let counter = 0
		set(sets[counter])

		const interval = setInterval(() => {
			set(sets[counter])
			if (counter === 2) {
				counter = 0
			} else {
				counter++
			}
		}, 1000)

		return () => clearInterval(interval)
	})

	$: getSrc = (device, resolution = '1x', isFallback) => {
		switch (resolution) {
			case '1x':
				return isFallback ? `${getDir(device)}.${fallback}` : `${getDir(device)}.${ext}`
			case '2x':
				return `${getDir(device)}@2x.${ext} 2x`
			case '3x':
				return `${getDir(device)}@3x.${ext} 3x`
			default:
				return `${getDir(device)}.${ext}`
		}
	}

	$: getDir = (device) => {
		const workspace = ensureSlash(workDir, false);
		const filename = ensureSlash.start(name, false);
		const workDirname = workspace ? `${workspace}/${filename}` : filename;
		if (fold && device) return `static/folds/${fold}/${device}/${workDirname}`
		if (fold && !device) return `static/folds/${fold}${workDirname}`
		if (!fold && device && !modal) return `static/${device}${workDirname}`
		if (!fold && modal && !device) return `static/modals${modal}/${workDirname}`
		if (!fold && modal) return `static/modals${modal}/${device}/${workDirname}`
		return `static/${workDirname}`
	}

	$: buildSrcset = (deviceName) => {
		let srcset = getSrc(deviceName)

		resolutions.forEach((x) => {
			srcset = srcset.concat(`, ${getSrc(deviceName, x)}`)
		})

		return srcset
	}
</script>

<style>
	picture.withRatio {
    height: var(--height, auto);

		& :global(img) {
			height: var(--height, inherit);
		}
	}

	picture:not(.withRatio) {
		& :global(img) {
			height: inherit;
		}
	}

	picture {
		& :global(img) {
			width: inherit;
			object-fit: var(--mode, 'fill');
			user-select: none;
			-webkit-user-drag: none;
			-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
		}
	}
</style>

<picture
	class:withRatio="{width && height}"
	style="--height: {height || 0}px; --width: {width || 0}px;"
	class="{$$props.class}"
	on:click="{(evt) => dispatch('click', evt)}"
	use:useWidth
>
	{#if waitUntil !== false}
		{#if devices.mobile}
			<source srcset="{buildSrcset('mobile')}" media="(max-width: 1023px)" type="image/{ext}" />
		{/if}

		{#if devices.desk}
			<source srcset="{buildSrcset('desk')}" media="(min-width: 1024px)" type="image/{ext}" />
		{/if}

		{#if devices.length === 0}
			<source srcset="{buildSrcset()}" type="image/{ext}" />
		{/if}

		{#if withSlot}
			<slot prop="{{ loading: loading, src: getSrc(withDevicesOrNot(), '1x', true) }}" />
		{:else}
			<img
				loading="{loading}"
				style="--mode: {mode}; {styles.img || ''}"
				src="{getSrc(withDevicesOrNot(), '1x', true)}"
				alt="{alt}"
			/>
		{/if}
  {:else}
    <img class="w-full loading" src="{$dump$}" alt="Carregando..." />
  {/if}
</picture>
