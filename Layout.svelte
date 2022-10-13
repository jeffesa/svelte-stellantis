<script>
	import device$ from './lib/device'
	import Tailwind from './Tailwind.svelte'
	import { registerTrackMap, registerTrack } from './components/DataLayer/Track.svelte'
	import { data as tracks } from './config/tracks'
	import { FirstFold, VdFold, VersionFold, GalleryFold, FeatureFold, CtaMobileFold, TipsFold } from './folds'
	import normatize from './lib/normatize'
	import { Menu, Icon, HeaderMobile, Footer, RouteModal, MenuFixed, WhatsappFold } from './components'
	import { onMount } from 'svelte';
	import * as Sentry from '@sentry/browser'
	import { Integrations } from '@sentry/tracing'

	let toggleComponent

	registerTrackMap(tracks, [$device$.isMobile ? 'mobile' : 'desktop'])
	registerTrack('App_Iniciou')

	try {
		const addTag = (event) => {
			const tags = event.tags ?? {};
			return { ...tags, 'thirdParty': 'tracking' };
		}
		Sentry.init({
  		dsn: "https://5045974816274a8b8c3920df4602ed79@o211911.ingest.sentry.io/6054891",
			integrations: [new Integrations.BrowserTracing()],
			beforeSend(event) {
				const matchRegex = /clarity|doubleclick|analytics|gtm/g;
				if (event.breadcrumbs?.find((b) => matchRegex.test(b?.message ?? ''))) {
					event.tags = addTag(event);
				}
				if (event.stacktrace?.frames?.find((f) => matchRegex.test(f?.module ?? ''))) {
					event.tags = addTag(event);
				}
				return event;
			},

			// Set tracesSampleRate to 1.0 to capture 100%
			// of transactions for performance monitoring.
			// We recommend adjusting this value in production
			tracesSampleRate: 0.05,
		});
	} catch (error) {
		console.log(error);
	}

	const menu = [
		{
			name: 'FirstFold',
			track: 'suv-c4-cactus',
			label: 'SUV Citroën C4 Cactus',
			active: true,
			node: true
		},
		{
			name: 'TipsFold',
			track: 'c4-cactus-x-series',
			label: 'C4 Cactus X-Series',
			active: true,
			node: true
		},
		// {
		// 	name: 'VdFold',
		// 	track: 'pre-venda',
		// 	label: 'PRÉ-VENDA',
		// 	active: true,
		// 	node: true
		// },
		{
			name: 'VersionFold',
			track: 'todas-as-versoes',
			label: 'Todas as Versões',
			active: true,
			node: true
		},
		{
			name: 'GalleryFold',
			track: 'fotos',
			label: 'Fotos',
			active: true,
			node: true
		},
		{
			name: 'FeatureFold',
			track: 'sobre-o-suv-c4-cactus',
			label: 'Sobre o SUV Citroën C4 Cactus',
			active: true,
			node: true
		},
		{
			name: 'FeatureFold',
			tab: 'design-provocante',
			track: 'design-provocante',
			label: 'Design Provocante',
			active: true,
			leaf: true
		},
		{
			name: 'FeatureFold',
			tab: 'interior',
			track: 'interior',
			label: 'Interior',
			active: true,
			leaf: true
		},
		{
			name: 'FeatureFold',
			tab: 'tecnologia',
			track: 'tecnologia',
			label: 'Tecnologia',
			active: true,
			leaf: true
		},
		{
			name: 'FeatureFold',
			tab: 'performance',
			track: 'performance',
			label: 'Performance',
			active: true,
			leaf: true
		},
		{
			name: 'FeatureFold',
			tab: 'seguranca',
			track: 'seguranca',
			label: 'Segurança',
			active: true,
			leaf: true
		},

		{
			name: 'monte_o_seu',
			track: 'monte-o-seu',
			label: 'Monte o seu',
			active: true,
			to: 'https://www.citroenbr.com.br/monte-o-seu/c4-cactus?utm_source=showroom-cactus&utm_medium=menu-showroom-cactus&utm_campaign=showroom-cactus',
			isBlank: true
		},
		{
			name: 'compre_o_seu',
			track: 'compre-o-seu',
			label: 'Compre o seu',
			to: 'https://citroenbr.com.br/formulario/proposta/#sticky',
			active: true,
			isBlank: true
		},
		{
			name: 'ver_concessionarias',
			track: 'concessionaria',
			label: 'Concessionárias',
			to: 'https://www.citroen.com.br/fale-com-a-citroen/concessionarias-citroen.html',
			active: true,
			isBlank: true
		},
		{
			name: 'ofertas_c4-cactus',
			track: 'ofertas-citroen-c4-cactus',
			label: 'Ofertas',
			to: 'https://www.citroenbr.com.br/cactus/ofertas/',
			active: true,
			isBlank: true
		}
	]

	const linksTo = (type) => {
		switch (type) {
			case 'sections':
				return menu.filter((m) => m.active && !m.hasOwnProperty('to'))
			case 'tabs':
				return menu.filter((m) => m.active && m.hasOwnProperty('to'))
			default:
				return []
		}
	}

	const linksToSections = linksTo('sections')
	const linksToTabs = linksTo('tabs')

	onMount(async () => {
		// HOTJAR
		(function(h,o,t,j,a,r){
			h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
			h._hjSettings={hjid:2714186,hjsv:6};
			a=o.getElementsByTagName('head')[0];
			r=o.createElement('script');r.async=1;
			r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
			a.appendChild(r);
		})(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
		//
	});

	onMount(async () => {
		const url = window.location.pathname
		//const anchor = url.substring(url.lastIndexOf("/") + 1)
		const anchor = url.replace(/\//g, '')
		document.querySelector(`.${anchor}`).scrollIntoView({behavior: 'smooth'})
	});
</script>

<style global>
	html,
	body {
		background: theme('colors.white');
	}

	* {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

	.title-version{
		color: #44B0B0;
	}

	.title-version strong{
		display: block;
		color: #262626;
	}

	body.is-modal-open {
		height: 100vh;
		overflow-y: hidden;
	}

	.page-wrap,
	#page-wrap {
		--white: #fff;
		--primary-default: #000000;
		--primary-fg: #000000;
		--secondary-default: #E21017;
		--secondary-fg: #e4b69e;
		--trinary-default: #CCCDCE;
		--trinary-fg: #9d9d9b;
		--trinary-active: #7c7455;
		--modal: #17131f;
		--form: #1c1c18;
		--form-fg: #edede3;
		--form-gray: #d0c7a9;
		--form-dark: #5e6168;
		--dark-gray: #4e4e49;
		--light-gray: #5e6168;
	}


	#GalleryFold .BulletList button i{
		fill: var(--secondary-default) !important
	}

	main,
	footer {
		@apply col-span-12 col-start-1;
	}

	@media all and (min-width: 1024){
		body:not(.is-menu-open) .Car360-container *{
			margin-left: auto;
			width: 50%;
		}
	}

	@screen sm {
		.is-menu-open {
			& main {
				@apply pl-72;
			}

			& footer {
				@apply pl-72;
			}
		}
	}

	@screen xs {
		/* #GalleryFold{
			background-color: #E0E0E0 !important
		} */
	
		/* #TipsFold{
			background-color: #EBECEE !important
		} */
	}

	@screen md {
		#GalleryFold{
			background-color: #FFFFFF !important
		}
	
		#TipsFold{
			background-color: #FFFFFF !important
		}
	}

	.container-title span{
		transform: translate(0, -50%);
	}
