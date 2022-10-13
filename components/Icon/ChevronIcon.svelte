<script>
	export let name = ''
	export let scale = 1
	export let type = 'left'
	export let color = '#fff'
</script>

<i
  class="{$$props.class || ''}"
	class:right="{type === 'right'}"
	class:left="{type === 'left'}"
	class:down="{type === 'down'}"
	class:up="{type === 'up'}"
	style="--scale:{scale}; --color: {color}"
	rel="icon"
	role="{name}"
></i>

<style>
	i {
		color: var(--color, '#fff');
		box-sizing: border-box;
		position: relative;
		display: block;
		transform: scale(var(--scale, 1));
		width: 22px;
		height: 22px;
		border: 2px solid transparent;
		border-radius: 100px;
		&::after {
			content: '';
			display: block;
			box-sizing: border-box;
			position: absolute;
			width: 10px;
			height: 10px;
			border-bottom: 2px solid;
			border-left: 2px solid;
			left: 6px;
			top: 4px;
		}
		&.left::after {
			transform: rotate(45deg);
		}
		&.right::after {
			transform: rotate(220deg);
      left: 2px; 
		}
		&.down::after {
			transform: rotate(-45deg);
		}
		&.up::after {
			transform: rotate(135deg);
		}
	}
</style>
