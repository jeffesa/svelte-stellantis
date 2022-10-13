<script>
	import { createEventDispatcher, getContext } from 'svelte'
	import { Button, Icon } from '~/components'
	import { anchors, device as device$, query as q, gotoEl } from '~/lib'
	import { activatedTab$ } from '~/lib/app'
	import { MENU } from './Menu.svelte'

	export let name = ''
	export let tab = ''
	export let label = ''
	export let to = ''
	export let leaf = false
	export let isLast = false
	export let isBlank = false

	const dispatch = createEventDispatcher()
	const { toggle: toggleMenu } = getContext(MENU)

	$: anchor = $anchors ? $anchors.get(name) : null
	$: isAnchored = anchor ? anchor.isActive : false
	$: isTabed = isAnchored && $activatedTab$ === tab

	const goLocation = (href) => {
		window.open(href, '_blank');
	}
</script>

<style>

	.link-menu {
		:global(.text-secondary) {
			:global(i) {
				color: #fff;
				font-weigh: 800;
				background: #E21017;
				width: 60px;
				margin-left: -60px;

				&::after {
					border-bottom: 3px solid;
					border-left: 3px solid;
					margin-left: 36px;
				}
			}
		}
		
		:global(.rounded-button) {
			border-radius: 32px;
			width: calc(100% - 2rem);
			height: 48px;
			width: 100%;
			
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
		.link-menu {
			:global(.rounded-button) {
				width: 100%;
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
			
	.isLast {
		@apply pb-8;
	}

	@screen sm {
		.isLast {
			@apply pb-6;
		}

		:global(.Tab-button) {
			@apply pl-4 text-xs py-1.5;
			color: #8c8b89;

			& li::before {
				content: '\2022';
    		color: var(--secondary-default);
				padding-right: 10px;
			}
		}

		a.Link {
			font-size: 0.65rem;
		}
	}
</style>

<li
	class="pl-7 link-menu"
	class:isLast
	on:click="{(evt) => {
		dispatch('click', evt)

		// is section
		if (!to) {
			const top = Math.ceil(anchor.nearTop) + window.scrollY + 90
			window.scrollTo({ top, behavior: 'smooth' })
		}

		// is tab
		let tabButtonEl;
		if (leaf && tab) {
			tabButtonEl = q(`button.tab.${tab}`) || q(`button.accordion.${tab}`) || q(`button[data-accordion-button="${tab}"][data-accordion-button-opened="false"]`)
			tabButtonEl && tabButtonEl.click()
		}

		// close menu on mobile
		if ($device$.isMobile) {
			if (!tabButtonEl) {
				tabButtonEl = q(`button[data-accordion-button="${tab}"][data-accordion-button-opened="true"]`);
				tabButtonEl && gotoEl(tabButtonEl, { duration: 700 })
			}
			toggleMenu()
		}
	}}"
>
	{#if !to && !tab}
		<Button
			class="text-left hover:text-secondary citroen citroen-500 focus:text-secondary flex text-md items-center py-1 lg:py-1 {isAnchored && 'text-secondary'} {$$props.class}"
		>
			{#if isAnchored} 
				<Icon.Chevron scale="{0.7}" type="right" color="var(--secondary-default)" class="has-icon" />
			{/if}
			
			{label}
		</Button>
	{:else if tab}
			{#if !$device$.isMobile}
			<Button
					class="text-left hover:text-primary active:text-primary flex citroen citroen-300 text-md items-center sm:-ml-1 py-0 {isTabed && 'text-red'} {$$props.class}"
					label="{label}"
				>
				<i class="mr-2 text-black">• </i>
				{label}
			</Button>
			{:else}
			<Button
					class="outline-none withHover focus:outline-none text-left hover:text-secondary citroen citroen-500 focus:text-secondary flex text-md items-center py-2 false text-primary"
					label="{label}"
				>
				<Icon.Chevron scale="{0.7}" type="right" color="var(--secondary-default)" />
				
				{label}
			</Button>
			
			{/if}
			
		
	{:else}
		<div class="rounded-button bg-secondary flex mt-2 -ml-2">
			<Button
				class="px-2 py-4 text-xl lg:text-xl citroen citroen-300 text-left text-white xl:w-full md:w-2/12 sm:w-4/12 w-6/12 sm:py-4 pl-4"
				isBlank="{isBlank}"
				label="{label}"
				to="{to}"
			/>
			<div
				class="cursor-pointer"
				on:click="{() => {
					goLocation(to)
				}}"
			>
			<Icon.Chevron 
				color="var(--secondary-default)" type="right"
			/>
		</div>
		</div>
	{/if}
</li>
