<script>
	import { onMount } from 'svelte'
	import { fly } from 'svelte/transition'
	import { registerTrack } from '~/components/DataLayer/Track.svelte'
	import { Anchor, Picture, Swiper, BulletList, PhotoSwipe, Icon, Button } from '~/components'
	import { normatize, device as device$, debounce } from '~/lib'

	let swiperPosterEl
	let swiperThumbsEl
	let photoSwipeEl
	let swiperActiveIndex = 0
	let imgPoster = {
		width: 0,
		height: 0
	}
	let gallery = {
		title: {
			mobile: '',
			desk: ''
		},
		photos: []
	}

	onMount(async () => {
		const res = await fetch('data/data-gallery.json')
		gallery = await res.json()
	})

	$: getSelectedPoster = () =>
		gallery.photos.length ? gallery.photos.find(({ isSelected }) => isSelected) : {}

	const setSelectedPoster = ({ id }) => {
		const posterIndex = gallery.photos.findIndex((photo) => id === photo.id)
		if (posterIndex !== -1) {
			// unselect selected
			const selectedIndex = gallery.photos.findIndex(({ isSelected }) => isSelected)
			if (selectedIndex !== -1) {
				gallery.photos[selectedIndex].isSelected = false
			}
			// select new poster
			gallery.photos[posterIndex].isSelected = true
		}
	}

	const gotoNextPhoto = () => {
		let _swiperActiveIndex = swiperActiveIndex
		if (swiperActiveIndex === gallery.photos.length - 1) {
			updateSwipeIndexWithDelay(0)
		} else {
			_swiperActiveIndex++
			updateSwipeIndexWithDelay(_swiperActiveIndex)
		}
		swiperPosterEl.goto(_swiperActiveIndex)
	}

	const gotoPrevPhoto = () => {
		let _swiperActiveIndex = swiperActiveIndex
		if (swiperActiveIndex === 0) {
			swiperActiveIndex = gallery.photos.length - 1
		} else {
			_swiperActiveIndex--
		}

		swiperPosterEl.goto(_swiperActiveIndex)
	}

	const updateSwipeIndexWithDelay = (index, delay = 200) => {
		setTimeout(() => (swiperActiveIndex = index), delay)
	}
</script>

<style>
	:global(.gallery-fold){
		
		:global(.gallery-container) {
			width: 100%;
		}
		background: #fff;

		:global(.gallery-images) {
			.main-image {
				img {
					border-radius: 10px;
				}
			}

			:global(.rest-images) {
				:global(picture) {
					width: 125px;
					height: 85px;

					:global(img) {
						border-radius: 10px;
					}
				}
			}

			:global(.border-secondary) {
				:global(img) {
					border-width: 4px;
					border-color: var(--secondary-default);
				}
			}
		}
	}

	@screen lg {
		:global(.gallery-fold){
			/* width: calc(1020px + 1.5rem); */
			
			:global(.gallery-container) {
				width: 1020px;
			}

			:global(.gallery-images) {
				:global(.rest-images) {
					:global(picture) {
						width: 157px;
						height: 108px;
					}	
				}
			}

			:global(.border-secondary) {
				:global(img) {
					border-width: 0px;
				}
			}
		}
	}

	header {
		/* &::after {
			content: '';
			@apply absolute inset-0 h-full w-full;
			background: linear-gradient(
				to bottom,
				rgb(16 15 15 / 59%) -80%,
				theme('colors.primary.DEFAULT') 100%
			);
		} */
	}

	#GalleryFold{
		z-index: 50
	}
	.seta-direita {
		right: -288px;
		position: absolute;
		width: 320px;
	}

	@screen lg {
		.seta-direita {
			right: -179px;
		}
	} 

</style>

