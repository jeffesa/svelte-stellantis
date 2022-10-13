<script>
	export let scale = 1
</script>

<style>
	svg {
		transform: scale(var(--scale, 1));
	}
</style>

<i rel="icon">
	<svg
		style="--scale:{scale}"
		xmlns="http://www.w3.org/2000/svg"
		width="5.5rem"
		height="5.5rem"
		viewBox="0 0 78.109 75.965"
	>
		<g transform="translate(-1 -1)">
			<ellipse
				cx="37.43"
				cy="37.983"
				fill="#fff"
				rx="37.43"
				ry="37.983"
				transform="translate(1 1)"
			></ellipse>
			<g>
				<path
					fill="#d24f19"
					d="M625.872 978.7l-3.981-3.2c21.118-16.967 21.118-44.573 0-61.54l3.981-3.2c23.314 18.733 23.314 49.21 0 67.94z"
					transform="translate(57.643 4.62) translate(-621.891 -910.764)"
				></path>
			</g>
			<text font-size="0.65rem" font-style="normal" font-weight="600">
        <tspan x="15" y="30">ARRASTE</tspan>
				<tspan x="15" y="43">PARA VER</tspan>
				<tspan x="15" y="56">EM 360º</tspan>
			</text>
		</g>
	</svg>
</i>
