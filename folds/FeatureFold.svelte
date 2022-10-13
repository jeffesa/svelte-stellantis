<script>
	import { onMount } from 'svelte'
	import { fly, fade } from 'svelte/transition'
	import { registerTrack } from '~/components/DataLayer/Track.svelte'
	import {
		Anchor,
		Icon,
		Button,
		Picture,
		Accordions,
		Tabs,
		Swiper,
		BulletList,
		ArrowControl,
		Video
	} from '~/components'
	import { normatize, device as device$, query as q } from '~/lib'
	import { isString } from '~/lib/is'
	import { activatedTab$ } from '~/lib/app'

	let selectedPhoto
	let swiperEl
	let features = []
	let activeFeatureIndex = 0
	let tabEl

	onMount(async () => {
		const res = await fetch('data/data-features.json')
		features = await res.json()
		selectedPhoto = features[activeFeatureIndex].gallery.photos[0].id
	})

	let selectedAccordion
	let swiperActivatedIndex = 0
	let accordionEl
	let currentFeature
	let accordionPicHeight = 0
	let hoveringTabId
	let nextPrev = 0

	// reactive get activated tab on load
	$: features.length && ($activatedTab$ = features[activeFeatureIndex].name)
	$: features.length && (currentFeature = features[activeFeatureIndex])

	const gotoAccordion = ({ detail }) => {
		//change selected
		selectedAccordion = detail
	}

	const getFeatureBy = (id) => features.find((feature) => feature.id === id)

	const getPhotoIndexByAccordion = (feature, photoId) => {
		return feature.gallery.photos.findIndex((photo) => photo.id === photoId)
	}

	$: getSelectedPhotoBy = (feature) => {
		const photoIndex = getPhotoIndexByAccordion(feature, selectedPhoto)
		return feature.gallery.photos[photoIndex]
	}

	let lstMudouPoster
	const gotoPhoto = (photo) => {
		if (photo && photo.id) {
			selectedPhoto = photo.id

			const tabName = isString(currentFeature.title)
				? currentFeature.title
				: currentFeature.title.desk
			const contentInfo = photo.content[$device$.isMobile ? 'mobile' : 'desk']
			const title = /*contentInfo.slug || */ contentInfo.title
			if (!lstMudouPoster || lstMudouPoster !== title) {
				lstMudouPoster = title
				if (!localStorage.getItem('menuAction')) {
					registerTrack('AboutPage_MudouPoster', normatize(title), normatize(tabName))
				} else localStorage.removeItem('menuAction')
			}
		}
	}

	const nextPhoto = (feature, index) => {
		const photoIndex = getPhotoIndexByAccordion(feature, selectedPhoto)

		console.log(`next: ${index + 1}`)

		// when is last photo
		// should go to next feature and first photo
		if (photoIndex === currentFeature.gallery.photos.length - 1) {
			if (index === features.length - 1) return

			currentFeature = features[index + 1]
			swiperActivatedIndex = 0
			$device$.isMobile ? accordionEl.nextAccordion() : activeTabBy(currentFeature)

			nextPrev = 0

			return
		}

		currentFeature = feature
		let nextPhotoIndex = photoIndex + 1

		if (!feature.gallery.photos[nextPhotoIndex]) {
			nextPhotoIndex = 0
		}

		nextPrev = nextPhotoIndex

		gotoPhoto(feature.gallery.photos[nextPrev])
		swiperEl && swiperEl.goto(nextPrev)
	}

	const prevPhoto = (feature, index) => {
		currentFeature = feature
		const photoIndex = getPhotoIndexByAccordion(feature, selectedPhoto)

		console.log(`prev: ${index - 1}`)

		let prevPhotoIndex = photoIndex - 1

		if (!feature.gallery.photos[prevPhotoIndex]) {
			prevPhotoIndex = feature.gallery.photos.length - 1
			// should back to before feature
			currentFeature = features[index - 1]
			swiperActivatedIndex = prevPhotoIndex
			$device$.isMobile ? accordionEl.prevAccordion() : activeTabBy(currentFeature)

			nextPrev = 0

			return
		}

		nextPrev = prevPhotoIndex

		gotoPhoto(feature.gallery.photos[nextPrev])
		swiperEl && swiperEl.goto(nextPrev)
	}

	const activeTabBy = (feature) => {
		swiperActivatedIndex = 0
		tabEl.selectByTab(feature.id)
		const title = isString(feature.title) ? feature.title : feature.title.desk
		if ($device$.isMobile) {
			registerTrack('AboutPage_ClicouTabMobile', normatize(title))
		}
		$activatedTab$ = feature.name
	}

	// Tab | Accordion change bindings
	const onChangeFeatureUpdateCurrent = (id) => {
		swiperActivatedIndex = 0
		const feature = (currentFeature = getFeatureBy(id))
		const photo = feature.gallery.photos[0]
		gotoPhoto(photo)
	}

	$: getNextPhotoTitle = (feature, featureIndex) => {
		const photoIndex = getPhotoIndexByAccordion(feature, selectedPhoto)

		// when is last photo
		// should show the title of first photo of the next feature
		if (photoIndex === currentFeature.gallery.photos.length - 1) {
			if (featureIndex === features.length - 1) return ''

			return features[featureIndex + 1].gallery.photos[0].content[
				$device$.isMobile ? 'mobile' : 'desk'
			].title
		}

		return features[featureIndex].gallery.photos[photoIndex + 1].content[
			$device$.isMobile ? 'mobile' : 'desk'
		].title
	}

	$: isPicture = (feature) => {
		return !getSelectedPhotoBy(feature).isVideo
	}

	onMount(() => {
		//get fisrt selected accordion
		if ($device$.isMobile) {
			selectedAccordion = accordionEl.getSelectedAccordion()
		}
	})
