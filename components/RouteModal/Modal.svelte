<script>
	import { onMount } from 'svelte'
	import { fly, fade } from 'svelte/transition'
	import { registerTrack } from '~/components/DataLayer/Track.svelte'
	import { Icon, Swiper, Button, Picture, BulletList, ArrowControl, Audio, Tabs } from '../'
	import { goto, device as device$, query as q } from '~/lib'
	export let name
	export let data
	export let currentIndex
	let bodyEl
	let tabEl
	const onClose = () => {
		bodyEl.classList.remove('is-modal-open')
	}
	onMount(() => {
		bodyEl = q('body')
		bodyEl.classList.add('is-modal-open')

		//REMOVING MODAL ITEM
		data = data.filter(item => item.title != 'Avaliações')
	})

	const flyIntoDevice = (node) => {
		return $device$.isMobile ? fly(node, { x: 200 }) : fly(node, {})
	}
	// to improviment CLS
	let calculedImageSize = false
	const routeModal = {
		selectedIndex() {
			const selectedIndex = currentIndex
			if (selectedIndex !== -1) {
				return selectedIndex
			}
			return false
		},
		have(index) {
			if (data[index]) {
				return Boolean(data[index])
			}
			return false
		},
		getRouteNameBy(index) {
			if (!this.have(index)) {
				return ''
			}
			return data[index].route
		},
		getNextTitleByCurrent() {
			const selectedIndex = currentIndex
			let nextIndex = selectedIndex + 1
			if (!this.have(nextIndex)) {
				nextIndex = 0
			}
			return data[nextIndex].title
		},
		goto(nextIndex) {
			if (!this.have(nextIndex)) {
				nextIndex = 0
			}
			const route = this.getRouteNameBy(nextIndex)
			name = route
			goto(route)
		},
		next() {
			const index = this.selectedIndex()
			let nextIndex = index + 1
			const route = this.getRouteNameBy(nextIndex)
			registerTrack('Modal_ClicouProximo', route, nextIndex)
			this.goto(nextIndex)
			return nextIndex
		},
		prev() {
			const index = this.selectedIndex()
			let prevIndex = index - 1
			const route = this.getRouteNameBy(prevIndex)
			registerTrack('Modal_ClicouAnterior', route, prevIndex)
			this.goto(prevIndex)
			return prevIndex
		}
	}
</script>

<style>
	.feature-modal {
		width: 100%;
		:global(.nav-feature) {
			:global(button) {
				min-width: 138px;
				border-width: 3px;
				border-radius: 20px;
				font-size: 15px;
				margin-right: 4px;
				background: #fff;
				border-color: #fff;

				&.tab-selected {
					background: #E21017;
					border-color: #E21017;
					@apply text-white;
				}
			}
		}

		:global(header) {
			:global(i) {
				&::after,
				&::before {
					@apply bg-secondary;
				}
			}
		}

		.modal-header {
			height: 170px;
		}

		:global(.modal-swiper) {
			:global(picture) {
				:global(img) {
					border-radius: 0px;
				}
			}

			:global(h1) {
				height: 60px;
				@apply text-3xl;
				font-weight: 300;
			}
		}

		:global(.modal-bullet) {
			z-index: 10;

			:global(.grid) {
				gap: 2 !important;
			}
		}

		.modal-tabs {
			display: none;
		}
	}

	@screen lg {
		.feature-modal {
			width: 1010px;

			.modal-tabs {
				display: block;
			}

			:global(header) {
				:global(i) {
					&::after,
					&::before {
						background: #fff;
					}
				}
			}
		}

		:global(.modal-swiper) {
			:global(picture) {
				:global(img) {
					border-radius: 8px;
				}
			}
		}

		:global(.modal-bullet) {
			padding-bottom: 60px;
    	margin-left: -28px;
			display: flex;
			justify-content: flex-start;

			:global(.grid) {
				gap: 0 !important;
			}
		}
	}

	@screen xl {
		.feature-modal {
			width: 1120px;
		}
	}
</style>

<div
	transition:flyIntoDevice
	class="absolute inset-0 top-0 mx-auto bg-tabColor sm:inset-x-0 xl:w-7/12 sm:w-8/12 sm:mt-10 sm:h-5/6 xl:h-3/6 feature-modal" style="min-height: 500px"
