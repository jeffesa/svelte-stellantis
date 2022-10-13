<script>
	export let name
	export let type = 'left'
	export let scale = 1.5
</script>

<i
	class:left="{type === 'left'}"
	class:right="{type === 'right'}"
	style="--scale:{scale}"
	rel="icon"
	role="{name}"
></i>

<style>
	$size: 1.5px;
	i {
		color: var(--secondary-default);
		box-sizing: border-box;
		position: relative;
		display: block;
		transform: scale(var(--scale, 1));
		width: 22px;
		height: @width;
		&:hover {
			color: var(--secondary-default);
		}
		&::after,
		&::before {
			content: '';
			display: block;
			box-sizing: border-box;
			position: absolute;
		}
		&.left::after,
		&.left::before {
			left: 3px;
		}
		&.right::after,
		&.right::before {
			right: 3px;
		}
		&::after {
			width: 10px;
			height: @width;
			bottom: 6px;
		}
		&.left::after {
			border-bottom: $size solid;
			border-left: @border-bottom;
			transform: rotate(45deg);
		}
		&.right::after {
			border-top: $size solid;
			border-right: @border-top;
			transform: rotate(45deg);
		}
		&::before {
			width: 15px;
			height: 2px;
			bottom: 10px;
			background: currentColor;
		}
	}
</style>