</style>

<Tailwind />
<RouteModal />

{#if $device$.isMobile && toggleComponent}
	<HeaderMobile toggleFunction="{toggleComponent.toggleMenu}" />
{/if}

<Menu class="w-9/12 sm:secondary-default sm:bg-white bg-white sm:w-7/12 lg:w-72 xl:w-72">
	<Menu.Toggle bind:this="{toggleComponent}" />

	<Menu.Header class="pt-3">
		
		<div style="width: 120px" class="pt-4">
			<svg xmlns="http://www.w3.org/2000/svg" width="120" height="19.959" viewBox="0 0 120 19.959">
				<path id="Path_1416" data-name="Path 1416" d="M520.719,473.26h4.695v-8.319a29.3,29.3,0,0,1,6.5,8.319h3.972V457.709h-4.694v6.554a44.344,44.344,0,0,0-7.945-6.82h-2.528Zm-12.664,0h10.5v-4.111h-5.8v-1.741h4.574V463.49H512.75v-1.645h5.369v-4.111H508.055Zm7.295-16.179a1.766,1.766,0,0,0,1.734-1.765,1.758,1.758,0,0,0-3.515,0,1.776,1.776,0,0,0,1.782,1.765m-4.478,0a1.766,1.766,0,0,0,1.733-1.765,1.758,1.758,0,0,0-3.515,0,1.776,1.776,0,0,0,1.782,1.765M498.305,469.27c-1.806,0-2.961-1.548-2.961-3.967,0-2.273,1.059-3.579,2.961-3.579,1.83,0,3.009,1.427,3.009,3.579,0,2.588-1.059,3.967-3.009,3.967m0,4.232c4.743,0,7.824-3.241,7.824-8.174a7.8,7.8,0,1,0-15.6,0c0,4.958,3.057,8.174,7.776,8.174m-16.612-9.021v-3.023h1.373a1.268,1.268,0,0,1,1.324,1.451c0,.943-.506,1.572-1.324,1.572Zm-4.646,8.779h4.646v-5.078h.819a13.87,13.87,0,0,1,2.985,5.078h4.791a13.219,13.219,0,0,0-3.732-6.409,4.313,4.313,0,0,0,2.48-3.942c0-3.386-2.142-5.175-6.019-5.175h-5.97Zm-10.3,0h4.695V461.942h3.924v-4.208H462.819v4.208h3.924Zm-10.3,0h4.695V457.734h-4.695Zm-7.583.242A7.409,7.409,0,0,0,455,470.648l-2.769-2.975a4.14,4.14,0,0,1-3.178,1.6c-2.094,0-3.2-1.306-3.2-3.918,0-2.346,1.132-3.58,3.057-3.628a3.836,3.836,0,0,1,2.985,1.282l2.672-3.265a8.048,8.048,0,0,0-5.658-2.249,7.619,7.619,0,0,0-7.872,7.86c0,4.933,3.081,8.15,7.824,8.15m111.485-3.373c-.288-.315-7.078-7.692-9.535-7.692s-9.247,7.377-9.535,7.692a2.8,2.8,0,0,0-.691,1.646c0,.677.046,1.358.046,1.364,0,.031.018.319.18.4a.185.185,0,0,0,.084.019.351.351,0,0,0,.2-.076l.007-.006c.186-.161,7.01-6.075,9.712-6.075s9.527,5.913,9.709,6.072l.007.006a.355.355,0,0,0,.2.079.192.192,0,0,0,.083-.019c.162-.078.178-.366.179-.4,0-.006.046-.686.046-1.363a2.8,2.8,0,0,0-.691-1.646m0-7.019c-.288-.315-7.078-7.692-9.535-7.692s-9.247,7.377-9.535,7.692a2.8,2.8,0,0,0-.691,1.647c0,.677.046,1.358.046,1.364,0,.031.018.319.18.4a.186.186,0,0,0,.084.019.351.351,0,0,0,.2-.076l.007-.006c.186-.161,7.01-6.075,9.712-6.075s9.527,5.914,9.709,6.072l.007.006a.356.356,0,0,0,.2.079.193.193,0,0,0,.083-.019c.162-.078.178-.366.179-.4,0-.005.046-.686.046-1.363a2.805,2.805,0,0,0-.691-1.647" transform="translate(-441.032 -453.598)"/>
			</svg>			
		</div>
	</Menu.Header>

	<Menu.Nav class="pr-4">
		{#each linksToSections as link, index}
			<Menu.Link
				class="text-primary text-lg {linksToSections.length - 1 !== index && ''}"
				{...link}
				on:click="{() => {
					localStorage.setItem('menuAction', true)
					registerTrack('Menu_ClicouItem', normatize(link.track))
				}}"
			/>
		{/each}

		<!-- <Menu.Divider /> -->
		<!-- <li class="pl-4 hidden sm:block"><div class="h-0.5 bg-secondary w-full my-10"></div></li> -->
		<div class="mt-6"></div>

		{#each linksToTabs as link, index}
			<Menu.Link
				class="py-3 px-3 citroen text-md text-center text-white bg-secondary"
				{...link}
				on:click="{() => {
					registerTrack('Menu_ClicouItemCTA', normatize(link.track))
				}}"
				isLast="{index === linksToTabs.length}"
			/>
		{/each}
	</Menu.Nav>
</Menu>

<main data-ui-stage>
	<FirstFold />
	<TipsFold />
	<VersionFold />
	<VdFold />
	<GalleryFold />
	<FeatureFold />
	{#if $device$.isMobile}
		<CtaMobileFold />
	{/if}

</main>

<Footer
	media= "{[ { icon: 'instagram', url: 'https://www.instagram.com/citroenbrasil' }, { icon: 'facebook', url: 'https://www.facebook.com/CitroenBrasil' }, {icon: 'linkedin', url: 'https://linkedin.com/company/citroen_brasil'}]}"
/>

<WhatsappFold />

<!-- {#if $device$.isMobile}
	<MenuFixed />
{/if} -->
