<script>
	import { registerTrack } from '~/components/DataLayer/Track.svelte'
	import normatize from '~/lib/normatize'
	import { Icon, Picture } from '~/components'
	import { device as device$, query as q } from '~/lib'

	export let media
	export let showgpdl

	window.addEventListener('load', (event) => {
  	let cookie = getCookie('gpld_citroen');

		if(cookie == 1){
			showgpdl = '-bottom-full'
		}else{
			showgpdl = 'bottom-0'
		}
	});	

	function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
	}
	function getCookie(name) {
			var nameEQ = name + "=";
			var ca = document.cookie.split(';');
			for(var i=0;i < ca.length;i++) {
					var c = ca[i];
					while (c.charAt(0)==' ') c = c.substring(1,c.length);
					if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
			}
			return null;
	}

	function closeGpld() {
		setCookie("gpld_citroen", 1, 1);
		showgpdl = '-bottom-full';
		registerTrack("ActionPage_ClicouFecharPrivacidade")
	}
</script>

<style>
	.citroen-footer {
		background: #fff;

		:global(.chevron-logo-container) {
			width: 2660px;
		}

		:global(.chevron-footer-logo) {
			:global(&img) {
				height: 50px;
				width: auto;
				object-fit: cover;
			}
		}
	}

	@screen lg {
		.citroen-footer {
			:global(.chevron-footer-logo) {
				:global(&img) {
					object-fit: scale-down;
				}
			}
		}
	}
	.btn-close {
		left: -57px;
    top: 0;
    font-size: 12px;
    height: 33px;
    padding: 0 10px;
	}

	:global(.dark-icon) {
		:global(svg) {
			:global(path) {
				fill: #000;
			}
		}
	}
</style>

