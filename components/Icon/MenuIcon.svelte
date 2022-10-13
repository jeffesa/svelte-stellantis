<script>
	export let name
	export let scale = 1.5
</script>

<svg xmlns="http://www.w3.org/2000/svg" width="20.941" height="17.245" viewBox="0 0 20.941 17.245">
  <g id="Grupo_2357" data-name="Grupo 2357" transform="translate(-15.696 -13.149)">
    <path id="Caminho_1266" data-name="Caminho 1266" d="M15330.267,11232.181h18.941" transform="translate(-15313.57 -11202.786)" fill="none" stroke="#bababa" stroke-linecap="round" stroke-width="2"/>
    <path id="Caminho_1267" data-name="Caminho 1267" d="M15330.267,11232.181h18.941" transform="translate(-15313.57 -11210.409)" fill="none" stroke="#bababa" stroke-linecap="round" stroke-width="2"/>
    <path id="Caminho_1268" data-name="Caminho 1268" d="M15330.267,11232.181h18.941" transform="translate(-15313.57 -11218.031)" fill="none" stroke="#bababa" stroke-linecap="round" stroke-width="2"/>
  </g>
</svg>

<style>
	i {
		color: theme('colors.white');
		box-sizing: border-box;
		position: relative;
		display: block;
		transform: scale(var(--scale, 1));
		&::before,
		&::after {
			content: '';
			position: absolute;
			box-sizing: border-box;
			display: block;
			height: 2px;
			border-radius: 4px;
			background: currentColor;
		}
		&::before {
			width: 16px;
			box-shadow: 0 12px 0;
		}
		&::after {
			width: 10px;
			top: 6px;
		}
	}
</style>
