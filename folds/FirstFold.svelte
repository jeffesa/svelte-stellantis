<script>
	let nota = 4
	let porcent = [(nota * 100) / 5 - 5]
	let nota2 = 5 - nota
	let notas = []
	let apagadas = []
	let tab
	function yPlusAValue(nota) {
		for (var i = 0; i < nota; i++) {
			var adicionar = notas.push(i)
		}
	}
	yPlusAValue(nota)
	function funApagadas(nota2) {
		for (var i = 0; i < nota2; i++) {
			var adicionar2 = apagadas.push(i)
		}
	}
	funApagadas(nota2)

	import { registerTrack } from '~/components/DataLayer/Track.svelte'
	import { Anchor, Icon, Button, Picture, Swiper } from '~/components'
	import { theme, goto, device as device$, gotoEl, query as q } from '~/lib'

	function nextFold() {
		const nextFoldEl = q('#TipsFold')
		nextFoldEl && gotoEl(nextFoldEl)
	}

	function openModal() {
		console.log('modal message')
	}

	const data = {
		poster: {
			description: 'Eleito melhor SUV Compacto do ano.',
			name: 'c4-cactus-hero-2'
		},
	
		thumb: {
			workDir: '/thumbs',
			photos: [
				{
					title: 'Design Moderno',
					name: 'design-moderno',
					route: 'design-moderno'
				},
				{
					title: 'Barras de Teto',
					name: 'barras-de-teto',
					route: 'barras-de-teto'
				},
				{
					title: 'Motor Turbo',
					name: 'motor-turbo',
					route: 'motor-turbo'
				},
				{
					title: 'Faróis em Destaque',
					name: 'farois-em-destaque',
					route: 'farois-em-destaque'
				},
				{
					title: 'Mais Conectividade',
					name: 'mais-conectividade',
					route: 'mais-conectividade'
				},
				{
					title: 'Acesso Mãos Livres',
					name: 'acesso-maos-livres',
					route: 'acesso-maos-livres'
				},
			]
		}
	}
</script>