</script>

<style>
	
	:global(.feature-fold) {
		:global(.opacity-40) {
			background: #f5acb0;
		}

		:global(.tab) {
			background: #AF0B11;
			border-color: transparent;
		}

		:global(.nav-feature) {
			:global(button) {
				border-radius: 20px;
				min-width: 178px;
				
				&:hover {
					border-color: transparent;
				}
			}
		}

		:global(.feature-tabs) {
			width: calc(1020px + 1.5rem);
			@apply px-0;
			@apply lg:px-6;

			:global(.tabs-content) {
				height: 360px;

				:global(picture) {
					img {
						border-radius: 8px;
					}
				}

				.content-title {
					font-size: 40px;
					line-height: 40px;
					min-height: 88px;
				}

				.content-subtitle {
					color: #707070;
				}

				:global(.tabs-bulletlist) {
					padding: 0;

					:global(.grid) {
						gap: 0;
					}
				}
			}
		}

		:global(.nav-feature-mobile) {
			:global(button.accordion div) {
				color: #000 !important;
				@apply text-xl font-light;
				border-bottom: 1px dotted #FD1330 !important;
			}

			:global(.BulletList button i) {
				&.left, 
				&.right {
					color: #fff;
				}

				&.left {
					&::before {
						content: "";
						width: 50px;
						height: 24px;
						background: var(--secondary-default);
						display: block;
						position: absolute;
						top: -3px;
						left: -24px;
						border-top-right-radius: 20px;
						border-bottom-right-radius: 20px;
					}
				}

				&.right {
					&::before {
						content: "";
						width: 50px;
						height: 24px;
						background: var(--secondary-default);
						display: block;
						position: absolute;
						top: -3px;
						right: -24px;
						border-top-left-radius: 20px;
						border-bottom-left-radius: 20px;
					}
				}
			}

			:global(.accordion-button) {
				padding-left: 0;
			}
		}
	}

	@screen lg {
		:global(.feature-fold) {

		}
	}

	:global(.FeatureFold) {
		/* background: #212121; */
		& :global(.Tab) {
			&::after {
				content: '';
				@apply absolute inset-0 h-full;
				left: -10%;
				width: 115%;
				/* background: #212121; */
			}
		}

		& :global(.Tab-nav) {
			&::after {
				content: '';
				@apply absolute w-full h-4 -bottom-4;
			}

			& :global(.selected:not(:first-child)) {
				@apply -ml-px;
				/* width: calc(100% + 1px); */
			}
		}
	}

	.text-gray{
		color: #EBECEE;
	}

	:global(.nav-selected) {
		color: #e1412d;
		background: #fff !important;
		border-color: #fff !important;
		
		span {
			font-weight: 500;
		}
	}

	.selected span{
		color: var(--secondary-color);
	}

	header {
		&::after {
			content: '';
			@apply absolute inset-0 h-full w-full;
			background-color: #fff;
			height: auto;
		}
	}

	@screen lg {
		header {
			&::after {
				height: 292px;
				background-color: #E21017;
			}
		}
	}

	/* h6::before {
		content:'';
		background: url(/static/citroen-chevron-white.svg);
		position: absolute;
		left: 0;
		top: 0;
		transform: rotateY(180deg);
		z-index: 1;
	}
	h6::after {
		content:'';
		background: url(/static/citroen-chevron-white.svg);
		position: absolute;
		right: 0;
		top: 0;
		z-index: 1;
	} */

