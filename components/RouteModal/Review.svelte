<script>
	import { onMount } from 'svelte'
	import { fly } from 'svelte/transition'
	import { registerTrack } from '~/components/DataLayer/Track.svelte'
	import { Icon, Button } from '../'
	import { goto, device as device$, query as q } from '~/lib'
	export let data
	export let currentIndex
	let bodyEl
	const onClose = () => {
		bodyEl.classList.remove('is-modal-open')
	}
	onMount(() => {
		bodyEl = q('body')
		bodyEl.classList.add('is-modal-open')
	})
	const flyIntoDevice = (node) => {
		return $device$.isMobile ? fly(node, { x: 200 }) : fly(node, {})
	}
	// to improviment CLS
</script>

<style>
	.modal-review {
		width: calc(100% - 2rem);
		height: 400px;

		.logo {
			width: 160px;
			height: auto;
		}

		:global(.rounded-button) {
			border-radius: 32px;
			width: 100%;
			height: 48px;

			:global(a) {
				width: calc(100% - 42px);
				line-height: 14px;
			}

			:global(i) {
				width: 42px;
				height: 42px;
				top: 3px;
				left: -4px;

				&::after {
					top: calc(100%/2 - 10px/2);
					left: calc(100%/2 - 10px/2 - 2px) !important;
					color: #fff;
				}
			}

			&.bg-secondary {
				:global(i) {
					background: #BA081E;
				}
			}

			&.cta-monte {
				background: #EF9925;

				:global(i) {
					background: #D66B1C;
				}
			}
		}
	}

	@screen lg {
		.modal-review {
			width: 566px;
			height: 420px;

			.link-menu {
				:global(.rounded-button) {
					width: 100%;
				}
			}

			:global(.rounded-button) {
				border-radius: 32px;
				width: 239px;
				height: 48px;

				/** ANIMATION */
				&:hover {
					:global(i) {
						-webkit-transition: width .5s ease-in-out;
						-moz-transition: width .5s ease-in-out;
						-o-transition: width .5s ease-in-out;
						transition: width .5s ease-in-out;
						width: 65px;
					}
				}
			}
		}
	}
</style>

<div
	transition:flyIntoDevice
	class="absolute inset-0 top-16 lg:top-0 mx-auto  bg-tabColor sm:inset-x-0 xl:w-7/12 sm:w-8/12 sm:mt-10 modal-review"
>
	<div class="relative flex flex-col">
		<!-- DESK TEXTURE COVER -->
		<div class="absolute inset-0 left-0 w-full h-12" style="background-color: #212121"></div>

		<header class="relative flex justify-start border-0 bg-transparent justify-end">
			<!-- Close Button -->
			<Button
				style="background-color: #212121"
				class="z-50 p-3 inline-block"
				on:click="{() => {
					registerTrack('Modal_Fechou_WithTitle', data[currentIndex].route)
					onClose()
					goto('')
				}}"
			>
				<Icon.Close color="white" />
			</Button>
		</header>
    <!-- Content -->
  <div class="image flex justify-center items-center flex-col py-6 px-6">
    <img class="logo" src="static/LOGO_CITROEN_ADVISOR_transparente.png" alt="logo citroen">
		<p class="citroen citroen-300 text-xl lg:text-2xl leading-5 pt-2 pb-4 text-center">Veja as avaliações e comentários dos clientes C4 Cactus.</p>
		<img class="pt-0 lg:pt-2 pb-6 lg:pb-10 w-4/5 lg:w-auto" src="static/stars-yellow-rounded.png" alt="logo citroen">
		<!-- <img class="logo-stars" src="static/star-yellow-rounded.png" alt="stars">   -->
		<div class="rounded-button bg-secondary flex mt-2 -ml-2">
			<Button
				class="px-2 py-4 text-xl lg:text-xl citroen citroen-300 text-left text-white xl:w-full md:w-2/12 sm:w-4/12 w-6/12 sm:py-4 pl-4"
				isBlank="false"
				label="Veja as avaliações"
				to="https://www.citroen.com.br/veiculos-novos/veiculos-de-passeio/novo-suv-citroen-c4-cactus/avaliacao-dos-clientes.html"
				on:click="{() => {
					registerTrack('Modal_Fechou_WithTitle', data[currentIndex].route)
					onClose()
					goto('')
				}}"
			/>
			<Icon.Chevron color="var(--secondary-default)" type="right" />
		</div>
  </div>
	</div>
</div>