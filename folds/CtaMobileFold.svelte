<script>
	import { registerTrack } from '~/components/DataLayer/Track.svelte'
	import { Anchor, Button, Icon } from '~/components'
	import normatize from '~/lib/normatize'

	const ctas = [
		{
			label: 'Monte o seu',
			to: 'https://www.citroenbr.com.br/monte-o-seu/c4-cactus?utm_source=showroom-cactus&utm_medium=menu-showroom-cactus&utm_campaign=showroom-cactus',
			isBlank: true
		},
		{
			label: 'Compre o seu',
			track: 'ActionPage_ClicouAgendeSeuTesteDrive',
			to: 'https://citroenbr.com.br/formulario/proposta/#sticky',
			isBlank: true
		},
		{
			label: 'Concessionárias',
			to: 'https://www.citroen.com.br/fale-com-a-citroen/concessionarias-citroen.html',
			isBlank: true
		},
		{
			label: 'Ofertas',
			to: 'https://www.citroenbr.com.br/cactus/ofertas/',
			isBlank: true
		}
	]
</script>

<style>
	:global(.CtaMobileFold) {
		:global(.rounded-button) {
			border-radius: 32px;
			width: 100%;
			height: 48px;
			background-color: #E21017;

			:global(a) {
				border-radius: 32px;
			}

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
		:global(.CtaMobileFold) {
			:global(.rounded-button) {
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
</style>

<Anchor name="CtaMobileFold" class="bg-white" track="footer">
	<div class="absolute z-0 w-full h-full">
		
	</div>
	<div class="flex flex-col m-auto">
		<div class="z-20 flex flex-col w-10/12 m-auto py-7 space-y-3">
			{#each ctas as cta}
				<div class="bg-secondary rounded-button flex">
					<Button
						class="w-full px-5 py-4 text-xl text-left text-white bg-secondary citroen citroen-300"
						{...cta}
						on:click="{() => {
							registerTrack(cta.track || 'ActionPage_ClicouNavItem', normatize(cta.label))
						}}"
					/>
					<Icon.Chevron color="var(--secondary-default)" type="right" />
				</div>
			{/each}
		</div>
	</div>

	<!-- <img src="static/inspired-by-you.png" class="mx-auto d-block py-10" alt="Citroën"> -->
</Anchor>
