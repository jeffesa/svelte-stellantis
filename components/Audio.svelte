<script>
  import Picture from './Picture.svelte'
	import { ensureSlash, device as device$ } from '~/lib'

  export let workDir = '/'
	export let name = ''
	export let btnOn = ''
	export let btnOff = ''
	export let audioPlaying = false
	export let showButtonOn = false
  export let label = ''

	let audioEl

  const changeImageIconOnPlaying = () => {
		if(showButtonOn === false){
			showButtonOn = true
		} else {
			showButtonOn = false
		}
  }

	export function play() {
    changeImageIconOnPlaying()

		if(audioPlaying === false){
			audioEl.play();
			audioPlaying = true
		} else {
			audioEl.pause();
			audioPlaying = false
		}
	}

	export function onPause(){
		showButtonOn = false
		audioPlaying = false
	}

	$: getDir = () => {
		const workspace = ensureSlash(workDir, false)
		const filename = ensureSlash.start(name, false)
		const workDirname = workspace ? `${workspace}/${filename}` : filename
		return `static/${workDirname}`
	}

	$: getSrc = (type = 'mp3') => {
		switch (type) {
			case 'mp3':
				return `${getDir()}.mp3`
			default:
				return `${getDir()}.mp3`
		}
	}
</script>

<div class="{$$props.class || ''}" on:click="{() => play()}">
	<p class="text-xs font-semibold text-center text-white sm:text-right">
    {@html label}
	</p>
  <Picture 
    class="{$device$.isMobile && 'flex justify-center w-9/12 mx-auto sm:mr-0 sm:ml-0 sm:w-7/12'}" 
    name="{showButtonOn ? btnOn : btnOff}" 
    ext="png" 
  />
	<audio bind:this="{audioEl}" on:pause={onPause} preload="auto" src="{getSrc()}">
		<track kind="captions" />
	</audio>
</div>
