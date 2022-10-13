<script>
	import { onMount } from 'svelte'
	import { writable } from 'svelte/store'
	import { fade, fly } from 'svelte/transition'
	import { registerTrack } from '~/components/DataLayer/Track.svelte'
	import { Anchor, Icon, Button, Picture, Swiper, Car360 } from '~/components'
	import { theme, goto, normatize, device as device$ } from '~/lib'

	const selected$ = writable({ features: [] })
	const enabled360$ = writable(false)
	let swiperEl

	let version = {
		"title": {
			"mobile": "qual versão combina com você? descubra aqui!",
			"desk": "qual versão combina com você? descubra aqui!"
		},
		"list": [
			{
				"name": "X-Series 1.6 <br>Automático",
				"title": "SUV Citroën C4 Cactus <strong class='' style='color: #dd9c24;'>X-Series 1.6 <br>Automático</strong>",
				"features": [
					"Câmbio automático",
					"Motor 1.6 de 118 cv",
					"Teto bi-tom preto",
					"Rodas de liga leve 16\" pintadas em preto"
				],
				"thumbWorkDir": "/thumbs",
				"framesDir": "/07/",
				"thumb": "07",
				"titleColor": "#000"
			},
			{
				"name": "Live 1.6 <br>Automático",
				"title": "SUV Citroën C4 Cactus <strong class=''>Live 1.6 <br>Automático</strong>",
				"features": [
					"Motor EC5 1.6 16v de 118 cv",
					"Câmbio automático de 6 velocidades",
					"Central Multimídia 7”"
				],
				"thumbWorkDir": "/thumbs",
				"framesDir": "/01/",
				"thumb": "01",
				"titleColor": "#44B0B0"
			},
			{
				"name": "Feel 1.6 <br>Automático",
				"title": "SUV Citroën C4 Cactus <strong class=''>Feel 1.6 <br>Automático</strong>",
				"features": [
					"Rodas de liga leve de 17”",
					"Faróis de Neblina",
					"Sensor de detecção de pressão dos pneus"
				],
				"thumbWorkDir": "/thumbs",
				"framesDir": "/02/",
				"thumb": "02",
				"titleColor": "#44B0B0"
			},
			{
				"name": "Feel Pack 1.6 <br>Automático",
				"title": "SUV Citroën C4 Cactus <strong class=''>Feel Pack 1.6 <br>Automático</strong>",
				"features": [
					"Chave presencial com sistema keyless",
					"4 Airbags: 2 frontais + 2 laterais",
					"Roda liga leve 17” diamantada"
				],
				"thumbWorkDir": "/thumbs",
				"framesDir": "/03/",
				"thumb": "03",
				"titleColor": "#44B0B0"
			},
			{
				"name": "Shine 1.6 Thp <br>Pack Automático",
				"title": "SUV Citroën C4 Cactus <strong class=''>Shine 1.6 Thp Pack <br>Automático</strong>",
				"features": [
					"Motor Turbo de 173 cv",
					"Grip Control",
					"Sistemas de auxílio a condução (ADAS)"
				],
				"thumbWorkDir": "/thumbs",
				"framesDir": "/04/",
				"thumb": "04",
				"titleColor": "#44B0B0"
			}
		]
	};

	selected$.set(version.list[0])

	$: basePath = `static/folds/3/${$device$.isMobile ? 'mobile' : 'desk'}`

	const select = (version) => {
		registerTrack(
			'VersionsPage_SelecionouVersaoCarro',
			normatize(version.name),
			version.color,
			version.label
		)
		$selected$ = version
		enabled360$.set(false)
	}

	const enable360 = () => {
		enabled360$.set(false)
	}

	$: isSelected = (version) => version.name === $selected$.name

	const goLocation = (href) => {
		window.open(href, '_blank');
	}
</script>

