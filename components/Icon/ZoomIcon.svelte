<script>
	export let name
	export let type = 'in'
	export let scale = 1.5
  export let styles = ''
</script>

<i
	class:in="{type === 'in'}"
	class:out="{type === 'out'}"
  style="--scale:{scale}; {styles}"
	rel="icon"
	role="{name}"
></i>

<style>
	i {
		color: var(--color, theme('colors.white'));
		box-sizing: border-box;
		position: relative;
		display: block;
		transform: scale(var(--scale, 1));
		width: 16px;
		height: 16px;
		border: 2px solid;
		border-radius: 100%;
		background: linear-gradient(to bottom, currentColor 5px, transparent 0)
			no-repeat 3px 5px/6px 2px;
		margin-top: -4px;
		&::after,
		&::before {
			content: '';
			display: block;
			box-sizing: border-box;
			position: absolute;
			width: 2px;
			height: 6px;
			background: currentColor;
		}
		&::after {
			transform: rotate(-45deg);
			border-radius: 3px;
			top: 10px;
			left: 12px;
		}
		&::before {
			top: 3px;
			left: 5px;
		}
	}
</style>
