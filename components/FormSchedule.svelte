<script>
	import { onMount } from 'svelte'
	import { writable } from 'svelte/store'
	import { fly } from 'svelte/transition'
	import Icon from './Icon'
	import Button from './Button/Button.svelte'
	import { goto, query as q } from '~/lib'

	let bodyEl

	const onClose = () => {
		bodyEl.classList.remove('is-form-open')
	}

	onMount(() => {
		bodyEl = q('body')
		bodyEl.classList.add('is-form-open')

		return () => {
			onClose()
		}
	})

	let debouncing
	let notFoundDealer

	const cities$ = writable([])
	const dealers$ = writable([])

	const formData = {
		brand: 'ram',
		model: '359',
		version: '',
		serie: '0',
		name: '',
		cpf: '',
		email: '',
		dealer: null,
		color: '',
		scheduleDate: '',
		phoneNumber: ''
	}

	const _formData = {
		phoneDigit: '',
		phone: '',
		message: ''
	}

	let submitResponse = {
		success: null,
		msg: null
	}

	const serviceLocation = new URL('https://location-service.k8s.fcalatam.com.br/country/BR')
	const serviceCity = new URL('https://dealer-service.k8s.fcalatam.com.br')
	const serviceDealer = new URL('https://offer-service.k8s.fcalatam.com.br/dealer')

	const fetchCityByState = async (stateCode) => {
		const params = {
			brandName: 'ram'
		}

		try {
			serviceCity.search = new URLSearchParams(params).toString()
			serviceCity.pathname = `dealerws/influencearea/state/${stateCode}/city`
			const res = await fetch(serviceCity)
			const data = await res.json()

			if (data.length) {
				$cities$ = data
				// clear dealers
				$dealers$ = []
			}
		} catch {}
	}

	const fetchCityBy = async (typedText) => {
		clearTimeout(debouncing)
		debouncing = setTimeout(async () => {
			const params = { includeInfluenceArea: true, cityContaining: typedText, limit: 20 }

			try {
				serviceLocation.search = new URLSearchParams(params).toString()
				const res = await fetch(serviceLocation)
				const data = await res.json()
				if (data.length) {
					$cities$ = data
					// clear dealers
					$dealers$ = []
				}
			} catch {}
		}, 500)
	}

	const fetchDealersBy = async (cityCode) => {
		const params = {
			brandName: 'ram',
			cities: cityCode
		}

		try {
			serviceDealer.search = new URLSearchParams(params).toString()
			const res = await fetch(serviceDealer)
			const data = await res.json()

			if (data.length) {
				notFoundDealer = false
				$dealers$ = data.map((d) => ({
					fantasyName: d.fantasyName,
					address: d.address,
					cityName: d.city.name,
					code: d.id
				}))
			} else {
				notFoundDealer = true
			}

			// clear cities
			$cities$ = []
		} catch {}
	}

	const maskPhoneNumber = (ddd, phone) => {
		// mask to input
		_formData.phoneDigit = ddd
			.toString()
			.replace(/\D/g, '')
			.replace(/(\d{2})/g, '($1)')
		_formData.phone = phone
			.toString()
			.replace(/\D/g, '')
			.replace(/(\d)(\d{4})$/, '$1-$2')

		// mask value
		formData.phoneNumber = `${_formData.phoneDigit} ${_formData.phone}`
	}

	const maskCpf = (cpf) => {
		formData.cpf = cpf
			.toString()
			.replace(/\D/g, '')
			.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
	}

	$: maskPhoneNumber(_formData.phoneDigit, _formData.phone)
	$: maskCpf(formData.cpf)

	const submit = async () => {
		try {
			const res = await fetch('https://fcabmc.cs.blip.ai/ram/Lead/send', {
				headers: {
					'Content-Type': 'application/json'
				},
				method: 'post',
				body: JSON.stringify(formData)
			})

			const { success, errorMessage } = await res.json()

			if (success) {
				submitResponse.success = true
				submitResponse.msg = 'Formulário enviado. Aguarde que em breve entraremos em contato.'
			} else {
				submitResponse.success = false
				submitResponse.msg = errorMessage
			}
		} catch {}
	}

	const reset = () => {
		submitResponse = { success: null, msg: null }
	}

	$: has = (array) => array.length > 0
