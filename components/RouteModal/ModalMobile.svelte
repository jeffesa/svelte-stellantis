<script>
	import { onMount } from 'svelte'
	import { Icon, Swiper, Button, Picture, BulletList, ArrowControl, Audio, Tabs } from '../'
	import { goto, device as device$, query as q } from '~/lib'
	export let data
	export let opened = null
	export let bodyEl
	export let name

	const onClose = () => {
		bodyEl.classList.remove('is-modal-open')
	}
	onMount(() => {
		bodyEl = q('body')
		bodyEl.classList.add('is-modal-open')
		opened = name

		//REMOVING MODAL ITEM
		data = data.filter(item => item.title != 'Avaliações')
	})

	function isOpen(tab) {
		if (opened == tab) {
			opened = null
		} else {
			opened = tab
		}
	}

</script>

<style>
	.nav-modal-mobile {
		background: #fff;

		.nav-items {
			:global(i) {
				@apply text-secondary;
				&::after {
					position: relative;
					width: 8px;
					height: 8px;
					border-bottom: 1px solid;
					border-left: 1px solid;
					top: 0px;
				}
			}

			:global(li button) {
				border-bottom: 1px dotted #fd1330 !important;
				outline: 0;
			}
		}

		.text-description {
			position: relative;

			&::before {
				content: "";
				width: 100%;
				height: 10px;
				position: absolute;
				bottom: -17px;
				left: 0;
				border-bottom: 1px dotted #fd1330 !important;
			}
		}
	}
</style>

<div class="nav-modal-mobile h-full flex">
	<nav class="flex flex-col items-start pb-8 w-full" role="navigation">
		<div class="flex justify-end w-full bg-black">
			<!-- Close Button -->
				<Button
				style="background-color: #212121"
				class="z-50 p-3 inline-block"
				on:click="{() => {
					onClose()
					goto('')
				}}"
			>
				<Icon.Close color="var(--white)" />
			</Button>
		</div>
		<ul class="w-full nav-items overflow-auto">
			{#each data as tab, i }
				<li on:click={() => isOpen(tab.route)} >
					<button class="flex w-11/12 {opened == tab.title.split(' ').join('-').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '') ? 'py-0' : 'py-0'} pl-0 lg:pl-4 m-auto border-b-2 items-center">
						<Icon.Chevron type="{opened == tab.title.split(' ').join('-').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '') ? 'up' : 'down'}" class="mr-4 relative top-1 animate" />
						<span class="citroen citroen-300 text-xl py-4 pl-0 lg:pl-4">{tab.title}</span>
					</button>
					
					{#if opened == tab.route}
						<div class="w-full m-auto grid gap-4 col-start-1 row-start-1 col-end-2 row-end-2">
							<Picture
								class="block w-full"
								modal="{tab.photo.workDir}"
								name="{tab.photo.name}"
								devices="{{ desk: true, mobile: true }}"`
								ext="jpg"
							/>
							<p class="px-4 mb-4 leading-5 text-light-gray citroen citroen-300 text-xl text-description">
								{tab.mobile.description}
							</p>
						</div>
					{/if}
				</li>
			{/each}
	</ul>
	</nav>
</div>