<footer class="relative citroen-footer pb-0 lg:pb-0">
	<!-- BACKGROUND -->
	
	<!-- CONTENT -->
	<div class="relative z-20 w-full h-full background-transparent pb-0 lg:pb-20" style="display: block">
		<div class="z-20 w-full sm:w-11/12 pt-8 sm:pb-8 mx-auto sm:grid-cols-10 sm:flex sm:items-stretch sm:justify-between sm:self-center">

			<div class="flex sm:order-1 order-1 mt-7 mb-12 px-5 sm:mb-0 sm:mt-0 sm:w-11/12 sm:justify-start justify-center items-center">
				<div class="w-full flex flex-col flex-wrap sm:flex-nowrap items-center relative">
					<div class="w-auto lg:w-full md:w-auto">
						<div style="width: 120px" class="-mt-6 mr-0 lg:mr-10 relative lg:absolute left-0">
							<svg xmlns="http://www.w3.org/2000/svg" width="120" height="19.959" viewBox="0 0 120 19.959">
								<path id="Path_1416" data-name="Path 1416" d="M520.719,473.26h4.695v-8.319a29.3,29.3,0,0,1,6.5,8.319h3.972V457.709h-4.694v6.554a44.344,44.344,0,0,0-7.945-6.82h-2.528Zm-12.664,0h10.5v-4.111h-5.8v-1.741h4.574V463.49H512.75v-1.645h5.369v-4.111H508.055Zm7.295-16.179a1.766,1.766,0,0,0,1.734-1.765,1.758,1.758,0,0,0-3.515,0,1.776,1.776,0,0,0,1.782,1.765m-4.478,0a1.766,1.766,0,0,0,1.733-1.765,1.758,1.758,0,0,0-3.515,0,1.776,1.776,0,0,0,1.782,1.765M498.305,469.27c-1.806,0-2.961-1.548-2.961-3.967,0-2.273,1.059-3.579,2.961-3.579,1.83,0,3.009,1.427,3.009,3.579,0,2.588-1.059,3.967-3.009,3.967m0,4.232c4.743,0,7.824-3.241,7.824-8.174a7.8,7.8,0,1,0-15.6,0c0,4.958,3.057,8.174,7.776,8.174m-16.612-9.021v-3.023h1.373a1.268,1.268,0,0,1,1.324,1.451c0,.943-.506,1.572-1.324,1.572Zm-4.646,8.779h4.646v-5.078h.819a13.87,13.87,0,0,1,2.985,5.078h4.791a13.219,13.219,0,0,0-3.732-6.409,4.313,4.313,0,0,0,2.48-3.942c0-3.386-2.142-5.175-6.019-5.175h-5.97Zm-10.3,0h4.695V461.942h3.924v-4.208H462.819v4.208h3.924Zm-10.3,0h4.695V457.734h-4.695Zm-7.583.242A7.409,7.409,0,0,0,455,470.648l-2.769-2.975a4.14,4.14,0,0,1-3.178,1.6c-2.094,0-3.2-1.306-3.2-3.918,0-2.346,1.132-3.58,3.057-3.628a3.836,3.836,0,0,1,2.985,1.282l2.672-3.265a8.048,8.048,0,0,0-5.658-2.249,7.619,7.619,0,0,0-7.872,7.86c0,4.933,3.081,8.15,7.824,8.15m111.485-3.373c-.288-.315-7.078-7.692-9.535-7.692s-9.247,7.377-9.535,7.692a2.8,2.8,0,0,0-.691,1.646c0,.677.046,1.358.046,1.364,0,.031.018.319.18.4a.185.185,0,0,0,.084.019.351.351,0,0,0,.2-.076l.007-.006c.186-.161,7.01-6.075,9.712-6.075s9.527,5.913,9.709,6.072l.007.006a.355.355,0,0,0,.2.079.192.192,0,0,0,.083-.019c.162-.078.178-.366.179-.4,0-.006.046-.686.046-1.363a2.8,2.8,0,0,0-.691-1.646m0-7.019c-.288-.315-7.078-7.692-9.535-7.692s-9.247,7.377-9.535,7.692a2.8,2.8,0,0,0-.691,1.647c0,.677.046,1.358.046,1.364,0,.031.018.319.18.4a.186.186,0,0,0,.084.019.351.351,0,0,0,.2-.076l.007-.006c.186-.161,7.01-6.075,9.712-6.075s9.527,5.914,9.709,6.072l.007.006a.356.356,0,0,0,.2.079.193.193,0,0,0,.083-.019c.162-.078.178-.366.179-.4,0-.005.046-.686.046-1.363a2.805,2.805,0,0,0-.691-1.647" transform="translate(-441.032 -453.598)"/>
							</svg>			
						</div>
					</div>
					<div class="w-full md:5/12 md:mt-0 mt-6 sm:block text-center absolute -bottom-40 chevron-logo-container pt-6">
						{#if !$device$.isMobile}
							<img
								class="object-cover w-full h-full mt-7 chevron-footer-logo"
								src="static/citroen-chevron-footer.png"
								alt="Inspired by You"
							/>
						{/if}
					</div>
				</div>
			</div>
			
			<div class="social flex mt-5 py-4 px-5 sm:w-2/12 sm:border-0 sm:bg-transparent sm:order-2 sm:justify-end">
				<!-- SOCIAL ICONS -->
				<ul class="flex w-11/12 sm:pt-0 pt-4 pb-6 mx-auto sm-order-2 self-center right-0 justify-center">
					{#each media as social}
						<li class="ml-5" on:click="{() => {
								registerTrack('ActionPage_ClicouSocialItem', normatize(social.icon))
							}}"
						>
							<a href="{social.url}" target="_blank" class="block dark-icon">
								<Icon.Social scale="{1.2}" name="{social.icon}" color="#000" />
							</a>
						</li>
					{/each}
				</ul>
				<!-- SOCIAL ICONS -->
			</div>
			{#if $device$.isMobile}
				<div class="absolute w-full h-10">
					<img
						class="object-cover w-full h-full mt-7 chevron-footer-logo"
						src="static/citroen-chevron-footer.png"
						alt="Inspired by You"
					/>
				</div>
			{/if}
		</div>
	</div>

	<div class="fixed text-white w-full z-50 left-0 sm:py-4 pt-10 pb-2 pb-4 pb-4 bt-10 flex flex-wrap justify-center transition-all ease-out duration-1000 {showgpdl }" style="background-color: #212121">

		<button class="close absolute top-0 bg-white right-0 p-2 z-40" style="background-color: #E1412D" on:click={() => closeGpld()}>
			<span class="flex justify-center items-center absolute btn-close">Fechar</span>
			<svg xmlns="http://www.w3.org/2000/svg" width="16.537" height="16.258" viewBox="0 0 16.537 16.258">
				<path id="Caminho_249" data-name="Caminho 249" d="M0,0H18.941" transform="translate(1.414 14.843) rotate(-45)" fill="none" stroke="#FFFFFF" stroke-linecap="round" stroke-width="2"/>
				<path id="Caminho_251" data-name="Caminho 251" d="M0,0H18.941" transform="translate(1.729 1.414) rotate(45)" fill="none" stroke="#FFFFFF" stroke-linecap="round" stroke-width="2"/>
			</svg>			
		</button>

		<div class="w-11/12 text-center">
			<h6 class="citroen sm:text-xl text-md uppercase">Respeitamos a sua privacidade</h6>
			<p class="citroen sm:text-sm">Esse site utiliza Cookies. Ao continuar a navegar no site, você aceita a utilização dos cookies. Saiba mais sobre a <a href="https://www.citroen.com.br/politica-de-privacidade.html" target="_blank" class="underline ">Política de Privacidade</a>.</p>
		</div>
	</div>
</footer>
