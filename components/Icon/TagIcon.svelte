<script>
	export let scale = ''
</script>

<i style="--scale: {scale}" class="{$$props.class || ''}" rel="icon"></i>

<style>
	i,
	i::before {
		display: block;
		border: 2px solid;
	}
	i {
		border-right: 0;
		border-top-left-radius: 3px;
		border-bottom-left-radius: 3px;
		box-sizing: border-box;
		transform: rotate(230deg);
		position: relative;
		width: 19px;
		height: 14px;
	}
	i::before {
		content: '';
		position: absolute;
		width: 2px;
		height: 2px;
		box-sizing: content-box;
		border-radius: 100px;
		right: 0;
		top: 2px;
	}
	i::after {
		content: '';
		display: block;
		box-sizing: border-box;
		position: absolute;
		width: 10px;
		height: 10px;
		border-bottom: 2px solid;
		border-right: 2px solid;
		border-bottom-right-radius: 4px;
		transform: rotate(-45deg);
		top: 0;
		right: -5px;
	}
</style>
