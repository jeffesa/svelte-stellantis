<style lang="postcss">
</style>

<template>
	<!--
	| TAB
	'-->
	<AccordionButton
		class="w-full font-bold text-white"
		name={feature.name}
		opened={show || internalOpen}
		accordion={feature.id}
		drawLine={index < features.length - 1}
		label={feature.title.mobile}
		on:click={onClickTab(feature.title.mobile)}
	/>

	<!--
	| CONTENT
	'-->
	<AccordionContent class="relative bg-white" show={show || internalOpen}>
		<!-- GALLERY -->
		<Swiper
			let:prop={item}
			bind:this={swiperEl}
			items={feature.gallery.photos}
			on:swipe={onSwipePhoto}>
			<Swiper.Item
				class="relative w-full"
				index={item.index}>
				{#if item.data.isVideo}
					<Video
						class="w-full mb-24"
						workDir={feature.gallery.workDir}
						fold={5}
						name={item.data.name}
						ratio={0.704}
						on:ratio={onRatio}
					/>
				{:else}
					<Picture
						class="block w-full"
						let:prop={imageData}
						waitUntil={item.isSwiped}
						name={item.data.name}
						workDir={feature.gallery.workDir}
						resolutions={['2x']}
						devices={{ mobile: true }}
						ratio={0.704}
						loading="lazy"
						fold={5}
						ext="jpg"
						on:ratio={onRatio}>
						<img
							class="w-full"
							src={imageData.src}
							alt={item.data.content.mobile.title}
						/>
					</Picture>
				{/if}

				{#if selectedPhoto && selectedPhoto.content && selectedPhoto.content.mobile}
					<div
						class="w-10/12 m-auto my-6 {
							feature.gallery.photos.length > 1 ? 'mt-16' : 'mt-8'
						} grid gap-4 col-start-1 row-start-1 col-end-2 row-end-2">
						<p class="text-xl tracking-wider text-left citroen citroen-500 leading-6" style="color: #262626">
							{@html selectedPhoto.content.mobile.title}
						</p>
						{#if selectedPhoto.content.desk.subtitle}
						<p class="font-bold text-center citroen citroen-300 text-normal leading-5" style="color: #424242">
							{@html selectedPhoto.content.desk.subtitle}
						</p>
						{/if}
						<p class="text-left text-lg text-gray leading-5 citroen citroen-100">
							{@html selectedPhoto.content.mobile.description}
						</p>
						{#if selectedPhoto.content.mobile.ctaText}
							<Button
								class="w-9/12 px-6 py-4 mt-4 ml-auto mr-auto text-sm font-extrabold text-center text-white rounded bg-secondary"
								to={selectedPhoto.content.mobile.ctaLink}
								label={selectedPhoto.content.mobile.ctaText}
								isBlank
								on:click={onClickCTA}
							/>
						{/if}
					</div>
				{/if}
			</Swiper.Item>
		</Swiper>

		<!-- BULLETS -->
		<BulletList
			class="absolute inset-x-0 w-full"
			style="top: {mediaHeight}px;"
			items={feature.gallery.photos}
			activedIndex={currentIndex}
			on:prev={onClickPhotoPrev}
			on:next={onClickPhotoNext}
			on:index={onClickPhotoBullet}
		/>
	</AccordionContent>
</template>

<script>
	import { onMount, createEventDispatcher } from 'svelte';
	import { registerTrack } from '~/components/DataLayer/Track.svelte';
	import { isString, device } from '~/lib';
	import { Picture, Video, Swiper, Button, BulletList } from '~/components';
	import AccordionButton from './AccordionButton.svelte';
	import AccordionContent from './AccordionContent.svelte';

	export let open = false;
	export let startAt = 0;
	export let features;
	export let feature;
	export let index;

	const dispatch = createEventDispatcher();
	let show = false;
	let selectedPhoto;
	let lastIndex = startAt;
	let currentIndex = startAt;
	let swiperEl;
	let mediaHeight = 0;
	let internalOpen = false

	$: if (open) {
		show = true
		internalOpen = true
	}

	// Methods
	// =======

	const getPhotoById = (photoId) => {
		return feature.gallery.photos.findIndex((photo) => photo.id === photoId);
	};

	const getSelectedPhoto = (photoId = 0) => {
		const photo = feature.gallery.photos[photoId] || { id: {} };
		const photoIndex = getPhotoById(photoId || photo.id);
		return feature.gallery.photos[photoIndex];
	};

	let lstMudouPoster;
	const gotoPhoto = (photoIndex, update = true) => {
		if (photoIndex > feature.gallery.photos.length - 1) {
			const end = index < features.length - 1;
			const last = feature.gallery.photos[feature.gallery.photos.length - 1];
			return end && dispatch('accordionNext', last);
		} else if (photoIndex < 0) {
			const beginning = index > 0;
			const first = feature.gallery.photos[0];
			return beginning && dispatch('accordionPrev', first);
		}

		selectedPhoto = feature.gallery.photos[photoIndex];

		const tabName = isString(feature.title) ? feature.title : feature.title.desk;
		const title = selectedPhoto.content[$device.isMobile ? 'mobile' : 'desk'].slug;
		if (!lstMudouPoster || lstMudouPoster !== title) {
			lstMudouPoster = title;
			if (!localStorage.getItem('menuAction')) {
				registerTrack('AboutPage_MudouPoster', title, tabName);
			} else localStorage.removeItem('menuAction');
		}

		lastIndex = currentIndex;
		currentIndex = photoIndex;
		update && swiperEl && swiperEl.goto(photoIndex);
	};

	const prevPhoto = (id) => {
		if (currentIndex > 0) {
			gotoPhoto(--currentIndex);
		} else gotoPhoto(currentIndex - 1);
	};

	const nextPhoto = (id) => {
		if (currentIndex < feature.gallery.photos.length - 1) {
			gotoPhoto(++currentIndex);
		} else gotoPhoto(currentIndex + 1);
	};


	// Tab events
	// ==========

	const onClickTab = (name) => {
		show = !show;
		internalOpen = show
		registerTrack('AboutPage_ClicouTabMobile', name);
	};


	// Photo events
	// ============

	const onRatio = ({ detail: { height } }) => {
		mediaHeight = height;
	};

	const onSwipePhoto = ({ detail: { index:photoIndex, end, prev } }) => {
		if (photoIndex <= 0 && index > 0 && prev) return dispatch('accordionPrev');
		if (end && photoIndex === feature.gallery.photos.length - 1) {
			if (index === features.length - 1) return;
			return dispatch('accordionNext');
		}
		//registerTrack('AboutPage_Swipe');
		gotoPhoto(photoIndex);
	};

	const onClickCTA = () => {
		const tabName = isString(feature.title) ? feature.title : feature.title.mobile;
		const { ctaTrack, ctaText } = selectedPhoto.content.mobile;
		registerTrack('AboutPage_ContentButton', tabName, ctaTrack, ctaText);
	};


	// BulletList events
	// =================

	const onClickPhotoPrev = () => {
		const tabName = isString(feature.title) ? feature.title : feature.title.desk;
		const title = selectedPhoto.content.desk.slug;
		registerTrack('AboutPage_ArrowPrevPoster', tabName/*, title*/);
		prevPhoto();
	};

	const onClickPhotoNext = () => {
		const tabName = isString(feature.title) ? feature.title : feature.title.desk;
		const title = selectedPhoto.content.desk.slug;
		registerTrack('AboutPage_ArrowNextPoster', tabName/*, title*/);
		nextPhoto();
	};

	const onClickPhotoBullet = ({ detail: bulletIndex }) => {
		gotoPhoto(bulletIndex);
	};


	// Lifecycle
	// =========

	onMount(async () => {
		selectedPhoto = getSelectedPhoto();
		console.log('features:', index, feature);
	});
</script>
