<script lang="js" context="module">
	import { writable } from 'svelte/store'

	const register = new Map()
	const tracks = new Map()
	const tracked = writable({})

	const is = {
		string: (value) => typeof value === 'string' || value instanceof String,
		fn: (value) => typeof value === 'function' || value instanceof Function
	}

	const paramStyle =
		'padding:5px 5px; background:#030307; color:#ffffff; font-weight:bold; border:1px solid #22824d; color: #22824d;'
	const fiatTagStyle = 'padding:5px 5px; background:#fe132f; color:#ffffff;'
	const darkTextStyle = 'padding:5px 0px; background:#030307; color:#ffffff;'
	const lightTextStyle = 'padding:5px 0px; background:#ffffff; color:#030307;'

	const logStylesInit = (keys, argv) =>
		console.info(
			'\n\n%c////%c Track was started with %c%i%c keys and %c%i%c prefixed arguments per key! \n\n',
			fiatTagStyle,
			darkTextStyle,
			paramStyle,
			keys,
			darkTextStyle,
			paramStyle,
			argv,
			darkTextStyle
		)

	const logStylesWarn = (idOrInfo) =>
		console.info(
			'\n\n%c////%c You should to call %cTrack.registerTrackMap%c method in order to send a push to %c%s%c. \n\n',
			fiatTagStyle,
			darkTextStyle,
			paramStyle,
			darkTextStyle,
			paramStyle,
			idOrInfo,
			darkTextStyle
		)

	const logStylesTrack = (action, type, ...info) =>
		console.info(
			`\n\n%c////%c Track.${action} %c${type}%c ::  %c  ${info}  \n\n`,
			fiatTagStyle,
			darkTextStyle,
			paramStyle,
			darkTextStyle,
			lightTextStyle
		)

	const registerTrackMap = (trackMap, argv) => {
		if (trackMap == null)
			return console.error(
				'Track.registerTrackMap `trackMap` should be an object'
			)
		if (argv && !Array.isArray(argv))
			return console.error('Track.registerTrackMap `argv` should be an array')
		tracks.set('data', trackMap)
		tracks.set('argv', argv || [])
		tracks.set('keys', Object.keys(trackMap))
		logStylesInit(tracks.get('keys').length, tracks.get('argv').length)
	}

	const registerTrack = (idOrInfo, ...args) => {
		const entry = tracks.has('data') ? tracks.get('data') : null
		const argv = tracks.get('argv')
		if (!entry) return logStylesWarn(idOrInfo)
		if (is.string(idOrInfo)) {
			if (!is.fn(entry[idOrInfo]))
				return logStylesTrack('VOID', idOrInfo, ...args, ...argv)
			const output = entry[idOrInfo](...args, ...argv)
			let triggered = false
			if ('dataLayer' in window && output != null) {
				window.dataLayer.push(output)
				logStylesTrack(triggered ? 'push' : 'trace', idOrInfo, ...args, ...argv)
				triggered = true
			}
			register.set(idOrInfo, output)
		}
	}

	export { tracked, registerTrackMap, registerTrack }
</script>

<script lang="js">
	import { onMount, onDestroy } from 'svelte'

	export const disabled = false
	export const once = false

	onMount(() => {
		console.log('Track//mount:', $tracked, $$props)
	})

	onDestroy(() => {
		console.log('Track//destroy:', $tracked)
	})
</script>

<template lang="html">
	<slot />
</template>
