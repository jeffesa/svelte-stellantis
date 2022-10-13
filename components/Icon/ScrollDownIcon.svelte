<script>
	import { createEventDispatcher } from 'svelte'
	const dispatch = createEventDispatcher()
</script>

<div
	class="relative flex items-center justify-center w-full sm:h-24 ScrollDownIcon"
>
	<div
		class="relative flex items-start justify-center w-5 h-10 overflow-hidden border-2 rounded-lg cursor-pointer hover:opacity-75 transition-opacity duration-300 ScrollDownIcon-container border-trinary "
		on:click="{(evt) => dispatch('click', evt)}"
	>
		<div class="chevron"></div>
		<div class="chevron"></div>
		<div class="chevron"></div>
		<div class="chevron"></div>
		<div class="chevron"></div>
	</div>
</div>

<style>
	.chevron {
		@apply absolute opacity-0 animate-move;
		width: 9px;
		height: 3px;
	}

	.chevron:first-child {
		@apply animate-move-1s;
	}

	.chevron:nth-child(2) {
		@apply animate-move-2s;
	}

	.chevron::before,
	.chevron::after {
		@apply absolute top-0 w-1/2 h-full;
		content: ' ';
	}

	.chevron::before {
		@apply left-0;
		transform: skew(0deg, 30deg);
	}

	.chevron::after {
		@apply right-0 w-1/2;
		transform: skew(0deg, -30deg);
	}
</style>