<style>
	@screen lg {
		:global(.FirstFold) {
			height: 900px !important;
		}
	}

	@screen sm {
		:global(.FirstFold) {
			height: calc(100vh - theme('height.4'));
		}
	}
	span:hover {
		color: #e21017;
	}
	.content-button {
		/* background-color: #fff; */
		width: 80%;
		/* margin-top: 8%;
		padding: 0 5%; */
	}

	.content-button a {
		display: flex;
		flex-direction: row;
		align-items: center;
		position: relative;
		left: -7px;
	}

	.content-button a .logo-citroen-advisor {
		width: 40%;
		flex-shrink: 0;
	}
	.logo-citroen-advisor {
		width: 40%;
		flex-shrink: 0;
	}

	/* @screen lg {
		.logo-citroen-advisor {
			margin-left: -50px;
		}
	} */

	.button-link {
		margin: 0px auto;
		display: flex;
		justify-content: center;
		left: 0;
		/* background: #fff; */
		border-radius: 20px;
		margin: 0px 55px !important;
		padding: 8px 0;
		margin-bottom: 120px;
	}

	@screen sm {
		.button-link {
			/* background: #fff; */
			border-radius: 0;
			margin: auto !important;
			padding: 0 !important;
		}
	}

	.confira-avaliacoes {
		display: flex;
		flex-direction: row;
		align-items: center;
		margin-bottom: -3px;
	}

	.advisor-text {
		font-family: Citroen, sans-serif;
		font-size: 0.5rem;
		margin-right: 5px;
		margin-left: 10px;
	}

	.style-image-star {
		width: 70%;
		margin-bottom: -5%;
		margin-left: 5%;
		cursor: pointer;
	}

	.icon-seta {
		color: #e01033;
		font-size: 0.9rem;
		font-weight: 700;
		font-family: Citroen, sans-serif;
	}

	/* :global(.icons) {
			background: green;
			border-color: green;
		} */


	.suv-original {
		width: 400px;
		padding-left: 89px;
		padding-top: 12px;

		p {
			&:first-child {
				font-size: 34px;
				color: #FE0611;
				line-height: 32px;
				text-transform: uppercase;
				font-weight: 300;	
			}

			&:last-child {
				width: 100%;
				font-size: 29px;
				line-height: 29px;
				color: rgb(8, 8, 8);
				font-weight: 200;
				padding-top: 4px;
			}
		}
	}
	
	@screen lg {
		.suv-original {
			width: 400px;
			padding-left: 0px;
			padding-top: 0px;

			p {
				&:first-child {
					font-size: 53px;
					color: #FE0611;
					line-height: 51px;
					text-transform: uppercase;
					font-weight: 300;
					/* margin-left: -50px;	 */
				}

				&:last-child {
					width: 603px;
					font-size: 45px;
					line-height: 44px;
					color: rgb(8, 8, 8);
					font-weight: 200;
					padding-top: 7px;
					/* margin-left: -50px; */
				}
			}
		}
	}

	:global(.icons) {
		background: #fff;
		border-color: #fff;
		left: calc(50% - 26px/2);

		:global(i) {
			&::before,
			&::after {
				background: #fff !important;
			}
		}
	}

	@screen lg {
		:global(.icons) {
			background: #fff;
			border-color: #fff;

			:global(i) {
				&::before,
				&::after {
					background: #e21017 !important;
				}
			}
		}
	}

	/* @screen lg {
		:global(.icons) {
			background: #fff;
			border-color: #fff;
		}
	} */

	.paddgin-topBottom {
		/* margin-top: -20px;
		margin-left: -20px; */
		/* padding-top: 2%;
		padding-bottom: 2%; */
		/* background-color: rgb(116, 129, 142, 0.2); */


	}

	.content-mob-button {
		background-color: #fff;
		width: 80%;
		/* margin-top: 8%; */
		padding: 0 5%;
		position: reltive;
		top: 24px;
	}

	@screen lg {
		.content-mob-button {
			top: -30px;
		}
	}

	.content-button {
		/* background-color: #fff; */
		width: 80%;
		/* margin-top: 8%;
		margin-left: 2.5%; */
	}
	.content-mob-button {
		background-color: #fff;
		width: 100%;
		justify-content: center;
		position: relative;
		z-index: 2;
	}

	.button-link {
		margin: 0px auto;
	}
	.style-image-logo {
		width: 40%;
		height: 40%;
	}
	.style-image-logo-mob {
		width: 40%;
		height: 40%;
	}
	.style-image-star {
		width: 80%;
		height: 60%;
		cursor:pointer;
	}

	.style-image-star-mob {
		width: 80%;
		height: 60%;
		cursor: pointer;
	}

	.align-star-text {
		display: flex;
		flex-direction: column;
		width: 122px;
	}

	.font-text {
		font-family: Citroen, sans-serif;
		font-size: 9px;
	}
	.icon-seta {
		color: #e01033;
		font-size: 12px;
		font-weight: 700;
		font-family: Citroen, sans-serif;
	}
	.position-star {
		top: 10px;
		left: 0;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin-top: 4px;
	}

	@screen sm {
		.position-star {
			margin-top: 10px;
		}
	}

	/* .paddgin-topBottom {
		padding-top: 34px;
	} */

	@screen lg {
		.paddgin-topBottom{
			padding-top: 2%;
			padding-bottom: 2%;
			/* background-color: rgb(116, 129, 142, 0.2); */
		}
	}

	.tabs {
		&::before {
			content: "";
			background: #fff;
			width: 9999px;
			position: absolute;
			height: calc(100% - 14px);
			margin-top: 46px;
		}
	}

	.tab-container {
		&::before {
			content: "arraste e conheça os detalhes";
			font-family: "Citroen", sans-serif;
			color: #444;
			font-size: 18px;
			line-height: 32px;
			font-weight: 300;
			position: absolute;
			width: calc(100% + 16px);
			height: calc(100% + 22px);
			background: #fff;
			top: -16px;
			left: 54px;
			border-radius: 10px;
			color: #444;
			font-size: 17px;
			line-height: 34px;
			padding-left: 10px;
		}

		.cursor-pointer {
			height: 130px;
		}

		.right-arrow-icon {
			position: absolute;
			top: -4px;
			right: 34px;
		}
	}

	@screen lg {
		.tab-container {
			&::before {
				content: "clique e conheça os destaques";
				font-family: "Citroen", sans-serif;
				color: #444;
				font-size: 18px;
				line-height: 32px;
				font-weight: 300;
				position: absolute;
				width: calc(100% + 16px);
				height: calc(100% + 38px);
				background: #fff;
				top: -30px;
				left: -8px;
				border-radius: 10px;
				padding-left: 10px;
			}
		}
	}

	.text-continue {
		:global(i) {
			top: 50px !important;
		}
	}
	
	:global(.tab) {
		border: 3px solid #E21017;
		width: calc(146px);
		background: #E21017;
		
		&:hover {
			/* border: 3px solid #E21017; */;
			.detach {
				/* background: #E21017 !important; */;
				border-bottom-left-radius: 7px;
				border-bottom-right-radius: 7px;

				.leading-2 {
					span {
						color: #fff !important;
					}
				}
			}

			.object-cover {
				border: 8px;
			}
		}

		.detach {
			border-bottom-left-radius: 8px;
			border-bottom-right-radius: 8px;

			:global(svg) {
				width: 16px;
				height: 16px;
			}
			
			span {
				font-size: 13px !important;
				font-weight: 600;
				color: #fff !important;
			}
		}

		.object-cover {
			height: 80px;
			border-radius: 8px;
			object-fit: cover;
		}
	}


	@screen lg {
		:global(.tab) {
			.detach {
				:global(svg) {
					width: 16px;
					height: 16px;
				}
				
				span {
					font-size: 16px !important;
					font-weight: 400;
				}
			}
		}
	}

	:global(.tab .detach button) {
		width: 26px !important;
		height: 26px !important;
    top: -6px;
	}

	:global(.tab:hover .detach button) {
		width: 115px !important;
		height: 26px !important;
		left: calc(100%/2 - 115px/2);

		:global(svg) {
			width: 20px;
			height: 20px;
		}
	}

	.details {
		:global(.animate-bounce) {
			position: absolute !important;
			top: 12px;
		}
		:global(i:nth-child(1)) {
			&::after {
				width: 6px;
				height: 6px;
				border-bottom: 1px solid;
				border-left: 1px solid;
				left: 6px;
				top: 23px;
			}
		}

		:global(i:nth-child(2)) {
			&::after {
				left: 4px;
				top: 4px;
			}
		}

		:global(i:nth-child(3)) {
			&::after {
				width: 6px;
				height: 6px;
				border-bottom: 1px solid;
				border-left: 1px solid;
				left: 6px;
				top: -7px;
			}
		}
	}

	.details {
		/* margin: 60px 0 25px; */
		margin-bottom: 147px;
    top: 68px;

		.text-secondary {
			color: #444;
			font-size: 14px;
			line-height: 24px;
		}
	}

	@screen lg { 
		.details {
			top: 28px;
			margin-bottom: 0;

			.text-secondary {
				font-size: 24px;
			}

			:global(.animate-bounce) {
				position: absolute !important;
				top: -2px;
			}
		}
	}

	@screen sm {
		.details {
			margin-top: 0px;
		}
	}

	/* .swiper-tabs {
		margin-bottom: 56px;
	} */

	.swiper-tabs {
		bottom: 0px;
	}

	@screen lg {
		.swiper-tabs {
			bottom: 286px;
			margin-bottom: 0px;
		}
	}

	/* :global(.icons) {
		background: var(--secondary-default);;
		border-color: var(--secondary-default);;
	} */