<style>
	:global(.version-fold) {
		width: 100%;

		.arrow-red {
			&:before {
				content: "";
				background: white;
				height: 120px;
				width: 200px;
				position: absolute;
				top: -38px;
				left: -22px;
				z-index: -1;
			}
		}

		:global(.cars-version) {
			width: auto;
			height: auto;			
		}

		.selected {
			span { 
				color: #E39C24 !important;
				font-weight: 500;
			}
		}

		:global(.version-carousel) {
			:global(.flex-none) {
				padding: 0px 2px;

				&:not(:first-of-type) {
					&:before {
						content: "";
						display: flex;
						height: calc(100% - 25px);
						border-left: 1px dotted #FD1330;
						position: absolute;
						top: calc(25px/2);
						left: 0px
					}
				}

				&:first-of-type {
					@apply ml-4;
				}
			}
		}

		.information-list {
			width: 300px;
			
			li {
				color: #000;

				&::before {
					color: #e21017;
				}
			}
		}
		:global(.rounded-button) {
			border-radius: 32px;
			width: 100%;
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
		:global(.version-fold) {
			width: calc(1020px + 1.5rem);

			:global(.cars-version) {
					width: auto;
					height: 379px;			
				}

			:global(.version-carousel) {
				:global(.flex-none) {
					padding: 0px 14px;

					&:not(:first-of-type) {
						&:before {
							content: "";
							display: flex;
							height: calc(100% - 25px);
							border-left: 1px dotted #FD1330;
							position: absolute;
							top: calc(25px/2);
							left: 8px
						}
					}

					&:first-of-type {
						@apply ml-0;
					}
				}
			}

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

	@screen lg {
		.Car360-wrap {
			&::after {
				height: calc(100% + theme('height.20')) !important;
			} 

			& .Thumb-picture {
				@apply top-2/12;
			}
		}

		:global(.is-menu-open) {
			& .Car360-wrap {
				@apply w-11/12;
			}

			& .Car360-container{
				@apply w-9/12 -mr-10
			}

			& :global(.Thumb-picture) {
				@apply top-1/4;
			}
		}
	}

  /* @screen sm {
    .Car360-container {
      @apply w-full;
    }
  } */



	.Thumb-textContainer{
		&.selected span,
		&:hover span{
			@apply border-secondary;
			color: #212121
		}
		&.notselected span{
			border-color: transparent;
			color: #999999 !important;
		}
	}

	ul {
		list-style: none;

		& li:before {
			content: '\2022';
    	color: var(--secondary-default);
    	padding-right: 10px;
		}
	}

	

	.gradiente-modelos{
		background-image: linear-gradient(to bottom, #21355E 7%, black 28%);
	}

	.detail-title-version{
		width: 264px;
	}

	.detail-title-version span{
		position: relative;
		color: #424242;
	}

	.detail-title-version span:after,
	.detail-title-version span:before{
		content: "";
		display: inline-block;
		vertical-align: middle;
		width: 0; 
		height: 0;
		position: absolute;
		bottom: 0;
		top: 0px;
		transform: translate(-50%, 0);
	}

	.detail-title-version span:before {
		border-left: 15px solid transparent;
		border-right: 15px solid transparent;
		border-top: 12px solid #E1412D;
		top: 2px;
	}

	.detail-title-version span:after{
		top: -1px;
		border-left: 15px solid transparent;
		border-right: 15px solid transparent;
		border-top: 12px solid #FFF;
	}

	@media (max-width: 768px){
		.detail-title-version{
			width: 50px;
			margin-top: 7px;
		}
	}

	@media (width <= 350px) {
		:global(.Car360-wrap .Thumb-picture) {
			@apply top-1/4;
		}
	}

	.size-22 {
		font-size: 22px;
	}
</style>

<Anchor name="VersionFold" track="todas-as-versoes" class="relative pt-10 sm:pt-0 mr-auto ml-auto px-0 lg:px-6 version-fold">
	<!-- BACKGROUND -->
	<!-- <div class="absolute z-0 w-full h-full sm:background-tranparent bg-black">
		<div class="w-full h-full sm:bg-texture-light sm:opacity-40 bg-black"></div>
	</div> -->

	<!-- CONTENT -->
	<div class="relative z-20 w-full h-full background-transparent" >
		<div class="z-30">
			<!-- HEADER -->
			<header class="sm:pt-16 sm:pb-10 pb-10 pl-7 lg:pl-5 pr-4 sm:pr-0 sm:text-left relative z-50 flex items-center sm:-right-3 sm:relative lg:-right-2">
				<div class="sm:relative -left-2 relative lg:-left-3 -top-1">
					<svg xmlns="http://www.w3.org/2000/svg" width="18.533" height="34.086" viewBox="0 0 18.533 34.086">
						<path id="Path_1440" data-name="Path 1440" d="M4479.35,799.926c.524-.481,12.82-11.8,12.82-15.892s-12.3-15.412-12.82-15.891a4.666,4.666,0,0,0-2.744-1.152c-1.128,0-2.263.077-2.274.077-.052,0-.532.029-.662.3a.3.3,0,0,0-.033.14.586.586,0,0,0,.127.328l.009.011c.27.309,10.125,11.682,10.125,16.187s-9.855,15.877-10.12,16.182a.038.038,0,0,0-.009.011.594.594,0,0,0-.133.335.312.312,0,0,0,.033.139c.13.27.61.3.664.3.009,0,1.144.077,2.272.077a4.675,4.675,0,0,0,2.744-1.151" transform="translate(-4473.637 -766.991)" fill="#f1a92a"/>
				</svg>
				</div>
				<h5 class="text-2xl leading-5 uppercase citroen citroen-500">
					{@html $device$.isMobile ? version.title.mobile : version.title.desk}
				</h5>
<!-- 
				<div class="detail-title-version border-b-2 border-transparent block h-1 sm:mt-3 sm:mx-auto" style="border-color: #E1412D">
					<span class="sm:block hidden"></span>
				</div> -->
			</header>

			<!-- FEATURES -->
			<div class="flex flex-col w-full lg:pb-0 mx-auto bg-white">
				
				<!-- Thumbs carrousel -->
				<div class="relative z-10 flex justify-center mt-4 sm:mt-20 space-x-2 sm:mt-20 xl:mt-92 -ml-4 lg:ml-0">
					<div class="arrow-red absolute right-0 z-1 block lg:hidden">
						<svg xmlns="http://www.w3.org/2000/svg" width="24.609" height="19.187" viewBox="0 0 24.609 19.187" class="relative top-3 -left-4">
							<g id="seta" transform="translate(-342.5 -384.388)">
								<path id="Path_1118" data-name="Path 1118" d="M8995-961l6.2,7.482-6.2,7.482" transform="translate(-8636.037 1347.5)" fill="none" stroke="#e21017" stroke-linecap="round" stroke-width="3"/>
								<path id="Path_1119" data-name="Path 1119" d="M364.563,390.5H344" transform="translate(0 3.482)" fill="none" stroke="#e21017" stroke-linecap="round" stroke-width="3"/>
							</g>
						</svg>
					</div>
					<!-- MOBILE -->
					{#if $device$.isMobile}	
						<Swiper
							class="relative -top-8 version-carousel"
							items="{version.list}"
							let:prop="{item}"
							on:swipe="{({ detail: { index } }) => {
								registerTrack('MainPage_PaginouFeaturesNoMobile', 'todas-as-versoes' , index)
							}}"
						>
							<Swiper.Item class="relative border-0 cursor-pointer w-5/12 grid">
								<div class="relative shadow flex flex-col justify-between h-full" on:click="{() => select(item.data)}">
										<Picture
										class="w-full top-2/12"
										fold="{3}"
										name="{item.data.thumb}"
										workDir="{item.data.thumbWorkDir}"
										devices="{{ mobile: false }}"
										ext="png"
										fallback="png"
										alt="{item.data.name}"
									/>
									<div
										class:notselected="{!isSelected(item.data)}"
										class:selected="{isSelected(item.data)}"
										class="Thumb-textContainer"
									>
									<p class="text-xs text-center">
										<!-- <span class="border-b-2 mx-auto w-4/12 border-transparent block h-1 mb-2 -mt-2"></span> -->
										<span class="leading-1 relative inline-block citroen">
											{@html item.data.name }
										</span>
									</p>
									</div>
								</div>
							</Swiper.Item>
						</Swiper>

					<!-- DESKTOP -->
					{:else}
						<Swiper
							class="relative -top-10 pr-8 flex version-carousel"
							items="{version.list}"
							let:prop="{item}"
							on:swipe="{({ index }) => {
								registerTrack('MainPage_PaginouFeaturesNoMobile', 'todas-as-versoes' , index)
							}}"
						>

							<Swiper.Item class="relative border-0 -mr-5 pr-0 cursor-pointer">
								<div class="relative shadow flex flex-col justify-between h-full" on:click="{() => select(item.data)}">
										<Picture
										class="w-full top-2/12"
										fold="{3}"
										name="{item.data.thumb}"
										workDir="{item.data.thumbWorkDir}"
										devices="{{ mobile: false }}"
										ext="png"
										fallback="png"
										alt="{item.data.name}"
									/>
									<div
										class:notselected="{!isSelected(item.data)}"
										class:selected="{isSelected(item.data)}"
										class="Thumb-textContainer"
									>
									<p class="text-md text-center">
										<!-- <span class="border-b-2 mx-auto w-4/12 border-transparent block h-1 mb-2 -mt-3"></span> -->
										<span class="leading-4 relative inline-block">
											{@html item.data.name }
										</span>
									</p>
									</div>
								</div>
							</Swiper.Item>
						</Swiper>
						<!-- DESKTOP -->
					{/if}
				</div>
				<!-- Thumbs carrousel -->

				<div class="flex flex-col lg:flex-row px-4 lg:px-0">

					<div class="-mt-10 lg:mt-9 z-50 relative order-2 lg:order-1">
						{#if $device$.isDesk}	
							{#key $selected$}
								<p
									in:fly="{{ y: 100, duration: 1000 }}"
									class="text-xl sm:text-left text-center citroen citroen-300 title-version mb-6 uppercase"
									style="color: {$selected$.titleColor}"
								>
								{@html $selected$.title}
								</p>
							{/key}
						{/if}
						<ul class="text-secondary sm:w-3/4 sm:text-left sm:mt-0 mt-5 z-20 information-list">
							{#key $selected$.features}
								{#each $selected$.features as feature}
									<li in:fly="{{ y: 100, duration: 1000 }}" class="text-lg citroen citroen-300 leading-7">{feature}</li>
								{/each}
							{/key}
						</ul>
						<div class="rounded-button bg-secondary flex mt-8">
							<Button
								class="px-2 py-4 text-xl lg:text-xl citroen citroen-300 text-left text-white xl:w-full md:w-2/12 sm:w-4/12 w-6/12 sm:py-4 pl-4" 
								to="https://citroenbr.com.br/formulario/proposta/#sticky"
								label="Compre o seu"
								isBlank
								on:click="{() => {
									registerTrack('VersionsPage_ClicouCompre', 'cta-compre-a-sua', normatize($selected$.name))
								}}"
							/>
							<div
								class="cursor-pointer"
								on:click="{() => {
									goLocation('https://citroenbr.com.br/formulario/proposta/#sticky')
								}}"
							>
								<Icon.Chevron color="var(--secondary-default)" type="right" />
							</div>
						</div>
					</div>
					
					<!-- Carro desktop -->
					<div class="relative md:w-full Car360-wrap bg-white grid z-0 order-1 lg:order-2">
						{#if $device$.isMobile}	
							{#key $selected$}
								<p
									in:fly="{{ y: 100, duration: 1000 }}"
									class="text-xl sm:text-left text-center citroen citroen-300 title-version mb-6 uppercase"
									style="color: {$selected$.titleColor}"
								>
								{@html $selected$.title}
								</p>
							{/key}
						{/if}
						<div
							class="w-full overflow-hidden z-0 mt-6 mb-6 sm:top-10 lg:-top-80 sm:-right-20 2xl:-top-96"
						>
							<Picture
								class="md:w-full cars-version"
								fold="{3}"
								loading="lazy"
								name="00"
								workDir="{$selected$.framesDir}"
								devices="{{ desk: true, mobile: true }}"
								ext="jpg"
								fallback="jpg"
								alt="{$selected$.name}"
							/>
						</div>
					</div>
					<!-- Carro desktop -->

				</div>

			</div>

			<!-- CTAS -->
			<div class="w-full lg:pb-20 pb-14 pt-8 lg:pt-0">

				<div class="relative z-10 flex items-center justify-center w-full lg:w-11/12 mx-auto sm:w-full lg:pb-0 space-x-3">
				
					<div class="flex flex-col items-center px-4 lg:px-0">
						<p class="w-full lg:w-3/5 text-xl text-center leading-5 pb-4 citroen citroen-300 size-22">Quer montar o modelo ideal para você, vendo todos os detalhes antes de receber uma proposta?</p>
						<div class="rounded-button cta-monte flex">
							<Button
								class="px-2 py-4 text-xl lg:text-xl citroen citroen-300 text-left text-white xl:w-full md:w-2/12 sm:w-4/12 w-6/12 sm:py-4 bg-opacity-60 pl-4"  
								isBlank
								to="https://www.citroenbr.com.br/monte-o-seu/c4-cactus?utm_source=showroom-cactus&utm_medium=menu-showroom-cactus&utm_campaign=showroom-cactus"
								label="Monte o seu"
								on:click="{() => {
									registerTrack('VersionsPage_ClicouCompre', 'cta-monte-o-seu', normatize($selected$.name))
								}}"
							/>
							<div
								class="cursor-pointer"
								on:click="{() => {
									goLocation('https://www.citroenbr.com.br/monte-o-seu/c4-cactus?utm_source=showroom-cactus&utm_medium=menu-showroom-cactus&utm_campaign=showroom-cactus')
								}}"
							>
								<Icon.Chevron color="var(--secondary-default)" type="right" />
							</div>
						</div>
					</div>

					<!-- <Button
						class="px-2 py-4 text-xl citroen citroen-500 text-center text-white xl:w-2/12 sm:w-4/12 w-6/12 sm:py-4 bg-secondary" 
						to="https://citroenbr.com.br/formulario/proposta/#sticky"
						label="Compre o seu"
						isBlank
						on:click="{() => {
							registerTrack('VersionsPage_ClicouCompre', 'cta-compre-a-sua', normatize($selected$.name))
						}}"
					/> -->
				</div>
			</div>
		</div>
	</div>
</Anchor>