<script>
	import { registerTrack } from './DataLayer/Track.svelte';
	import { device as device$ } from '~/lib'

	// window.addEventListener('DOMContentLoaded', () => {
	// 	if ($device$.isMobile) {
	// 		document.getElementById('WhatsappFab').classList.remove('collapsible')
	// 	}
	// })

	window.addEventListener('scroll', () => {
		if ($device$.isMobile) {
			const wf = document.getElementById('WhatsappFab')
			if (!wf.classList.contains('collapsible')) {
				document.getElementById('WhatsappFab').classList.add('collapsible')
			}
		}
	})
</script>

<style>
	#WhatsappFold {
		& .fab {
			position: fixed;
			bottom: 80px;
			right: 24px;
			z-index: 20;
			display: flex;
			cursor: pointer;
			align-items: center;
			background: white;
			border-radius: 100px;
			width: 228px;
			height: 64px;
			padding: 11px 16px 11px 11px;
			box-shadow: 0 8px 8px 0 rgb(0 0 0 / 15%);
			transition: background-color 0.1s ease;
			background: white;
			border: solid 1px rgba(128, 122, 122, 0.13);
	
			& .fab__icon {
				width: 38px;
				margin-right: 9px;
			}

			& .fab__label {
				font-size: 1.3rem;
				line-height: 2.3rem;
				font-weight: 500;
				color: #128c7e;
			}
		}


		& .fab.collapsible {
			padding: 11px 12px 11px 12px;
			background-color: #26d366;
			width: 64px;
			transition: background-color 0.1s ease, width 0.4s cubic-bezier(0.75, 0.09, 0.36, 1);

			& .fab__label {
				opacity: 0;
				overflow: hidden;
				white-space: nowrap;
			}

			&:hover {
				width: 228px;
				background-color: #dcf8c7;
				padding: 11px 16px 11px 11px;

				& .fab__label {
					opacity: 1;
				}
			}

			&.focused {
				width: 228px;
				background-color: #dcf8c7;
				padding: 11px 16px 11px 11px;

				& .fab__label {
					opacity: 1;
				}
			}
		}
	}

	@screen lg {
		#WhatsappFold {
			& .fab {
				bottom: 70px;
			}
		}
	}
</style>

<div id="WhatsappFold">
	<div
		id="WhatsappFab"
		class="fab collapsible -mb-6 lg:mb-0"
		on:click="{() => {
			window.open('https://wa.me/message/UQWXSVYMFINCN1', '_blank')
			registerTrack('Whatsapp_AbrirConversa', 'whatsapp');
		}}"
	>
		<img src="./static/whatsapp-fab-icon.png" class="fab__icon" alt="Whatsapp Icon" />
		<span class="fab__label">Quero comprar</span>
	</div>
</div>