<Anchor name="GalleryFold" track="fotos" class="gallery-fold mr-auto ml-auto pb-10 px-0 lg:px-6">
	<!-- HEADER -->
	<header class="relative items-center pb-10 sm:text-center pt-0 px-4 lg:px-0">
		<div>
			<img class="seta-direita" src="./static/citroen-chevron-red.svg" alt="seta-direita"/>
		</div>
		<div>
			<h6 class="relative z-10 text-2xl text-left text-black lg:text-white uppercase w-full lg:w-10/12 mx-auto sm:text-center sm:text-2xl sm:text-trinary --bg-default leading-8 sm:text-left px-4 lo:px-0 citroen" style="color: #262626"></h6>
		</div>
			<strong class="text-2xl text-black lg:text-black uppercase leading-5 sm:text-left citroen citroen-500">{@html $device$.isMobile ? gallery.title.mobile : gallery.title.desk}</strong>

			<!-- <span class="block h-2 border-b-2 w-1/12 sm:mx-auto" style="border-color: #E1412D"></span> -->
	</header>

  <PhotoSwipe 
    bind:this="{photoSwipeEl}" 
    on:open="{() => {}}"
    on:close="{() => {}}"
    on:zoomIn="{() => {}}"
    on:zoomOut="{() => {}}"
    on:swipe="{({ index }) => {}}"
    items="{gallery.photos}" 
    let:data 
    let:isSwiped
  >
		<div slot="swipe">
			<Picture
				class="w-full"
				fold="{4}"
				name="{data.name}"
				workDir="{gallery.posterWorkDir}"
				resolutions="{['2x']}"
				devices="{{ desk: true, mobile: true }}"
				ext="jpg"
				alt="{data.title}"
			/>
		</div>

		<div slot="zoom">
			<Picture
				class="w-full"
				fold="{4}"
				waitUntil="{isSwiped}"
				name="{data.name}"
				workDir="{gallery.zoomWorkDir}"
				devices="{{ desk: true, mobile: false }}"
				ext="jpg"
				alt="{data.title}"
			/>
		</div>
	</PhotoSwipe>

	<!-- DESK -->
	{#if $device$.isDesk}
		<div class="gallery-container mx-auto">
			<!-- GALLERY -->
			<div class="w-full mx-auto grid gap-2 pb-10 gallery-images">
				<div class="relative col-start-1 col-end-8 main-image">
					<!-- POSTER -->
					<Picture
						class="block w-full"
						fold="{4}"
						loading="lazy"
						name="{getSelectedPoster().name}"
						workDir="{gallery.posterWorkDir}"
						resolutions="{['2x']}"
						devices="{{ desk: true }}"
						ext="jpg"
						ratio="{0.6766666667}"
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

					<!-- OPEN PHOTOSWIPE -->
					{#key getSelectedPoster()}
						<div in:fly="{{ y: 100, duration: 500, delay: 1000 }}" class="absolute top-1 right-1">
							<Button
								class="flex items-center justify-center w-10 h-9 opacity-90"
                styles="background-color: #393936"
								on:click="{() => photoSwipeEl.open(swiperActiveIndex)}"
							>
                <Icon.Zoom scale="{1.2}" styles="--color: var(--white)" />
							</Button>
						</div>
					{/key}
				</div>

				<!-- THUMBS -->
				<div class="col-start-8 col-end-12 rest-images">

					<div class="pr-2 overflow-x-hidden overflow-y-auto overflow-dcode grid grid-cols-2 gap-1">
						{#each gallery.photos as photo, index}
							<Picture
								class="transition duration-400 cursor-pointer w-12/12 flex-row overflow-hidden border-transparent {photo.isSelected ? 'border-secondary' : 'opacity-60'}"
								on:click="{() => {
									registerTrack('GalleryPage_ClicouThumb', normatize(photo.title), index)
									setSelectedPoster(photo)
									swiperActiveIndex = index
								}}"
								fold="{4}"
								loading="lazy"
								name="{photo.name}"
								workDir="{gallery.thumbWorkDir}"
								resolutions="{['2x']}"
								ratio="{0.6766666667}"
								devices="{{ desk: true, mobile: true }}"
								ext="jpg"
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
		<Swiper
			bind:this="{swiperPosterEl}"
			items="{gallery.photos}"
			on:swipe="{({ detail: { index } }) => {
				swiperThumbsEl.goto(index)
				updateSwipeIndexWithDelay(index)
				//registerTrack('GalleryPage_Swipe')
				//registerTrack('GalleryPage_Swipe', index)
			}}"
			let:prop="{item}"
		>
			{#if item}
				<Swiper.Item class="w-full" >
					<Picture
						class="w-full h-full"
						fold="{4}"
						waitUntil="{item.isSwiped}"
						name="{item.data.name}"
						workDir="{gallery.posterWorkDir}"
						resolutions="{['2x']}"
						devices="{{ desk: true, mobile: true }}"
						mode="cover"
						ext="jpg"
						alt="{item.data.title}"
					/>
				</Swiper.Item>
			{/if}
		</Swiper>

		<!-- THUMBS -->
		<Swiper
			bind:this="{swiperThumbsEl}"
			class="py-4 gallery-images"
			items="{gallery.photos}"
			let:prop="{item}"
		>
			{#if item}
				<Swiper.Item
					on:click="{() => swiperPosterEl.goto(item.index)}"
					class="ml-2 cursor-pointer md-border-4 pb-1 border-trasparent rest-images {item && swiperActiveIndex === item.index && 'border-secondary'}"
				>
					<Picture
						class="flex-none"
						fold="{4}"
						name="{item.data.name}"
						workDir="{gallery.thumbWorkDir}"
						resolutions="{['2x']}"
						devices="{{ desk: true, mobile: true }}"
						ext="jpg"
						alt="{item.data.title}"
						on:click="{() => {
							registerTrack('GalleryPage_ClicouThumb', normatize(item.data.title), item.index)
						}}"
					/>
				</Swiper.Item>
			{/if}
		</Swiper>

		<!-- BULLETS -->
		<BulletList
			class=""
			items="{gallery.photos}"
			styles="{{ iconColor: 'var(--secondary-default)', bullet: { default: 'border-white', activated: 'bg-secondary border-none' } }}"
			on:prev="{() => gotoPrevPhoto()}"
			on:index="{({ detail: index }) => swiperPosterEl.goto(index)}"
			on:next="{() => gotoNextPhoto()}"
			activedIndex="{swiperActiveIndex}"
		/>
	{/if}
</Anchor>