</script>

<style>
	.input-line {
		@apply appearance-none bg-transparent border-none leading-tight  py-1 px-2 w-full;
	}

	:global(body.is-form-open) {
		@apply overflow-hidden;
	}

	select#profile,
	select#version {
		& option {
			@apply bg-form;
		}
	}
</style>

<div class="relative w-full h-full overflow-x-hidden overflow-y-auto bg-white ">
	<Button
		class="p-2 !absolute right-0 border border-form-gray"
		on:click="{() => {
			goto('')
			onClose()
		}}"
	>
		<Icon.Close color="var(--secondary-default)" scale="{2}" />
	</Button>

	{#if submitResponse.success === null || submitResponse.success === false}
		<div class="pt-6 bg-form text-form-gray">
			<header class="w-10/12 py-10 m-auto text-center">
				<h1 class="mb-6 text-xl font-bold leading-6">
					PREENCHA O FORMUÁRIO ABAIXO E PREPARE-SE PARA SE SURPREENDER
					<br />
					COM TODOS OS DETALHES DA SUA PRÓXIMA RAM.
				</h1>

				<p class="leading-5">
					Fique tranquilo, um de nossos vendedores entrará em contato com você.
				</p>
			</header>
		</div>

		<form class="bg-form text-form-gray" on:submit|preventDefault="{() => submit()}">
			<div class="w-11/12 py-4 m-auto sm:w-10/12 sm:flex">
				<div class="sm:w-1/2 sm:mr-20">
					<div class="mb-12 border-b border-form-gray">
						<label class="block mb-2 text-sm" for="full_name"> NOME COMPLETO </label>
						<input
							bind:value="{formData.name}"
							class="input-line focus:outline-none"
							autocomplete="autocomplete_off_hack_xfr4!k"
							id="full_name"
							type="text"
							required
						/>
					</div>

					<div class="mb-12 border-b border-form-gray">
						<label class="block mb-2 text-sm" for="email"> E-MAIL </label>
						<input
							bind:value="{formData.email}"
							class="input-line focus:outline-none"
							id="email"
							type="email"
							required
						/>
					</div>

					<div class="mb-12">
						<label class="block mb-2 text-sm" for="ddd">TELEFONE</label>
						<div class="flex">
							<div class="w-2/12 mr-3 border-b border-form-gray">
								<input
									bind:value="{_formData.phoneDigit}"
									class="placeholder-form-gray input-line focus:outline-none"
									autocomplete="autocomplete_off_hack_xfr4!k"
									name="ddd"
									id="ddd"
									type="tel"
									placeholder="DDD"
									maxlength="2"
									required
								/>
							</div>

							<div class="w-10/12 border-b border-form-gray">
								<input
									bind:value="{_formData.phone}"
									autocomplete="autocomplete_off_hack_xfr4!k"
									class="placeholder-form-gray input-line focus:outline-none"
									name="tel"
									id="tel"
									type="tel"
									placeholder="Número"
									maxlength="10"
									required
								/>
							</div>
						</div>
					</div>
				</div>

				<div class="sm:w-1/2">
					<div class="relative mb-12 border-b border-form-gray">
						<label class="block mb-2 text-sm" for="profile"> SELECIONE SEU PERFIL </label>
						<select
							id="profile"
							class="input-line focus:outline-none focus:shadow-outline"
							name="profile"
						>
							<option class="first">Selecione seu perfil</option>
							<option value="Vendas">Pessoa Física - CPF</option>
							<option value="Vendas Diretas - Autonomy">Pessoa com Deficiência - PcD</option>
							<option value="Vendas Diretas - PJ - Micro empresário">
								Micro empresário - CNPJ
							</option>
							<option value="Vendas Diretas - Taxista">Taxista</option>
							<option value="Vendas Diretas - Produtor Rural">Produtor Rural</option>
							<option value="Vendas Diretas - PJ - Locadora">Locadora</option>
							<option value="Vendas Diretas - PJ - Auto Escola">Auto Escola</option>
						</select>
						<div
							class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-form-gray"
						>
							<svg
								class="w-4 h-4 fill-current"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
							><path
									d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
								></path></svg>
						</div>
					</div>

					<div class="mb-12 border-b border-form-gray">
						<label class="block mb-2 text-sm" for="cpf">CPF</label>
						<input
							bind:value="{formData.cpf}"
							autocomplete="autocomplete_off_hack_xfr4!k"
							class="input-line focus:outline-none"
							name="cpf"
							id="cpf"
							type="tel"
							maxlength="11"
							required
						/>
					</div>

					<div class="relative mb-12 border-b border-form-gray">
						<label class="block mb-2 text-sm" for="version"> SELECIONE UMA VERSÂO </label>
						<select
							bind:value="{formData.version}"
							id="version"
							name="version"
							class="input-line focus:outline-none focus:shadow-outline"
						>
							<option class="first">Selecione uma versão</option>
							<option value="5752LWM">Peugeot 208</option>
						</select>
						<div
							class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-form-gray"
						>
							<svg
								class="w-4 h-4 fill-current"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
							><path
									d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
								></path></svg>
						</div>
					</div>

					<div class="mb-12 border-b border-form-gray">
						<label class="block mb-2 text-sm" for="message"> MENSAGEM </label>
						<textarea
							bind:value="{_formData.message}"
							id="message"
							name="message"
							class="placeholder-form-gray input-line"
							placeholder="Digite sua mensagem"
						></textarea>
					</div>

					<div class="mb-4">
						<p class="text-sm leading-4">
							Seus dados pessoais poderão ser utilizados pela Ram e pela Concessionárias para fins de
							envio de comunicações de marketing de produtos e serviços relacionados à Ram. A Ram
							compartilhará seus dados pessoais com a instituição financeira parceira e com demais
							empresas do grupo (Jeep, Chrysler, Dodge e Fiat) para viabilizar o envio de uma
							proposta de financiamento do veículo de seu interesse. Para mais detalhes sobre como
							desativar o recebimento de comunicações de marketing e outras informações sobre como a
							Ram trata seus dados pessoais, acesse a Política de Privacidade
							<a
								class="underline"
								href="https://www.ram.com.br/politica-de-privacidade.html"
								target="_blank"
								rel="noopener noreferrer"
							>disponível aqui</a>.
						</p>
					</div>
				</div>
			</div>

			<div class="w-full bg-form-fg text-form-dark">
				<div class="w-11/12 m-auto text-center">
					<h1 class="py-10 text-xl font-bold leading-6">
						{#if notFoundDealer}
							Não há concessionárias na cidade selecionada.
							<br />
							Por favor selecione outra cidade abaixo.
						{:else}ESCOLHA UMA DAS CONCESSIONÁRIAS ABAIXO{/if}
					</h1>
				</div>

				<div class="relative w-11/12 m-auto mb-4 text-center sm:w-5/12">
					{#if notFoundDealer}
						<div
							class="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3"
							transition:fly
						>
							<div class="relative border-b sm:w-4/12 border-form-gray">
								<label
									class="block mb-2 text-sm text-left"
									for="version"
                >
                  ESTADO
                </label>
								<select
									on:change="{({ target }) => fetchCityByState(target.value)}"
									id="state"
									name="state"
									class="input-line focus:outline-none focus:shadow-outline"
								>
									<option value="">Selecione</option>
									<option value="AC">AC</option>
									<option value="AL">AL</option>
									<option value="AM">AM</option>
									<option value="BA">BA</option>
									<option value="CE">CE</option>
									<option value="DF">DF</option>
									<option value="ES">ES</option>
									<option value="GO">GO</option>
									<option value="MA">MA</option>
									<option value="MG">MG</option>
									<option value="MS">MS</option>
									<option value="MT">MT</option>
									<option value="PA">PA</option>
									<option value="PB">PB</option>
									<option value="PE">PE</option>
									<option value="PI">PI</option>
									<option value="PR">PR</option>
									<option value="RJ">RJ</option>
									<option value="RN">RN</option>
									<option value="RS">RS</option>
									<option value="SC">SC</option>
									<option value="SE">SE</option>
									<option value="SP">SP</option>
									<option value="TO">TO</option>
								</select>
								<div
									class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-form-gray"
								>
									<svg
										class="w-4 h-4 fill-current"
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20"
									><path
											d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
										></path></svg>
								</div>
							</div>

							<div class="relative border-b sm:w-8/12 border-form-gray">
								<label
									class="block mb-2 text-sm text-left"
									for="version"
								>CIDADE</label>
								<select
									on:change="{({ target }) => fetchDealersBy(target.value)}"
									bind:value="{formData.version}"
									class="input-line focus:outline-none focus:shadow-outline"
								>
									<option value="">Selecione</option>
									{#each $cities$ as city}
										<option value="{city.cityCode}">{city.cityName}</option>
									{/each}
								</select>
								<div
									class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-form-gray"
								>
									<svg
										class="w-4 h-4 fill-current"
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20"
									><path
											d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
										></path></svg>
								</div>
							</div>
						</div>
					{:else}
						<div class="w-10/12 m-auto" transition:fly>
							<div class="border-b border-form-gray">
								<label class="block mb-2 text-sm" for="city">
									Caso sua cidade não tenha sido localizada digite o nome da cidade
								</label>
								<input
									autocomplete="autocomplete_off_hack_xfr4!k"
									class="input-line focus:outline-none"
									name="city"
									id="city"
									type="text"
									on:keyup="{(evt) => fetchCityBy(evt.target.value)}"
								/>
							</div>
							<ul
								class:visible="{has($cities$)}"
								class:invisible="{!has($cities$)}"
								class="text-left shadow-md transition-opacity"
							>
								{#each $cities$ as city}
									<li
										on:click="{() => fetchDealersBy(city.cityCode)}"
										class="px-2 py-4 cursor-pointer hover:bg-form hover:text-form-gray"
									>
										{city.cityName}
										-
										{city.stateCode}
									</li>
								{/each}
							</ul>
							<ul
								class:visible="{has($dealers$)}"
								class:invisible="{!has($dealers$)}"
								class="text-left transition-opacity"
							>
								{#each $dealers$ as dealer}
									<li class="px-2 py-4 leading-5">
										<label class="flex items-center">
											<input
												bind:value="{formData.dealer}"
												on:click="{(evt) => (evt.target.value = Number(dealer.code))}"
												class="w-6 h-6 mr-4 leading-tight text-secondary"
												name="dealer"
												type="radio"
											/>
											<span class="text-sm">
												{dealer.fantasyName}
												<br />
												{dealer.address}
												<br />
												{dealer.cityName}
											</span>
										</label>
									</li>
								{/each}
							</ul>
						</div>
						<div
							class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-form-gray"
						>
							<svg
								class="w-4 h-4 fill-current"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
							><path
									d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
								></path></svg>
						</div>
					{/if}
				</div>

				<p class="pb-6 mt-10 text-xl font-bold text-center leading-6">
					Preencheu o formulário?<br />Agora, é so enviar sua proposta.
				</p>

				<div class="w-9/12 pb-20 m-auto text-center sm:w-5/12 grid gap-4">
					<Button label="ENVIAR" class="p-4 font-semibold text-white rounded-md bg-secondary" />
				</div>
			</div>
		</form>
	{:else}
		<div class="flex flex-col items-center justify-center w-10/12 h-full m-auto">
			<p class="text-2xl text-center sm:text-xl leading-6">
				{@html submitResponse.msg}
			</p>
			<Button
				on:click="{() => reset()}"
				class="px-6 px-16 py-3 mt-10 text-white sm:px-6 bg-secondary rounded-md"
				label="FECHAR"
			/>
		</div>
	{/if}
</div>
