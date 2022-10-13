<script>
	import { registerTrack } from '~/components/DataLayer/Track.svelte'
	import { Anchor, Button, Icon, Picture } from '~/components'
	import { device as device$ } from '~/lib'

	const goLocation = (href) => {
		window.open(href, '_blank');
	}
</script>

<style>
	:global(.vd-fold) {
		background: #000;

		:global(.rounded-button) {
			border-radius: 32px;
			width: calc(100% - 2rem);
			height: 48px;
			background-color: #E21017;
			
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
		:global(.vd-fold) {
			:global(.rounded-button) {
				width: 240px;
				background-color: #E21017;

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

	@screen sm {
		:global(.VdFold picture) {
			height: 75vw;
			& img {
				object-fit: cover;
			}
		}
	}

	@screen lg {
		:global(.VdFold picture) {
			height: auto;
			& img {
				object-fit: fill;
			}
		}

		.CtaWrap {
			width: 100%;

			& > div {
				@apply relative;

				&::after {
					content: '';
					/*background-image: linear-gradient(to bottom, #f5eed6, #b0a477 40%, #786e48 70%); */
				}
			}
		}

		:global(.is-menu-open) {
			.CtaWrap {
				width: max(20rem, 30vw);

				& > div {
					width: max(24rem, 35vw);
				}
			}
		}
	}
	@screen xl {
		.CtaWrap {
			@apply w-full;

			& > div {
				width: 120%;
			}
		}
	}
</style>

<Anchor name="VdFold" track="veja-as-ofertas" class="vd-fold">
	<!-- CONTENT -->
	<div class="w-full flex sm:static relative mb-10">
		<div class="md:w-6/12 w-full">
			<Picture
				class="w-full"
				fold="{2}"
				name="garanta-o-seu"
				resolutions="{['2x']}"
				devices="{{ desk: true, mobile: true }}"
				ext="jpg"
				let:prop="{imageData}"
			>
				<img class="w-full" src="{imageData.src}" alt="Garanta o seu Citroen C4 Cactus" />
			</Picture>
		</div>
		<div class="md:w-6/12 sm:my-auto md:static absolute top-0 w-full h-full citroen px-4 lg:px-0">
			<div class="z-10 text-center">
				{#if $device$.isMobile}
					<p class="text-md text-white citroen citroen-300 uppercase pt-5 leading-5">
						<!-- DE R$ 105.590 POR R$ 94.990 +<br/> -->
						A partir de R$ 94.990 +<br/>
						<strong class="text-2xl leading-7">PRIMEIRA PARCELA PARA 2022 NO ECOMMERCE<br/>
					</p>
				{:else}
					<p class="text-2xl citroen citroen-300 uppercase leading-7 text-white pb-0 lg:pb-1">
						<!-- DE R$ 105.590 POR R$ 94.990 +<br/><strong class="text-3xl">PRIMEIRA PARCELA PARA 2022 NO ECOMMERCE</strong>  -->
						A partir de R$ 94.990 +<br/><strong class="text-3xl">PRIMEIRA PARCELA PARA 2022 NO ECOMMERCE</strong> 
					</p>
				{/if}
			</div>
			<div class="bg-secondary rounded-button flex m-auto absolute top-full lg:mt-5 -mt-5 ml-auto lg:my-auto lg:static btn-ofertas z-10">
				<Button
					isBlank
					to="https://www.citroenbr.com.br/cactus/ofertas/"
					label="Veja a oferta"
					on:click="{() => {
						registerTrack('PreVenda_ClicouOfertas')
					}}"
					class="px-2 py-4 text-xl lg:text-xl citroen citroen-300 text-left text-white xl:w-full md:w-2/12 sm:w-4/12 w-6/12 sm:py-4 pl-4"
				/>
				<div
					class="cursor-pointer"
					on:click="{() => {
						goLocation('https://www.citroenbr.com.br/cactus/ofertas/')
					}}"
				>
					<Icon.Chevron color="var(--secondary-default)" type="right" />
				</div>
			</div>
			<span
				class="text-center mt-2 -ml-4 px-0 lg:px-10 text-xs block text-white sm:static w-full absolute bottom-6 citroen citroen-300 uppercase"
			>
				* VÁLIDO PARA A VERSÃO LIVE AUTO. PREÇO DO E-COMMERCE
			</span>
		</div>
	</div>
</Anchor>