>
	<div class="relative flex flex-col h-full">
		<!-- DESK TEXTURE COVER -->
		{#if $device$.isDesk}
			<div class="absolute inset-0 left-0 w-full h-24 modal-header" style="background-color: black"></div>
		{/if}

		<header class="relative flex justify-start border-0 bg-transparent sm:justify-end">
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
				<Icon.Close color="var(--secondary-default)" />
			</Button>

			<span class="pt-3 sm:hidden inline-block" style="color: var(--secondary-default)" on:click="{() => {
				registerTrack('Modal_Fechou_WithTitle', data[currentIndex].route)
				onClose()
				goto('')
			}}">Fechar</span>


			<!-- {JSON.stringify(data, null, 2)} -->
			<div class="absolute w-full pt-10 text-white z-20 modal-tabs">
				<Tabs
					bind:this="{tabEl}"
				>
				
					<Tabs.Nav class="z-10 nav-feature text-black w-11/12 m-auto">

						{#each data as tab, index}
							{#if tab.route !== "avaliacoes"}
								<Tabs.Button
									on:click="{() => {
										goto(tab.route)
									}}"
									class="{tab.route === routeModal.getRouteNameBy(currentIndex) ? 'tab-selected' : 'xpto'}"
								>
									<span class="block w-full citroen citroen-300 text-md"
									>
										{tab.title}
										<!-- - yyy: {@html data[currentIndex].desk.title} - xxx: {routeModal.getRouteNameBy(currentIndex)} -->
									</span>
								</Tabs.Button>

									<!-- {JSON.stringify(tab.route, null, 2)} -->
									<!-- class="{tab.route === routeModal.getRouteNameBy(currentIndex) ? 'tab-selected' : 'xpto'}" -->
							{/if}
						{/each}

					</Tabs.Nav>
					
				</Tabs>
			</div>

		</header>

		<Swiper
			class="z-10 sm:grid sm:grid-cols-2 sm:gap-1 sm:w-11/12 sm:mx-auto pt-0 lg:pt-16 modal-swiper"
			on:swipe="{({ detail: { next, prev } }) => {
				next && routeModal.next()
				prev && routeModal.prev()
			}}"
		>
			<div class="relative flex justify-center items-between">
				<!-- POSTER -->
				<Picture
					class="block w-full"
					modal="{data[currentIndex].photo.workDir}"
					name="{data[currentIndex].photo.name}"
					devices="{{ desk: true, mobile: true }}"`
					ext="jpg"
					ratio="{0.6773049645}"
					on:ratio="{() => (calculedImageSize = true)}"
					let:prop="{imageData}"
				>
					<img
						class="w-full"
						src="{imageData.src}"
						alt="{data[currentIndex].photo.title}"
					/>
				</Picture>

				<!-- AUDIO -->
				{#if data[currentIndex].withSound}
					<Audio
						class="absolute inset-y-0 flex flex-col items-center w-9/12 h-full cursor-pointer sm:w-11/12 sm:pr-2 sm:top-auto sm:h-auto justify-evenly sm:justify-end sm:bottom-0 sm:right-0 sm:flex-row"
						name="motor"
						btnOn="btn-on"
						btnOff="btn-off"
						label="TOQUE PARA OUVIR A POTÊNCIA"
					/>
				{/if}
			</div>

			{#if calculedImageSize}
				<div
					in:fade="{{ delay: 300 }}"
					class="lg:relative flex flex-col justify-start w-11/12 h-56 mx-auto text-left sm:h-full text-primary sm:text-left h-full"
				>

					
				
					<!-- TITLE -->
					<h1 class="mb-2 text-3xl leading-7 citroen sm:mt-0 text-white">
						{#if $device$.isDesk}
							{@html data[currentIndex].desk.title}
						{:else}
						{@html data[currentIndex].mobile.title}
						{/if}
					</h1>

					<!-- DESCRIPTION -->
					<p class="mb-12 leading-5 text-light-gray citroen citroen-300 text-xl">
						{#if $device$.isDesk}
							{@html data[currentIndex].desk.description}
						{:else}
							{@html data[currentIndex].mobile.description}
						{/if}
					</p>

					<!-- ARROWS CONTROLS -->
					{#if $device$.isDesk}
						<ArrowControl class="mt-auto z-50"
							nextTooltip="{data.length - 1 > currentIndex && routeModal.getNextTitleByCurrent()}"
						>
								<ArrowControl.Prev
								 class="rounded-full"
									disabled="{currentIndex === 0}"
									on:click="{() => routeModal.prev()}"
								/>
								<ArrowControl.Next
								 class="rounded-full"
									disabled="{currentIndex === data.length - 1}"
									on:click="{() => routeModal.next()}"
								/>
						</ArrowControl>
					{/if}

					<!-- BULLETS -->
						<BulletList
						class="absolute inset-x-0 bottom-0 justify-center grid grid-flow-col col-span-2 sm:flex xl:absolute modal-bullet"
						items="{data}"
						controlArrows="{$device$.isMobile}"
						activedIndex="{currentIndex}"
						nextLabel="{routeModal.getNextTitleByCurrent()}"
						on:prev="{() => routeModal.prev()}"
						on:next="{() => routeModal.next()}"
						on:index="{({ detail: index }) => {
							registerTrack('Modal_ClicouBullet', data[currentIndex].route, index)
							routeModal.goto(index)
						}}"
					/>
				</div>
			{/if}
		</Swiper>
	</div>
</div>