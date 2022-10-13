<style global>
	@tailwind base;
	@tailwind components;
	@tailwind utilities;

	@layer base {
		@font-face {
			font-family: 'Citroen';
			font-display: swap;
			src: local('Citroen Light'),
				url('static/fonts/Citroen-Light.ttf'),
				url('static/fonts/Citroen-Light.eot'),
				url("static/fonts/Citroen-Light.woff2") format("woff2"),
       	url("static/fonts/Citroen-Light.woff") format("woff");
			font-weight: 100;
		}
		@font-face {
			font-family: 'Citroen';
			font-display: swap;
			src: local('Citroen Regular'),
				url('static/fonts/Citroen.ttf'),
				url('static/fonts/Citroen.eot'),
				url("static/fonts/Citroen.woff2") format("woff2"),
       	url("static/fonts/Citroen.woff") format("woff");
			font-weight: 300;
		}

		@font-face {
			font-family: 'Citroen';
			font-display: swap;
			src: local('Citroen Bold'),
				url('static/fonts/Citroen-Bold.ttf'),
				url('static/fonts/Citroen-Bold.eot'),
				url("static/fonts/Citroen-Bold.woff2") format("woff2"),
       	url("static/fonts/Citroen-Bold.woff") format("woff");
			font-weight: 500;
		}

		@font-face {
			font-family: 'Citroen';
			font-display: swap;
			src: local('Citroen Black'),
				url('static/fonts/Citroen-Black.ttf'),
				url('static/fonts/Citroen-Black.eot'),
				url("static/fonts/Citroen-Black.woff2") format("woff2"),
       	url("static/fonts/Citroen-Black.woff") format("woff");
			font-weight: 700;
		}
	}

	body{
		font-family: 'Citroen', sans-serif;
	}

	@media all and (max-width: 1500px){
		.Menu .text-sm {
			font-size: 0.650em;
		}
	}

	@variants responsive {
		.z-1 {
			z-index: 1;
		}

		.-z-1 {
			z-index: -1;
    }

		.citroen{
			font-family: "Citroen", sans-serif;
		}

		.citroen-100{
			font-weight: 100;
		}

		.citroen-300{
			font-weight: 300;
		}

		.citroen strong,
		.citroen-500{
			font-weight: 500;
		}

		.citroen-700{
			font-weight: 700;
		}

		.text-white{
			color: var(--white);
		}

		.text-trinary{
			color: var(--trinary-default);
		}

		.text-gray{
			color: #4E4F4F
		}

		.cta-monte{
			background-color: #6E6E6E
		}

		@media all and (max-width: 991px){
			.btn-ofertas{
				transform: translate(-50%, 0%);
				left: 50%;
			}
		}

		@media all and (max-width: 767px){
			.bg-tabColor{
				.BulletList{
					background-color: var(--secondary-default) !important;
					bottom: 0 !important;
					font-family: "Citroen", sans-serif;
					color: #FFF !important;


					.bg-secondary{
						background-color: #FFF !important;
					}

					i{
						color: #FFF !important;
					}

					span.text-secondary{
						font-size: 14px !important;
						color: #FFF !important;
					}
				}
			}
		}
		

		/* .bg-texture-light {
			background-image: -webkit-image-set(
				url(static/texture.jpg) 1x,
				url(static/texture@2x.jpg) 2x,
				url(static/texture@3x.jpg) 3x
			);
		} */

		.bg-texture-light {
			background-color: #000;
		}

		.bg-texture-night {
			background-color: #EBECEE;
		}

		.title-version strong{
			font-size: 25px;
			font-family: "Citroen", sans-serif;
		}

		.overflow-dcode {
			&::-webkit-scrollbar {
				width: 12px;
			}

			&::-webkit-scrollbar-track-piece {
				border-color: transparent;
				border-style: solid;
				background: url(static/scrollbar-track.svg);
				background-size: 3px;
				background-repeat-x: no-repeat;
				background-position: center;
			}

			&::-webkit-scrollbar-thumb {
				background: theme('colors.trinary.DEFAULT');
				border-radius: 0.5rem;
			}

			&::-webkit-scrollbar-button {
				background-repeat: no-repeat;
				background-size: 110%;
				height: 9px;
				width: 10px;
				background-position: center;
			}

			&::-webkit-scrollbar-button:vertical:start:decrement {
				background-image: url('static/chevron-down.svg');
			}

			&::-webkit-scrollbar-button:vertical:end:increment {
				background-image: url('static/chevron-up.svg');
			}
		}
	}
</style>