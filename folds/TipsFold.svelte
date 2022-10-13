<script>
	import { onMount } from 'svelte'
  import { registerTrack } from '~/components/DataLayer/Track.svelte'
  import { Anchor, Icon, Picture, Swiper, BulletList, PhotoSwipe, Button } from '~/components'
	import { normatize, device as device$, gotoEl, query as q  } from '~/lib'

	function nextFold() {
		const nextFoldEl = q('#TipsFold')
		nextFoldEl && gotoEl(nextFoldEl)
	}

  let swiperTipsEl
	let swiperActiveIndex = 0
	let imgPoster = {
		width: 0,
		height: 0
	}
	let imgThumb = {
		width: 0,
		height: 0
	}
  let tips = {
		title: {
			mobile: '',
			desk: ''
		},
		name: '',
		photos: []
	}

  onMount(async () => {
		const res = await fetch('data/data-tips.json')
		tips = await res.json()
	})

  // $: getSelectedPoster = () =>
	// 	tips.photos.length ? tips.photos.find(({ isSelected }) => isSelected) : {}

	$: getSelectedPoster = () => {
		let toReturn = []

		if (tips.photos.length) {
			toReturn = tips.photos[swiperActiveIndex]
		} else {
			toReturn = tips.photos.length ? tips.photos.find(({ isSelected }) => isSelected) : {}
		}
		return toReturn
	}

	const setSelectedPoster = ({ id }) => {
		const posterIndex = tips.photos.findIndex((photo) => id === photo.id)
		if (posterIndex !== -1) {
			// unselect selected
			const selectedIndex = tips.photos.findIndex(({ isSelected }) => isSelected)
			if (selectedIndex !== -1) {
				tips.photos[selectedIndex].isSelected = false
			}
			// select new poster
			tips.photos[posterIndex].isSelected = true
		}
	}

	const gotoNextPhoto = () => {
		let _swiperActiveIndex = swiperActiveIndex
		if (swiperActiveIndex === tips.photos.length - 1) {
			updateSwipeIndexWithDelay(0)
		} else {
			_swiperActiveIndex++
			updateSwipeIndexWithDelay(_swiperActiveIndex)
		}
		swiperTipsEl.goto(_swiperActiveIndex)
	}

	const gotoPrevPhoto = () => {
		let _swiperActiveIndex = swiperActiveIndex
		if (swiperActiveIndex === 0) {
			swiperActiveIndex = tips.photos.length - 1
		} else {
			_swiperActiveIndex--
		}

		swiperTipsEl.goto(_swiperActiveIndex)
	}

	const updateSwipeIndexWithDelay = (index, delay = 200) => {
		setTimeout(() => (swiperActiveIndex = index), delay)
	}

	const goLocation = (href) => {
		window.open(href, '_blank');
	}
</script>