/* @screen lg {
	.seta-esquerda {
		display: none;
	}
	.seta-direita {
		right: -180px;
	}
} */
	.seta-esquerda {
		left: -220px;
		top: 0;
		position: absolute;
		width: 240px;
		transform: rotateY(180deg);
		z-index: 1;
		display: none;
	}

	@screen lg {
		.seta-esquerda {
			display: block;
		}
	}

	.seta-direita {
		right: -288px;
		position: absolute;
		width: 320px;
		z-index: 1;
	}

	@screen lg {
		.seta-direita {
			width: 240px;
			right: -100px;
		}
	}

</style>

<Anchor
	name="FeatureFold"
	track="tudo-do-c4-cactus"
	class="feature-fold"
>
	<div class="relative Cover"></div>
	<!-- <header class="relative py-10 sm:pt-8 sm:flex">
			<img class="seta-direita" src="./static/citroen-chevron-white.svg" alt="seta-direita"/>
			<h6
				class="relative z-10 text-xl text-left text-white uppercase w-10/12 mx-auto sm:text-center sm:text-2xl sm:text-trinary --bg-default leading-8 sm:text-left citroen"
			>
				{#if $device$.isMobile}
					<strong>VEJA O QUE MAIS O SUV <br />CITROËN C4 CACTUS TEM</strong>
					<span class="w-16 h-1 bg-secondary mt-2 block"></span>
				{:else}
					<div class="container-title mb-12">
						<span class="relative text-white citroen citroen-500">VEJA O QUE MAIS O SUV CITROËN C4 CACTUS TEM <span class="block h-2 border-b-2 w-1/12 sm:mx-auto" style="border-color: #E1412D"></span></span>
					</div>
				{/if}
				<img class="seta-esquerda" src="./static/citroen-chevron-white.svg" alt="seta-esquerda"/>
			</h6>
	</header> -->

	<header class="relative py-0 lg:py-10 sm:pt-8 sm:flex">
		{#if $device$.isMobile}
			<img class="seta-direita" src="./static/citroen-chevron-red.svg" alt="seta-direita"/>
		{:else}
			<img class="seta-direita" src="./static/citroen-chevron-white.svg" alt="seta-direita"/>
		{/if}
		<h6
			class="relative z-10 text-2xl text-left text-black lg:text-white uppercase w-full lg:w-10/12 mx-auto sm:text-center sm:text-2xl sm:text-trinary --bg-default leading-8 sm:text-left px-4 lo:px-0 citroen"
		>
			{#if $device$.isMobile}
				<strong>VEJA O QUE MAIS O SUV <br />CITROËN C4 CACTUS TEM</strong>
				<!-- <span class="w-16 h-1 bg-secondary mt-2 block"></span> -->
			{:else}
				<div class="container-title mb-24">
					<span class="relative text-white citroen citroen-500">veja mais sobre o C4 Cactus:</span>
				</div>
			{/if}
			{#if $device$.isMobile}
				<img class="seta-esquerda" src="./static/citroen-chevron-red.svg" alt="seta-esquerda"/>
			{:else}
				<img class="seta-esquerda" src="./static/citroen-chevron-white.svg" alt="seta-esquerda"/>
			{/if}
		</h6>
	</header>

	<!-- MOBILE -->
	{#if $device$.isMobile}
		<Accordions
			class="nav-feature-mobile"
			bind:this="{accordionEl}"
			on:change="{(evt) => {
				gotoAccordion(evt)
				// onChangeFeatureUpdateCurrent(evt.detail)
			}}"
		>
			<Accordions.Nav class="pb-8">
				{#each features as feature, index}
					<Accordions.Feature
						open="{selectedAccordion === feature.id}"
						on:accordionPrev="{accordionEl.prevAccordion}"
						on:accordionNext="{accordionEl.nextAccordion}"
						{...{ features, feature, index }}
					/>
				{/each}
			</Accordions.Nav>
		</Accordions>

		<!-- DESK -->
	{:else}
		<Tabs
			bind:this="{tabEl}"
			class="relative w-full pb-16 mx-auto feature-tabs"
			on:change="{(evt) => onChangeFeatureUpdateCurrent(evt.detail)}"
		>
			<Tabs.Nav class="z-10 -top-20 relative nav-feature">
				{#each features as feature, index}
					<Tabs.Button
						class="{feature.name} py-0 mr-4 text-lg {hoveringTabId === feature.id && 'text-white'} {currentFeature.id === feature.id ? 'nav-selected' : 'text-white'}"
						tab="{feature.id}"
						on:click="{(evt) => activeTabBy(feature)}"
					>
						<span class="block w-full citroen citroen-300 {index < features.length - 1 && 'border-rxxx'}"
						>
							{isString(feature.title) ? feature.title : feature.title.desk}
						</span>
					</Tabs.Button>
				{/each}
			</Tabs.Nav>

			<!-- <div class="absolute inset-x-0 top-0 grid grid-cols-{features.length} justify-center h-12">
				{#each features as feature}
					<div
						class="relative z-20 flex items-end h-full cursor-pointer group"
						on:mouseover="{() => (hoveringTabId = feature.id)}"
						on:mouseout="{() => (hoveringTabId = '')}"
						on:click="{(evt) => activeTabBy(feature)}"
					>
						<button
							class="focus:outline-none w-full h-2 py-1 absolute inset-x-0 -bottom-1 mx-auto citroen uppercase transition-colors duration-300` {currentFeature.id === feature.id && 'bg-secondary'}"
						></button>
					</div>
				{/each}
			</div> -->

			{#each features as feature, featureIndex}
				<Tabs.Content class="relative -top-10 z-10 tabs-content">
					<Swiper
						class="overflow-hidden"
						bind:this="{swiperEl}"
						items="{feature.gallery.photos}"
						let:prop="{item}"
						on:swipe="{({ detail: { index, end } }) => {
							if (end && index === currentFeature.gallery.photos.length - 1) {
								if (featureIndex === features.length - 1) return
								activeTabBy(features[featureIndex + 1])
								return
							}
							gotoPhoto(feature.gallery.photos[index])
							swiperActivatedIndex = index
							//registerTrack('AboutPage_Swipe')
						}}"
					>
						<Swiper.Item index="{item.index}" class="w-full grid grid-cols-2">
							{#if item.data.isVideo}
								<Video
									class="w-full"
									workDir="{feature.gallery.workDir}"
									fold="{5}"
									name="{item.data.name}"
									ratio="{0.704}"
								/>
							{:else}
								<Picture
									class="block w-full"
									loading="lazy"
									fold="{5}"
									waitUntil="{item.isSwiped}"
									name="{item.data.name}"
									workDir="{feature.gallery.workDir}"
									resolutions="{['2x']}"
									devices="{{ desk: true }}"
									ext="jpg"
									let:prop="{imageData}"
								>
									<img
										class="w-full translate-opacity duration-300 {item.index !== swiperActivatedIndex && 'opacity-70'}"
										src="{imageData.src}"
										alt="{item.data.content.desk.title}"
									/>
								</Picture>
							{/if}

							<!-- DESCRIPTION -->
							<div class="flex flex-col justify-between w-full lg:w-11/12 pl-10">
								{#if getSelectedPhotoBy(feature)}
									{#key swiperActivatedIndex}
										<div in:fade="{{ delay: 1000 }}" class="flex flex-col">
											<p class="mb-4 text-xl text-white tracking-wide citroen citroen-500 leading-6 content-title">
												{@html getSelectedPhotoBy(feature).content.desk.title}
											</p>
											{#if getSelectedPhotoBy(feature).content.desk.subtitle}
												<p class="text-sm text-white font-bold text-light-gray leading-5">
													{@html getSelectedPhotoBy(feature).content.desk.subtitle}
												</p>
											{/if}
											<p class="text-lg text-white citroen citroen-300 leading-5 content-subtitle">
												{@html getSelectedPhotoBy(feature).content.desk.description}
											</p>
											{#if getSelectedPhotoBy(feature).content.desk.ctaText}
												<Button
													to="{getSelectedPhotoBy(feature).content.desk.ctaLink}"
													isBlank
													class="w-10/12 px-6 py-4 mt-8 text-xs font-extrabold text-center text-white rounded-md bg-secondary"
													label="{getSelectedPhotoBy(feature).content.desk.ctaText}"
													on:click="{() => {
														const tabName = isString(feature.title) ? feature.title : feature.title.desk
														const deskInfo = getSelectedPhotoBy(feature).content.desk
														registerTrack('AboutPage_ContentButton', tabName, normatize(deskInfo.ctaTrack), normatize(deskInfo.ctaText))
													}}"
												/>
											{/if}
										</div>
									{/key}
								{/if}
								
								<!-- <BulletList
									class="w-3/12 mx-auto absolute bottom-12 -ml-2 mb-3 tabs-bulletlist"
									items="{feature.gallery.photos}"
									activedIndex="{swiperActivatedIndex}"
									controlArrows="{false}"
									on:prev="{() => prevPhoto(feature.id)}"
									on:next="{() => nextPhoto(feature.id)}"
									on:index="{({ detail: index }) => {
										gotoPhoto(feature.gallery.photos[index])
										swiperEl && swiperEl.goto(index)
									}}"
								/> -->

								<!-- ARROWS CONTROLS -->
								<!-- {#if feature.gallery.photos.length > 1}
									<ArrowControl nextTooltip="{getNextPhotoTitle(feature, featureIndex)}">
										<ArrowControl.Prev
											disabled="{item.index === 0 && featureIndex === 0}"
											on:click="{() => {
												const tabName = isString(feature.title) ? feature.title : feature.title.desk
												const title = getSelectedPhotoBy(feature).content.desk.slug
												registerTrack('AboutPage_ArrowPrevPoster', normatize(tabName) /*, normatize(title)*/)
												prevPhoto(feature, featureIndex)
											}}"
										/>
										<ArrowControl.Next
											disabled="{item.index === feature.gallery.photos.length - 1 && featureIndex === features.length - 1}"
											on:click="{() => {
												const tabName = isString(feature.title) ? feature.title : feature.title.desk
												const title = getSelectedPhotoBy(feature).content.desk.slug
												registerTrack('AboutPage_ArrowNextPoster', normatize(tabName) /*, normatize(title)*/)
												nextPhoto(feature, featureIndex)
											}}"
										/>
									</ArrowControl>
								{/if} -->
							</div>
						</Swiper.Item>
						

						<div class="absolute bottom-0 ml-80 left-56">
							<BulletList
									class="w-3/12 mx-auto absolute bottom-12 -ml-2 mb-3 tabs-bulletlist"
									items="{feature.gallery.photos}"
									activedIndex="{swiperActivatedIndex}"
									controlArrows="{false}"
									on:prev="{() => prevPhoto(feature.id)}"
									on:next="{() => nextPhoto(feature.id)}"
									on:index="{({ detail: index }) => {
										gotoPhoto(feature.gallery.photos[index])
										swiperEl && swiperEl.goto(index)
									}}"
								/>

								<!-- ARROWS CONTROLS -->
								{#if feature.gallery.photos.length > 1}
									<ArrowControl nextTooltip="{getNextPhotoTitle(feature, featureIndex)}">
										<ArrowControl.Prev
											disabled="{nextPrev === 0 && featureIndex === 0}"
											on:click="{() => {
												const tabName = isString(feature.title) ? feature.title : feature.title.desk
												const title = getSelectedPhotoBy(feature).content.desk.slug
												registerTrack('AboutPage_ArrowPrevPoster', normatize(tabName) /*, normatize(title)*/)
												prevPhoto(feature, featureIndex)
											}}"
										/>
										<ArrowControl.Next
											disabled="{nextPrev === feature.gallery.photos.length - 1 && featureIndex === features.length - 1}"
											on:click="{() => {
												const tabName = isString(feature.title) ? feature.title : feature.title.desk
												const title = getSelectedPhotoBy(feature).content.desk.slug
												registerTrack('AboutPage_ArrowNextPoster', normatize(tabName) /*, normatize(title)*/)
												nextPhoto(feature, featureIndex)
											}}"
										/>
									</ArrowControl>
								{/if}
						</div>
					</Swiper>
					

					<!-- BULLETS -->
					<!-- <BulletList
						class="w-3/12 mx-auto"
						items="{feature.gallery.photos}"
						activedIndex="{swiperActivatedIndex}"
						controlArrows="{false}"
						on:prev="{() => prevPhoto(feature.id)}"
						on:next="{() => nextPhoto(feature.id)}"
						on:index="{({ detail: index }) => {
							gotoPhoto(feature.gallery.photos[index])
							swiperEl && swiperEl.goto(index)
						}}"
					/> -->
				</Tabs.Content>
			{/each}
		</Tabs>
	{/if}
</Anchor>