.welcome-container {
	width: 1024px;
}

.welcome {
	/* float: right; */
	/* margin-top: 90px; */

	position: absolute;
	top: 0px;
	left: 0px;
	margin-top: 7px;
	margin-left: 89px;

	h3 {
		color: #e21017;
		font-size: 17px;
		line-height: 17px;
	}

	h1 {
		color: #000;
		/* font-weight: 400; */
		font-size: 17px;
		line-height: 19px;
	}
	h2 {
		color: #000;
		font-size: 36px;
		line-height: 24px;
	}

	.quatro-rodas {
		height: 62px;
		/* top: 36px; */
	}
}

@screen lg {
	.welcome {
		h3 {
			font-size:32px;
			line-height: 29px;
		}

		h1 {
			font-size: 32px;
			line-height: 30px;
			/* font-weight: 400; */
		}

		h2 {
			font-size: 68px;
			line-height: 45px;
		}
	}

	.quatro-rodas {
		height: 62px;
		top: -38px !important;
    right: 60px !important;
	}
}

:global(.banner-image) {
	height: calc(100% - 40px);
	position: relative;
	height: 516px;

	:global(img) {
		object-fit: cover !important;
		object-position: 0 -42px;
	}
}

@screen lg {
	:global(.banner-image) {
		/* width: auto;
		top: -105px;
		left: 20px; */
		height: 670px;

		:global(img) {
			object-position: 0 0;
			/* height: 822px; */
			object-fit: cover;
			object-position: 50% 50%;
		}
	}
}

