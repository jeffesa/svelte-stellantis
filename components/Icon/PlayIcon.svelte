<script>
	export let scale = 1.5
  export let color = ''
</script>

<style>
	i {
		box-sizing: border-box;
		position: relative;
		display: block;
		transform: scale(var(--scale, 1));
		width: 22px;
		height: 22px;
		&::before {
			content: '';
      color: var(--color, --secondary-default);
			display: block;
			box-sizing: border-box;
			position: absolute;
			width: 0;
			height: 10px;
			border-top: 5px solid transparent;
			border-bottom: 5px solid transparent;
			border-left: 6px solid;
			top: 6px;
			left: 9px;
		}
	}
</style>

<i 
  class="{$$props.class}" 
  style="--scale:{scale}; --color: {color}" 
  rel="icon"> 
</i>
