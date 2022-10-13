<script>
	import { createEventDispatcher } from 'svelte'
	import PlayIcon from './Icon/PlayIcon.svelte'
	import Button from './Button'
	import { useRatio, ensureSlash, device as device$ } from '~/lib'

	export let workDir = '/'
	export let fold = false
	export let name = ''
	export let ratio = null

	let heightByRatio = 0

	$: getDir = (device) => {
		const workspace = ensureSlash(workDir, false)
		const filename = ensureSlash.start(name, false)
		const workDirname = workspace ? `${workspace}/${filename}` : filename
		if (fold && device) return `static/folds/${fold}/${device}/${workDirname}`
		return `static/${workDirname}`
	}

	$: getSrc = (device, type = 'video/mp4') => {
		switch (type) {
			case 'video/mp4':
				return `${getDir(device)}.mp4`
			default:
				return `${getDir(device)}.mp4`
		}
	}

	const dispatch = createEventDispatcher()

	let isPlayed = false
	let videoEl

	const toggle = () => {
		videoEl.play()
		isPlayed = true
	}
</script>

<style>
	div.withRatio {
		height: var(--height, auto);
	}
</style>

<div
	class="grid items-center justify-items-center {$$props.class}"
	class:withRatio="{ratio}"
	style="--height: {heightByRatio + 'px'}"
	use:useRatio="{ratio}"
	on:ratio="{({ detail }) => {
		heightByRatio = detail.height
		dispatch('ratio', detail)
	}}"
	on:click="{() => toggle()}"
>
	<video loop bind:this="{videoEl}" class="col-start-1 row-start-1">
		<source src="{getSrc($device$.isMobile ? 'mobile' : 'desk')}" type="video/mp4" />
		<track kind="captions" />
	</video>

	{#if !isPlayed}
		<Button
			class="flex items-center justify-center w-20 h-20 rounded-full col-start-1 row-start-1 bg-trinary opacity-60"
		>
			<PlayIcon scale="{3}" color="var(--secondary-default)" />
		</Button>
	{/if}
</div>