.video-container {
	display: flex;
	justify-content: flex-end;
	align-items: center;
	position: relative;
	margin-right: 0px;
	margin-top: 0px;
	height: 420px;

	video {
		width: auto;
    position: absolute;
		top: 0;
		right: 0;
    margin-top: -44px;
	}
}

@screen lg {
	.video-container {
		margin-right: 80px;
		height: auto;

		video {
			width: calc(100% - 200px);
			top: -68px;
    	right: 20px;
		}
	}
}
</style>

<Anchor name="FirstFold" track="c4-cactus" class="w-full mb-20 lg:mb-0">
	<!-- HEADER -->
	<header class="absolute z-10 flex flex-col w-full sm:pt-20 pt-4 h-full">
		<div class="mx-auto w-11/12  welcome-container">
			<!-- <div class="absolute left-1/2 -top-12 sm:block hidden" style="width: 66px">
				<svg id="Camada_1" data-name="Camada 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 68.51 48.74"><path d="M44.51,42.21c-1.68,0-3.39,0-3.41,0a3.49,3.49,0,0,0-3.72,3.19,3.52,3.52,0,0,0,3.72,3.26s1.73,0,3.41,0a3.54,3.54,0,0,0,3.75-3.26C48.26,43.67,46.62,42.25,44.51,42.21Zm-1.15,5.56c-.13,0-.62,0-1.08,0a2.42,2.42,0,0,1-2.46-2.35,2.37,2.37,0,0,1,2.46-2.3s.59,0,1.08,0a2.36,2.36,0,0,1,2.46,2.3A2.39,2.39,0,0,1,43.36,47.77Z" style="fill:#6e6e6e;fill-rule:evenodd"/><path d="M66.41,48.57h2.1V45.49a3.38,3.38,0,0,0-3.63-3.19h-5.3c-.09,0-.29,0-.29.24v5.81a.23.23,0,0,0,.22.24h2.22V43.74a.31.31,0,0,1,.31-.33h2.44a1.82,1.82,0,0,1,1.68,2v3a.24.24,0,0,0,.25.22" style="fill:#6e6e6e;fill-rule:evenodd"/><path d="M22.16,43.54h3.28v-1a.25.25,0,0,0-.25-.24H16.06a.24.24,0,0,0-.24.24v1H18a1.4,1.4,0,0,1,1.38,1.37v3.44a.24.24,0,0,0,.24.24h2.22V43.87a.33.33,0,0,1,.33-.33" style="fill:#6e6e6e;fill-rule:evenodd"/><path d="M12.05,48.35a.27.27,0,0,0,.25.24h.13l0,0a7.58,7.58,0,0,1,1,0h1.08V42.54a.24.24,0,0,0-.24-.24h-2a.25.25,0,0,0-.25.24v5.81Z" style="fill:#6e6e6e;fill-rule:evenodd"/><path d="M34.61,46.38l0,0v-.09h0a2.12,2.12,0,0,0,1.77-1.95,2.27,2.27,0,0,0-2.48-2H28a1.26,1.26,0,0,0-1.27,1.28v4.77a.23.23,0,0,0,.25.24H29.2V46.38h2.09A2.48,2.48,0,0,1,34,48.57h2.43A2.61,2.61,0,0,0,34.61,46.38ZM33,45.25H29.18V44a.57.57,0,0,1,.6-.57H33a.92.92,0,0,1,.91.9A.94.94,0,0,1,33,45.25Z" style="fill:#6e6e6e;fill-rule:evenodd"/><path d="M8.35,44.4h2.4a3.84,3.84,0,0,0-3.59-2.23l-.73,0a26.33,26.33,0,0,0-2.69,0,4,4,0,0,0-2.63.95A3.06,3.06,0,0,0,0,45.42,3.52,3.52,0,0,0,3.7,48.7c1.44,0,1.6,0,3.48,0a3.58,3.58,0,0,0,3.54-2.24H8.35a.26.26,0,0,0-.2.11A2.45,2.45,0,0,1,6,47.79c-.48,0-1.08,0-1.08,0a2.38,2.38,0,0,1-2.46-2.35v0A2.37,2.37,0,0,1,4.92,43.1c.13,0,.62,0,1.06,0a2.49,2.49,0,0,1,2.15,1.19.29.29,0,0,0,.22.11" style="fill:#6e6e6e;fill-rule:evenodd"/><path d="M58,47.44H52.2a.3.3,0,0,1-.33-.31v-1.2h5V44.82h-5V43.74a.34.34,0,0,1,.09-.22.37.37,0,0,1,.29-.11H58v-.89a.28.28,0,0,0-.06-.18.41.41,0,0,0-.22-.06h-8a.23.23,0,0,0-.24.24v4.74a1.29,1.29,0,0,0,1.29,1.29h7a.24.24,0,0,0,.16-.07.24.24,0,0,0,.06-.15s0-.8,0-.89" style="fill:#6e6e6e;fill-rule:evenodd"/><path d="M56.17,40a1.45,1.45,0,0,0-.84-.22,1.39,1.39,0,0,0-.84.22c-.23.13-.4.33-.67.33s-.42-.2-.66-.33a1.76,1.76,0,0,0-.85-.22,1.41,1.41,0,0,0-.84.22.58.58,0,0,0-.35.51.64.64,0,0,0,.35.53,1.47,1.47,0,0,0,.84.22,1.42,1.42,0,0,0,.82-.2c.23-.13.45-.33.69-.33a1.41,1.41,0,0,1,.67.33,1.54,1.54,0,0,0,.84.22,1.51,1.51,0,0,0,.86-.22.63.63,0,0,0,.36-.53.68.68,0,0,0-.38-.53" style="fill:#6e6e6e;fill-rule:evenodd"/><path d="M52.93,29.25c-.55-.62-13.87-15.31-18.67-15.31S16.15,28.61,15.58,29.25a5.67,5.67,0,0,0-1.35,3.28c0,1.35.08,2.7.08,2.72s0,.65.36.8a.42.42,0,0,0,.15,0,.69.69,0,0,0,.4-.15c.14-.13,13.7-12.1,19-12.1s18.87,12,19,12.08a.67.67,0,0,0,.4.15.33.33,0,0,0,.15,0c.31-.16.35-.73.35-.8s.09-1.37.09-2.7A5.36,5.36,0,0,0,52.93,29.25Zm.14,4.92c-3.5-3-13.9-11.53-18.81-11.53S18.94,31.18,15.44,34.17c0-.71,0-1.13,0-1.78a3,3,0,0,1,.84-2.08A62,62,0,0,1,32,20c2.37-1,2.24-.82,2.24-4.83h.17c3.35.31,12.32,9,17.64,14.92a4.5,4.5,0,0,1,1,2.48C53.11,33.1,53.09,33.7,53.07,34.17Z" style="fill:#6e6e6e;fill-rule:evenodd"/><path d="M52.91,15.29C52.36,14.67,39.06,0,34.26,0S16.17,14.67,15.6,15.29a5.7,5.7,0,0,0-1.35,3.28c0,1.35.09,2.7.09,2.7s0,.64.35.8a.42.42,0,0,0,.16,0,.66.66,0,0,0,.39-.15c.16-.13,13.68-12.08,19-12.08S53.11,21.83,53.27,22a.67.67,0,0,0,.4.15.33.33,0,0,0,.15,0c.31-.16.35-.73.35-.8s.09-1.37.09-2.7A5.7,5.7,0,0,0,52.91,15.29ZM53,20.21c-3.5-3-13.87-11.52-18.78-11.52S19,17.19,15.47,20.21c0-.71-.05-1.13-.05-1.77a3,3,0,0,1,.84-2.09A62.05,62.05,0,0,1,32,6c2.37-1,2.24-.82,2.24-4.83h.17c3.35.31,12.3,9,17.62,14.89a4.5,4.5,0,0,1,1,2.48C53.09,19.14,53.07,19.74,53,20.21Z" style="fill:#6e6e6e;fill-rule:evenodd"/></svg>
			</div> -->

			{#if $device$.isMobile}
				<div class="suv-original">
					<p>SUV Citroën<br/>C4 Cactus</p>
					<p>ser original é irresistível.</p>
				</div>
				<div class="absolute paddgin-topBottom flex flex-col justify-start w-72 flex items-end lg:items-start welcome w-full pr-4 pt-4">
					<!-- <img src="static/folds/1/desk/_premio.png" class="quatro-rodas absolute left-5 lg:right-0" alt="premio quatro rodas">
					 <div class="relative right-2">
						<h3 class="block mb-2 lg:mb-4 leading-6 text-3xl citroen citroen-300"> 
							bem-vindo(a) <br/>ao universo do
						</h3>
						<h1 class="block mb-0 lg:mb-2 leading-6 text-3xl text-white uppercase citroen citroen-300">
							SUV Citroën C4
						</h1>
						<h2 class="block mb-2 leading-6 text-6xl text-white uppercase citroen citroen-300">
							Cactus
						</h2>
					</div> -->
				</div>
			{:else}
				<div class="relative paddgin-topBottom flex flex-col justify-center w-72 flex items-start welcome">
					<!-- <img src="static/folds/1/desk/_premio@2x.png" class="quatro-rodas absolute" alt="premio quatro rodas"> -->
					<!-- <h3 class="block mb-4 leading-6 text-3xl citroen citroen-300"> 
						bem-vindo(a) <br/>ao universo do
					</h3> -->
					<!-- <h1 class="block mb-2 leading-6 text-3xl text-white uppercase citroen citroen-300">
						SUV Citroën C4
					</h1>
					<h2 class="block mb-2 leading-6 text-6xl text-white uppercase citroen citroen-300">
						Cactus
					</h2> -->

					<div class="content-button pt-2 pl-2">
						<div class="suv-original">
							<p>SUV Citroën <br/>C4 Cactus</p>
							<p>ser original é irresistível.</p>
						</div>
						<a
							class="button-link"
							on:click="{() => {
								registerTrack('Citroen_ClicouAdvisor', 'advisor')
								goto("avaliacoes")
							}}"
						>
							<img
								class="logo-citroen-advisor"
								src="static/LOGO_CITROEN_ADVISOR_transparente.png"
								alt="logo"
							/>

							<div class="advisor-container">
								<div>
									<img
										class="style-image-star"
										src="static/ESTRELAS_CITROEN_ADVISOR_transparente.png"
										alt="star-yellow"
									/>
								</div>
								<div class="confira-avaliacoes">
									<span class="advisor-text">CONFIRA AS AVALIAÇÕES</span>
									<span class="icon-seta"> > </span>
								</div>
							</div>
						</a>
					</div>
				</div>

				<!-- <Picture
					class="absolute top-0 right-0"
					fold="{1}"
					name="premio"
					workDir="{data.workDir}"
					resolutions="{['2x']}"
					devices="{{ desk: true, mobile: true }}"
					mode="cover"
					ext="png"
					let:prop="{imageData}"
				>
				</Picture> -->
			{/if}
		</div>
	</header>

	<!-- BACKGROUND -->
	<!-- <Picture
		class="block w-full h-full banner-image"
		fold="{1}"
		name="{data.poster.name}"
		workDir="/"
		resolutions="{['2x']}"
		devices="{{ desk: true, mobile: true }}"
		ext="jpg"
		alt="{data.poster.description}"
		mode="cover"
	/> -->

	<div class="video-container">
		<video autoplay muted playsinline data-wf-ignore="true" data-object-fit="cover" class="banner-image relative">
			<source src="static/folds/1/desk/c4-cactus-hero-2.mp4" data-wf-ignore="true" type="video/mp4">
		</video>
	</div>

	<!-- SWIPER -->
	<div
		class="absolute z-10 flex flex-col w-full bottom-0 lg:bottom-52 gap-y-2 sm:ml-0 ml-5 swiper-tabs"
	>
		<!-- MOBILE -->

		{#if $device$.isMobile}
			<div class="flex items-center self-end w-auto px-2 mb-2 rounded-2xl pr-7 tabs">
				<!-- <span class="text-xs text-white font-semibold text-sm relative">Arraste e veja as novidades
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="12.464"
						height="9.408"
						viewBox="0 0 12.464 9.408"
						style="display: inline-block; vertical-align: middle;"
					>
						<g id="seta" transform="translate(-343.5 -385.796)">
							<path
								id="Caminho_1118"
								data-name="Caminho 1118"
								d="M8995-961l3.314,4L8995-953"
								transform="translate(-8643 1347.5)"
								fill="none"
								stroke="#e21017"
								stroke-linecap="round"
								stroke-width="1"
							></path>
							<path
								id="Caminho_1119"
								data-name="Caminho 1119"
								d="M354.994,390.5H344"
								fill="none"
								stroke="#e21017"
								stroke-linecap="round"
								stroke-width="1"
							></path>
						</g>
					</svg></span> -->
			</div>
			<div class="tab-container">
				<div class="right-arrow-icon">
					<svg xmlns="http://www.w3.org/2000/svg" width="13.613" height="10.816" viewBox="0 0 13.613 10.816">
						<g id="seta" transform="translate(-343 -385.092)">
							<path id="Path_1118" data-name="Path 1118" d="M8995-961l3.314,4L8995-953" transform="translate(-8643 1347.5)" fill="none" stroke="#e21017" stroke-linecap="round" stroke-width="2"/>
							<path id="Path_1119" data-name="Path 1119" d="M354.994,390.5H344" fill="none" stroke="#e21017" stroke-linecap="round" stroke-width="2"/>
						</g>
					</svg>						
				</div>
				<Swiper
					items="{data.thumb.photos}"
					let:prop="{item}"
					on:swipe="{({ index }) => {
						registerTrack('MainPage_PaginouFeaturesNoMobile', 'destaque', index)
					}}"
				>
					<Swiper.Item
						class="relative w-5/12 border-0 cursor-pointer grid  mr-3 rounded-xl overflow-hidden tab"
						on:click="{() => {
							registerTrack('MainPage_ClicouThumbnail', item.data.route)
							goto(item.data.route)
						}}"
					>
						<Picture
							class="block w-full h-full border-b-0 border-red-600"
							fold="{1}"
							name="{item.data.name}"
							workDir="{data.thumb.workDir}"
							resolutions="{['2x']}"
							devices="{{ desk: true, mobile: true }}"
							ext="jpg"
							let:prop="{imageData}"
						>
							<img class="object-cover w-full h-full" src="{imageData.src}" alt="{item.data.title}" />
						</Picture>

						<div class="flex h-11 detach relative">
							<div
								style="line-height: .65rem"
								class="flex items-center justify-center sm:w-9/12 w-10/12 px-0 w-full"
							>
								<span class="text-black text-xs pt-2">{@html item.data.title}</span>
							</div>
							<Button class="w-6 h-6 bg-white rounded-full -mt-2 -right-2 absolute right-0 mr-5 icons flex justify-center items-center">
								<Icon.Eye class="h-4 w-4 mx-auto icon" styles="--color: var(--secondary-default)" />
							</Button>
						</div>
					</Swiper.Item>
				</Swiper>
			</div>
		{:else}
			<!-- DESK -->
			<div class="flex flex-col items-center tabs">
				<div class="w-12/12 space-x-2 flex justify-center relative tab-container">
					<!-- <div class="absolute -top-7 pl-3">
						<span class="text-md text-white font-bold relative">Clique e conheça os destaques.</span>
					</div> -->
					{#each data.thumb.photos as photo}
						<div
							class="relative w-2/12 cursor-pointer grid shadow rounded-xl tab {tab == photo.name ? "is-active" : ''}"
							on:click="{() => {
								registerTrack('MainPage_ClicouThumbnail', photo.route)
								goto(photo.route)
								tab = photo.name
							}}"
						>
							<Picture
								class="block w-full h-full border-b-0 border-red-600"
								fold="{1}"
								name="{photo.name}"
								workDir="{data.thumb.workDir}"
								resolutions="{['2x']}"
								devices="{{ desk: true, mobile: true }}"
								mode="cover"
								ext="jpg"
								let:prop="{imageData}"
							>
								<img class="object-cover w-full h-full" src="{imageData.src}" alt="{photo.title}" />
							</Picture>

							<div class="flex detach relative">
								<div class="flex items-center justify-center w-9/12 px-2 w-full leading-2">
									<span
										style="font-size: 14px; color: #4E4F4F"
										class="py-3 leading-3 citroen citroen-300 relative top-1"
									>{@html photo.title}</span>
								</div>
								<Button class="w-6 h-6 bg-white rounded-full -mt-3 -right-2 absolute right-0 mr-5 icons flex justify-center items-center">
									<Icon.Eye class="h-4 w-4 mx-auto icon" styles="--color: var(--secondary-default)" />
								</Button>
							</div>
						</div>
					{/each}
				</div>
				<div class="flex justify-center relative details cursor-pointer pt-4 text-continue" on:click="{nextFold}">
					<p class="text-secondary sm:text-white citroen citroen-500 text-lg">CONTINUE NAVEGANDO E FAÇA NOVAS DESCOBERTAS</p>
					<div class="animate-bounce">
						<Icon.Chevron color="var(--secondary-default)" type="down" />
						<Icon.Chevron color="var(--secondary-default)" type="down" />
						<Icon.Chevron color="var(--secondary-default)" type="down" />
					</div>
				</div>
			</div>
		{/if}
	</div>

	<!-- BIND CLICK ON ALL BOTTOM GO TO NEXT FOLD -->
	{#if $device$.isMobile}
		<div class="content-mob-button">
			<a
				class="button-link absolute md:relative"
				on:click="{openModal}"
			>

				<img
					class="logo-citroen-advisor "
					src="static/LOGO_CITROEN_ADVISOR_transparente.png"
					alt="logo"
				/>

				<!-- <div class="advisor-container">
					<div>
						<img
							class="style-image-star"
							src="static/ESTRELAS_CITROEN_ADVISOR_transparente.png"
							alt="star-yellow"
						/>
					</div>
					<div class="confira-avaliacoes">
						<span class="advisor-text">CONFIRA AS AVALIAÇÕES</span>
						<span class="icon-seta"> > </span>
					</div>
				</div> -->
				
				<div class="align-star-text">

					<div class="position-star">
						<img
							class="style-image-star-mob"
							src="static/ESTRELAS_CITROEN_ADVISOR_transparente.png"
							alt="star-yellow"
						/>

						<a
								on:click="{() => {
								registerTrack('Citroen_ClicouAdvisor', 'advisor')
								goto("avaliacoes")
							}}"
						>
							<div class="confira-avaliacoes">
								<span class="uppercase font-text">CONFIRA AS AVALIAÇÕES</span>
								<span class="icon-seta"> > </span>
							</div>
						</a>
					</div>
				</div>
			</a>
			<div class="flex justify-center relative top-10 details cursor-pointer" on:click="{nextFold}">
				<p class="text-secondary sm:text-white citroen citroen-500 text-lg">CONTINUE NAVEGANDO E FAÇA NOVAS DESCOBERTAS</p>
				<div class="animate-bounce">
					<Icon.Chevron color="var(--secondary-default)" type="down" />
					<Icon.Chevron color="var(--secondary-default)" type="down" />
					<Icon.Chevron color="var(--secondary-default)" type="down" />
				</div>
			</div>
		</div>
	{:else}
		<!-- <div class="flex justify-center relative -top-11 details cursor-pointer" on:click="{nextFold}">
			<p class="text-secondary sm:text-white citroen citroen-500 text-lg">continue navegando e faça novas descobertas</p>
			<Icon.Chevron class="animate-bounce" color="var(--secondary-default)" type="down" />
		</div> -->
	{/if}
</Anchor>