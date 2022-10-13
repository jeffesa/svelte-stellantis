<script>
	export let scale = 1.5
  export let color = '#fff'
</script>

<i 
  style="--scale:{scale}; --color: {color}" 
  rel="icon" 
  class="{$$props.class}" 
/>

<style>
	i {
		color: #fff;
		box-sizing: border-box;
		position: relative;
		display: block;
		transform: scale(var(--scale, 1));
		width: 22px;
		height: 22px;
		border: 2px solid transparent;
		border-radius: 40px;
		&::before,
		&::after {
			content: '';
			display: block;
			box-sizing: border-box;
			position: absolute;
			width: 16px;
			height: 2px;
      background: var(--color, ‘#fff’);
			transform: rotate(45deg);
			border-radius: 5px;
			top: 8px;
			left: 1px;
		}
		&::after {
			transform: rotate(-45deg);
		}
	}
</style>