<style>
	#TipsFold{
		z-index: 50
	}

	:global(.swiper-container) {
		position: relative;
		top: -2px;
	}

	:global(.tips-fold) {
		width: 100%;

		.tips-carousel {
			width: 198px;
		}

		:global(.rounded-button) {
			margin-left: 1px !important;
		}
	}

	@screen lg {
		:global(.tips-fold) {
			width: calc(1020px + 1.5rem);

			/** ANIMATION */
			:global(.rounded-button) {
				margin-left: 14px !important;
				
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
	:global(.tips-fold) {
		:global(.rounded-button) {
			border-radius: 32px;
			width: 240px;
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
</style>

<Anchor name="TipsFold" track="s-design" class="pb-5 -mt-0 lg:-mt-56 mr-auto ml-auto px-0 lg:px-6 tips-fold">
		<!-- DESK -->
	{#if $device$.isDesk}
		<div>
			<div class="static flex flex-col items-center w-full -bottom-12 h-28 bg-white x-series">
				<div class="static w-full sm:h-full bg-white sm:pt-8">
					<h3
						class="text-2xl position: relative xl:pt-8 sm:pt-6 md:-top-6 -top-2 sm:tracking-widest text-center text-form-dark sm:mb-2 pt-6 sm:uppercase citroen citroen-300"
					>
					o <span class="text-secondary citroen citroen-700">x-series</span> foi pensado para você.
					</h3>
				</div>
			</div>
			<!-- GALLERY -->
			<div class="w-11/12 mx-auto grid grid-cols-12 gap-2 pb-10">
				<div class="relative col-start-1 col-end-11" style="height: {imgPoster.height}px;">
					<!-- POSTER -->
					<Picture
						class="block w-full"
						fold="{7}"
						loading="lazy"
						name="{getSelectedPoster().name}"
						workDir="{tips.posterWorkDir}"
						resolutions="{['2x']}"
						devices="{{ desk: true }}"
						ext="png"
						ratio="{0.623}"
						on:ratio="{({ detail: { height } }) => (imgPoster.height = height)}"
						alt="{getSelectedPoster().title}"
						let:prop="{imageData}"
					>
            <img
              class="w-full"
              src="{imageData.src}"
              alt="{getSelectedPoster().title}"
            />
					</Picture>
				</div>

				<!-- THUMBS -->
				<div class="col-start-11 col-end-13">
					<div
						style="height: {imgPoster.height}px"
						class="overflow-x-hidden overflow-y-auto overflow-dcode grid grid-cols-1 pr-2 tips-carousel"
					>
						{#each tips.photos as photo, index}
							<Picture
								class="transition duration-400 cursor-pointer w-12/12 flex-row overflow-hidden border-4 border-transparent {photo.isSelected ? 'border-secondary' : 'opacity-60'}"
								on:click="{() => {
									registerTrack('TipPage_ClicouThumb', 'galeria-ripcurl', normatize(photo.title), index)
									setSelectedPoster(photo)
									swiperActiveIndex = index
								}}"
								fold="{7}"
								loading="lazy"
								name="{photo.name}"
								workDir="{tips.thumbWorkDir}"
								resolutions="{['2x']}"
								ratio="{0.9}"
								on:ratio="{({ detail: { height } }) => (imgThumb.height = height)}"
								devices="{{ desk: true, mobile: true }}"
								ext="png"
								alt="{photo.title}"
								let:prop="{imageData}"
							>
								<img
									class="w-full transition-transform transform"
									src="{imageData.src}"
									alt="{photo.title}"
								/>
							</Picture>
						{/each}
					</div>
				</div>
				<!-- THUMBS -->
			</div>
		</div>
		<!-- DESKTOP -->
	{:else}

		<!-- MOBILE -->
		<!-- GALLERY -->
		<div>
			<div class="static flex flex-col items-center w-full cursor-pointer -bottom-12 bg-white x-series"
			>
				<div class="static w-full sm:h-full bg-white sm:pt-5 sm:pt-0 ">
					<h3
						class="text-md position: relative sm:tracking-widest text-center text-form-dark sm:mb-2 pb-4 uppercase citroen citroen-400 lg:citroen-300"
					>
						o <span class="text-secondary citroen citroen-700 ">x-series</span> foi pensado para você.
					</h3>
				</div>
				<!-- <div class="z-10 flex items-center xl:pb-12  sm:bg-transparent relative sm:-top-9 -top-3">
					<Icon.Chevron class="animate-bounce" color="var(--secondary-default)" type="down" />
				</div> -->
			</div>
		</div>
		<Swiper
			
			bind:this="{swiperTipsEl}"
			items="{tips.photos}"
			on:swipe="{({ detail: { index } }) => {
				updateSwipeIndexWithDelay(index)
				//registerTrack('TipsPage_Swipe')
				//registerTrack('TipsPage_Swipe', index)
			}}"
			let:prop="{item}"
			class="swiper-container"
		>
			{#if item}
				<Swiper.Item class="w-full" >
					<Picture
						class="w-full h-full "
						fold="{7}"
						waitUntil="{item.isSwiped}"
						name="{item.data.name}"
						workDir="{tips.posterWorkDir}"
						resolutions="{['2x']}"
						devices="{{ desk: true, mobile: true }}"
						mode="cover"
						ext="png"
						alt="{item.data.title}"
					/>
				</Swiper.Item>
			{/if}
		</Swiper>

		<!-- BULLETS -->
		<BulletList
			class=""
			items="{tips.photos}"
			styles="{{ iconColor: 'var(--secondary-default)', bullet: { default: 'border-white', activated: 'bg-secondary border-none' } }}"
			on:prev="{() => gotoPrevPhoto()}"
			on:index="{({ detail: index }) => swiperTipsEl.goto(index)}"
			on:next="{() => gotoNextPhoto()}"
			activedIndex="{swiperActiveIndex}"
		/>
	{/if}
	<div class="w-11/12 mx-auto">
		<div class="w-full px-0 lg:px-5 pb-7 pt-2 xl:px-0 xl:pb-8">
			<h3 class="text-xl text-left text-primary uppercase citroen citroen-500">
				{getSelectedPoster().title}
			</h3>
			<p class="text-xl text-left text-primary citroen citroen-300">
				{getSelectedPoster().subtitle}
			</p>
		</div>
		<div class="relative z-10 flex items-center justify-center w-full sm:w-full lg:pb-0 space-x-3">
			{#if $device$.isDesk}
				<div class="xl:w-auto">
					<h3 class="text-2xl text-center text-primary citroen">
						Gostou dessa versão?
					</h3>
				</div>
			{/if}
			<div class="bg-secondary rounded-button flex">
				<Button
					class="px-2 py-4 text-xl lg:text-xl citroen citroen-300 text-left text-white xl:w-full md:w-2/12 sm:w-4/12 w-6/12 sm:py-4 pl-4" 
					to="https://citroenbr.com.br/formulario/proposta/#sticky"
					label="Compre o seu"
					isBlank
					on:click="{() => {
						registerTrack('TipsPage_ClicouCompre', 'cta-compre-a-sua', normatize(tips.name))
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

			<div class="rounded-button cta-monte flex">
				<Button
					class="px-2 py-4 text-xl lg:text-xl citroen citroen-300 text-left text-white xl:w-full md:w-2/12 sm:w-4/12 w-6/12 sm:py-4 bg-opacity-60 pl-4"  
					isBlank
					to="https://www.citroenbr.com.br/monte-o-seu/c4-cactus?v=CIT210&utm_source=showroom-cactus&utm_medium=menu-showroom-cactus&utm_campaign=showroom-cactus"
					label="Monte o seu"
					on:click="{() => {
						registerTrack('TipsPage_ClicouCompre', 'cta-monte-o-seu', normatize(tips.name))
					}}"
				/>
				<div
					class="cursor-pointer"
					on:click="{() => {
						goLocation('https://www.citroenbr.com.br/monte-o-seu/c4-cactus?v=CIT210&utm_source=showroom-cactus&utm_medium=menu-showroom-cactus&utm_campaign=showroom-cactus')
					}}"
				>
					<Icon.Chevron color="var(--secondary-default)" type="right" />
				</div>
			</div>
		</div>
	</div>
</Anchor>