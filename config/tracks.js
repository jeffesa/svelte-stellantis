import normatize from '../lib/normatize'

function createTrack(options) {
	const opts = Object(options)
	return {
		event: opts.event || 'interaction', // interaction | view | vpv
		eventActor: 'user', // OK
		segment: 'landing-page', // OK
		product: 'c4-cactus', // OK
		interactionType: opts.type || '-', // clique | abertura | fechamento | remocao | selecao | preencheu
		component: {
			part: opts.part || 'conteudo', // em algum momento retornou algo diferente de header, footer ou conteudo
			props: {
				section: opts.section || '-',
				subsection: opts.subsection || '-',
				'element-text': opts.elementText || '-' // se view ou vpv, passar device
			}
		}
	}
}

function track(type, section, subsection, part, elementText, device) {
	const isViewpage = /^(?:view|vpv)$/i.test(type)
	const event = isViewpage ? type : 'interaction'
	type = isViewpage ? 'abertura' : type
	if (
		!/^(?:clique|abertura|fechamento|remocao|selecao|preencheu)$/.test(type)
	) {
		console.error('track.interactionType is wrong at:', {
			event,
			type,
			section,
			subsection,
			part,
			elementText,
			device
		})
	}
	if (!/^(?:header|footer|conteudo)$/.test(part)) {
		console.error('track.part is wrong at:', {
			event,
			type,
			section,
			subsection,
			part,
			elementText,
			device
		})
	}
	return createTrack({
		event,
		type,
		section,
		subsection,
		part,
		elementText,
		device
	})
}

export const data = {
	// General ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	App_Iniciou: (device) => {},
	App_Pageview: (section, device) => {
		return track('vpv', section, '', 'conteudo', null, device)
	},

	// Menu ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	Menu_ClicouAbrir: (device) => {
		return track(
			'abertura',
			'menu-lateral',
			'menu-lateral',
			'conteudo',
			'abrir',
			device
		)
	},
	Menu_ClicouFechar: (device) => {
		return track(
			'fechamento',
			'menu-lateral',
			'menu-lateral',
			'conteudo',
			'fechar',
			device
		)
	},
	Menu_ClicouLogoCarro: (device) => {
		return track(
			'clique',
			'menu-lateral',
			'menu-lateral',
			'conteudo',
			'logo-citroen',
			device
		)
	},
	Menu_ClicouLogoFiat: (device) => {
		return track(
			'clique',
			'menu-lateral',
			'menu-lateral',
			'conteudo',
			'logo-fiat',
			device
		)
	},
	Menu_ClicouPin: (device) => {
		return track(
			'clique',
			'menu-lateral',
			'menu-lateral',
			'conteudo',
			'concessionarias',
			device
		)
	},
	Menu_ClicouItem: (section, device) => {
		return track(
			'clique',
			'menu-lateral',
			'menu-lateral',
			'conteudo',
			normatize(section),
			device
		)
	},
	Menu_ClicouItemCTA: (section, device) => {
		return track(
			'clique',
			'menu-lateral',
			'cta',
			'conteudo',
			normatize(section),
			device
		)
	},

	// Menu Fixed ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	MenuFixed_abrir: (device) => {
		return track(
			'abertura',
			'menu-flutuante',
			'menu-flutuante',
			'conteudo',
			'menu',
			device
		)
	},
	MenuFixed_fechar: (device) => {
		return track(
			'fechamento',
			'menu-flutuante',
			'menu-flutuante',
			'conteudo',
			'menu',
			device
		)
	},
	MenuFixed_ClicouItem: (title, device) => {},
	MenuFixed_ClicouMonteOSeu: (device) => {
		return track(
			'clique',
			'menu-flutuante',
			'cta',
			'conteudo',
			'monte-o-seu',
			device
		)
	},
	MenuFixed_ClicouSimularFinanciamento: (title, device) => {
		return track(
			'clique',
			'menu-flutuante',
			'cta',
			'conteudo',
			'simule-o-financiamento',
			device
		)
	},
	MenuFixed_ClicouAgendeSeuTesteDrive: (title, device) => {
		return track(
			'clique',
			'menu-flutuante',
			'cta',
			'conteudo',
			'compre-o-seu',
			device
		)
	},
	MenuFixed_ClicouConcessionarias: (title, device) => {
		return track(
			'clique',
			'menu-flutuante',
			'cta',
			'conteudo',
			'concessionariaa',
			device
		)
	},
	MenuFixed_ClicouOfertasFiat: (title, device) => {
		return track(
			'clique',
			'menu-flutuante',
			'cta',
			'conteudo',
			'ofertas-c4-cactus',
			device
		)
	},

	// Cronospedia ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	PreVenda_ClicouOfertas: (title, device) => {
		return track('clique', 'ofertas', 'cta', 'conteudo', 'veja-as-ofertas', device)
	},

	// Formulario ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	FormSchedule_Abriu: (device) => {
		// return track('view', 'compre-o-seu', 'compre-o-seu', 'formulario', 'abrir', device);
	},
	FormSchedule_ClicouWhatsApp: (device) => {
		return track(
			'clique',
			'compre-o-seu',
			'cta',
			'conteudo',
			'lead-whatsapp',
			device
		)
	},
	FormSchedule_PreencheuNome: (device) => {
		return track(
			'preencheu',
			'compre-o-seu',
			'compre-o-seu',
			'formulario',
			'nome',
			device
		)
	},
	FormSchedule_PreencheuEmail: (device) => {
		return track(
			'preencheu',
			'compre-o-seu',
			'compre-o-seu',
			'formulario',
			'email',
			device
		)
	},
	FormSchedule_PreencheuTelefone: (device) => {
		return track(
			'preencheu',
			'compre-o-seu',
			'compre-o-seu',
			'formulario',
			'telefone',
			device
		)
	},
	FormSchedule_PreencheuPerfil: (value, device) => {
		return track(
			'preencheu',
			'compre-o-seu',
			'compre-o-seu',
			'formulario',
			'perfil',
			device
		)
	},
	FormSchedule_PreencheuCPF_CNPJ: (value, device) => {
		return track(
			'preencheu',
			'compre-o-seu',
			'compre-o-seu',
			'formulario',
			'cpf',
			device
		)
	},
	FormSchedule_PreencheuVersao: (value, device) => {
		return track(
			'preencheu',
			'compre-o-seu',
			'compre-o-seu',
			'formulario',
			'versao',
			device
		)
	},
	FormSchedule_PreencheuMensagem: (value, device) => {
		return track(
			'preencheu',
			'compre-o-seu',
			'compre-o-seu',
			'formulario',
			'mensagem',
			device
		)
	},
	FormSchedule_PreencheuCep: (value, device) => {
		return track(
			'preencheu',
			'compre-o-seu',
			'compre-o-seu',
			'formulario',
			'cep',
			device
		)
	},
	FormSchedule_AddTelefone: (device) => {
		return track(
			'clique',
			'compre-o-seu',
			'compre-o-seu',
			'formulario',
			'add-telefone',
			device
		)
	},
	FormSchedule_ClicouFechar: (device) => {
		return track(
			'clique',
			'compre-o-seu',
			'compre-o-seu',
			'formulario',
			'fechar',
			device
		)
	},
	FormSchedule_ClicouEnviar: (device) => {
		return track(
			'clique',
			'compre-o-seu',
			'compre-o-seu',
			'formulario',
			'lead-enviar',
			device
		)
	},
	FormSchedule_Enviou: (status, device) => {
		return track(
			'clique',
			'compre-o-seu',
			'compre-o-seu',
			'formulario',
			'lead-sucesso',
			device
		)
	},
	FormSchedule_FecharEnviado: (status, device) => {
		// return track('clique', 'compre-o-seu', 'compre-o-seu', 'formulario', 'fechar-x-enviado', device);
	},
	FormSchedule_CEPCidade: (status, device) => {
		return track(
			'preencheu',
			'compre-o-seu',
			'compre-o-seu',
			'formulario',
			'cep-cidade',
			device
		)
	},
	FormSchedule_FecharSucesso: (status, device) => {
		return track(
			'fechamento',
			'compre-o-seu',
			'compre-o-seu',
			'formulario',
			'botao-fechar',
			device
		)
	},
	FormSchedule_ClicouReceberComunicacaoTelefone: (value, device) => {
		return track(
			'selecao',
			'compre-o-seu',
			'compre-o-seu',
			'formulario',
			'aceito-comunicacao-telefone',
			device
		)
	},
	FormSchedule_ClicouNaoReceberComunicacaoTelefone: (value, device) => {
		return track(
			'remocao',
			'compre-o-seu',
			'compre-o-seu',
			'formulario',
			'nao-aceito-comunicacao-telefone',
			device
		)
	},
	FormSchedule_ClicouReceberComunicacaoEmail: (value, device) => {
		return track(
			'selecao',
			'compre-o-seu',
			'compre-o-seu',
			'formulario',
			'aceito-comunicacao-email',
			device
		)
	},
	FormSchedule_ClicouNaoReceberComunicacaoEmail: (value, device) => {
		return track(
			'remocao',
			'compre-o-seu',
			'compre-o-seu',
			'formulario',
			'nao-aceito-comunicacao-email',
			device
		)
	},
	FormSchedule_SelecionouConcessionaria: (value, device) => {
		return track(
			'selecao',
			'compre-o-seu',
			'compre-o-seu',
			'formulario',
			'concessionaria',
			device
		)
	},

	// Modal ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	Modal_Fechou: (pathname, device) => {
		// Não utilizado porque o parametro não é o mesmo da abertura
		// return track('fechamento', 'destaque', 'home', 'conteudo', 'fechou', device);
	},
	Modal_Fechou_WithTitle: (title, device) => {
		return track(
			'fechamento',
			'destaque',
			'c4-cactus',
			'conteudo',
			normatize(title),
			device
		)
	},
	Modal_ClicouProximo: (cardName, index, cluster, device) => {
		return track(
			'clique',
			'destaque',
			normatize(cardName),
			'conteudo',
			'proximo',
			device
		)
	},
	Modal_ClicouAnterior: (cardName, index, cluster, device) => {
		return track(
			'clique',
			'destaque',
			normatize(cardName),
			'conteudo',
			'anterior',
			device
		)
	},
	Modal_ClicouBullet: (cardName, index, cluster, device) => {
		return track(
			'clique',
			'destaque',
			normatize(cardName),
			'conteudo',
			'anterior',
			device
		)
	},

	// Modal Tabs ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	ModalTabs_Abriu: (title, device) => {
		return track(
			'vpv',
			'destaque',
			'c4-cactus',
			'conteudo',
			normatize(title),
			device
		)
	},
	ModalTabs_ClicouPoster: (posterTitle, sessionTitle, device) => {
		const section = normatize(sessionTitle)
		const subsection = normatize(posterTitle)
		return track(
			'clique',
			'destaque',
			'c4-cactus',
			'conteudo',
			`${section}:${subsection}`,
			device
		)
	},
	ModalTabs_ClicouTab: (tabTitle, sessionTitle, index, device) => {
		const section = normatize(sessionTitle)
		const subsection = normatize(tabTitle)
		return track(
			'clique',
			'destaque',
			'c4-cactus',
			'conteudo',
			`${section}:${subsection}:${index}`,
			device
		)
	},
	ModalTabs_MudouTab: (tabTitle, sessionTitle, index, device) => {
		// Não é mais utilizado esse evento porque precisamos ter o evento de 'Clique'
		// e o evento de 'Drag' separados. O 'ModalGallery_MudouPoster' dispara sempre.
		// return track('view', tabTitle, sessionTitle, 'conteudo', null, device);
	},
	ModalTabs_Scroll: (tabTitle, sessionTitle, index, device) => {
		const complemento = ':scroll-lateral'
		const section = normatize(sessionTitle)
		const subsection = normatize(tabTitle)
		return track(
			'clique',
			'destaque',
			'c4-cactus',
			'conteudo',
			`${section}:${subsection}:${index}${complemento}`,
			device
		)
	},
	ModalTabs_videoPlay: (tabTitle, sessionTitle, device) => {
		const section = normatize(sessionTitle)
		const subsection = normatize(tabTitle)
		// return track('clique', 'destaque', 'c4-cactus', 'conteudo', `${section}:${subsection}:play`, device);
		return track(
			'clique',
			'destaque',
			'c4-cactus',
			'conteudo',
			`${subsection}:play`,
			device
		)
	},
	ModalTabs_videoPause: (tabTitle, sessionTitle, device) => {
		const section = normatize(sessionTitle)
		const subsection = normatize(tabTitle)
		// return track('clique', 'destaque', 'c4-cactus', 'conteudo', `${section}:${subsection}:pause`, device);
		return track(
			'clique',
			'destaque',
			'c4-cactus',
			'conteudo',
			`${subsection}:pause`,
			device
		)
	},

	// Modal Gallery ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	ModalGallery_Abriu: (title, device) => {
		return track(
			'vpv',
			'destaque',
			'c4-cactus',
			'conteudo',
			normatize(title),
			device
		)
	},
	ModalGallery_ThumbsScroll: (tabTitle, sessionTitle, index, device) => {
		const complemento = ':scroll-lateral'
		const section = normatize(sessionTitle)
		const subsection = normatize(tabTitle)
		return track(
			'clique',
			'destaque',
			'c4-cactus',
			'conteudo',
			`${section}:${subsection}${complemento}`,
			device
		)
	},
	ModalGallery_ClicouPoster: (posterTitle, sessionTitle, device) => {
		const section = normatize(sessionTitle)
		const subsection = normatize(posterTitle)
		return track(
			'clique',
			'destaque',
			'c4-cactus',
			'conteudo',
			`${section}:${subsection}`,
			device
		)
	},
	ModalGallery_ClicouThumb: (thumbTitle, sessionTitle, index, device) => {
		const section = normatize(sessionTitle)
		const subsection = normatize(thumbTitle)
		return track(
			'clique',
			'destaque',
			'c4-cactus',
			'conteudo',
			`${section}:${subsection}:${index}`,
			device
		)
	},
	ModalGallery_MudouPoster: (thumbTitle, sessionTitle, index, device) => {
		// Não é mais utilizado esse evento porque precisamos ter o evento de 'Clique'
		// e o evento de 'Drag' separados. O 'ModalGallery_MudouPoster' dispara sempre.
		// const complemento = ':scroll-lateral';
		// const section = normatize(sessionTitle);
		// const subsection = normatize(thumbTitle);
		// return track('view', 'destaque', 'c4-cactus', 'conteudo', `${section}:${subsection}:${index}${complemento}`, device);
	},
	ModalGallery_Scroll: (thumbTitle, sessionTitle, index, device) => {
		const complemento = ':scroll-lateral'
		const section = normatize(sessionTitle)
		const subsection = normatize(thumbTitle)
		return track(
			'clique',
			'destaque',
			'c4-cactus',
			'conteudo',
			`${section}:${subsection}:${index}${complemento}`,
			device
		)
	},
	ModalGallery_videoPlay: (tabTitle, sessionTitle, device) => {
		const section = normatize(tabTitle)
		const subsection = normatize(sessionTitle)
		return track(
			'clique',
			'destaque',
			'c4-cactus',
			'conteudo',
			`${section}:${subsection}:play`,
			device
		)
	},
	ModalGallery_videoPause: (tabTitle, sessionTitle, device) => {
		const section = normatize(tabTitle)
		const subsection = normatize(sessionTitle)
		return track(
			'clique',
			'destaque',
			'c4-cactus',
			'conteudo',
			`${section}:${subsection}:pause`,
			device
		)
	},

	// MainPage ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	MainPage_ClicouThumbnail: (title, device) => {
		return track(
			'abertura',
			'destaque',
			'c4-cactus',
			'conteudo',
			normatize(title),
			device
		)
	},
	MainPage_ClicouProximo: (index, device) => {
		return track('clique', 'destaque', 'c4-cactus', 'conteudo', 'avancar', device)
	},
	MainPage_ClicouAnterior: (index, device) => {
		return track('clique', 'destaque', 'c4-cactus', 'conteudo', 'voltar', device)
	},
	MainPage_PaginouFeaturesNoMobile: (type,index, device) => {
		//ok
		return track('clique', type, 'c4-cactus', 'conteudo', 'swipe', device)
	},

	// TipPage ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	TipPage_ClicouShare: (title, device) => {
		return track(
			'clique',
			'mobi-trekking',
			'cta',
			'conteudo',
			'compartilhar-facebook',
			device
		)
	},
	TipPage_ClicouCustomize: (device) => {
		return track(
			'clique',
			'mobi-trekking',
			'cta',
			'conteudo',
			'monte-o-seu',
			device
		)
	},
	TipPage_ClicouAgende: (device) => {
		return track(
			'clique',
			'mobi-trekking',
			'cta',
			'conteudo',
			'ofertas-fiat',
			device
		)
	},
	TipPage_ClicouBullet: (title, device) => {
		return track('clique', 'mobi-trekking', 'galeria', 'conteudo', null, device)
	},
	TipPage_ClicouPoster: (title, device) => {
		return track(
			'clique',
			'mobi-trekking',
			'galeria',
			'conteudo',
			normatize(title),
			device
		)
	},
	TipPage_ClicouThumb: (title, device) => {
		return track(
			'selecao',
			'navigation',
			'',
			'conteudo',
			normatize(title),
			device
		)
	},
	TipPage_ClicouNext: (index, device) => {
		return track(
			'clique',
			'mobi-trekking',
			'galeria',
			'conteudo',
			'mais-imagens-avancar',
			device
		)
	},
	TipPage_ClicouPrev: (index, device) => {
		return track(
			'clique',
			'mobi-trekking',
			'galeria',
			'conteudo',
			'mais-imagens-voltar',
			device
		)
	},
	TipPage_ClicouDica: (title, caption, device) => {
		return track(
			'clique',
			'mobi-trekking',
			'galeria',
			'conteudo',
			normatize(title),
			device
		)
	},
	TipPage_MudouDica: (title, caption, device) => {
		// return track('view', 'mobi-trekking', 'galeria', 'conteudo', normatize(title), device);
	},

	// VersionsPage ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	VersionsPage_ClicouCompre: (type,version, device) => {
		return track(
			'clique',
			'todas-as-versoes',
			normatize(version),
			'conteudo',
			type,
			device
		) // ok 32
	},
	VersionsPage_ClicouOfertas: (version, device) => {
		return track(
			'clique',
			'todas-as-versoes',
			normatize(version),
			'conteudo',
			'cta-monte-a-sua',
			device
		) // ok 32
	},
	VersionsPage_ClicouAgende: (version, device) => {
		return track(
			'clique',
			'todas-as-versoes',
			normatize(version),
			'conteudo',
			'compre-o-seu',
			device
		) // ok 32
	},
	VersionsPage_GirouCarroPrimeiraVez: (version, color, label, device) => {
		// Não precisa mais disparar esse evento, o 'VersionsPage_GirouCarro' é disparado junto
		// return track('interacao', 'todas-as-versoes', normatize(version), 'conteudo', '360', device);
	},
	VersionsPage_GirouCarro: (version, color, label, device) => {
		return track(
			'interacao',
			'todas-as-versoes',
			normatize(version),
			'conteudo',
			'360',
			device
		)
	},
	VersionsPage_CarregouVersaoCarro: (version, device) => {
		// return track(
		// 	'clique',
		// 	'todas-as-versoes',
		// 	'360',
		// 	'conteudo',
		// 	'load',
		// 	device
		// )
		return track(
			'clique',
			'todas-as-versoes',
			normatize(version),
			'conteudo',
			'360-load',
			device
		)
	},
	VersionsPage_SelecionouVersaoCarro: (version, color, label, device) => {
		//*
		return track(
			'clique',
			'todas-as-versoes',
			'versao',
			'conteudo',
			normatize(version),
			device
		)
	},

	// AboutPage ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	AboutPage_ClicouTabMobile: (title, open, device) => {
		const action = `${open ? 'abertura' : 'fechamento'}`
		return track(action, 'sobre', 'sobre', 'conteudo', normatize(title), device)
	},
	AboutPage_ClicouTab: (title, device) => {
		return track(
			'abertura',
			'sobre',
			'sobre',
			'conteudo',
			normatize(title),
			device
		)
	},
	AboutPage_ClicouTab_Close: (title, device) => {
		// Pediram para remover esse disparo no desktop
		// return track('clique', 'sobre', normatize(title), 'conteudo', 'fechar', device);
	},
	AboutPage_ClicouPoster: (title, device) => {
		// Não tem ação no site atual, não precisa disparar evento.
		// return track('clique', 'sobre', normatize(title), 'conteudo', null, device);
	},
	AboutPage_ClicouBullet: (title, index, device) => {
		return track(
			'clique',
			'sobre',
			`${normatize(title)}`,
			'conteudo',
			index,
			device
		)
	},
	AboutPage_MudouPoster: (title, subsectionName, device) => {
		return track('clique', 'sobre', normatize(subsectionName), 'conteudo', normatize(title), device)
	},
	AboutPage_ArrowPrevPoster: (title, device) => {
		return track('clique', 'sobre', 'sobre', 'conteudo', 'anterior', device)
	},
	AboutPage_ArrowNextPoster: (title, device) => {
		return track('clique', 'sobre', 'sobre', 'conteudo', 'proxima', device)
	},
	AboutPage_ContentButton: (section, contentTitle, buttonLabel, device) => {
		//*
		return track(
			'clique',
			normatize(section),
			normatize(contentTitle),
			'conteudo',
			normatize(buttonLabel),
			device
		)
		// return track('clique', 'sobre', normatize(contentTitle), 'conteudo', normatize(buttonLabel), device);
		// return track('clique', 'acessorios', 'cta', 'conteudo', 'baixar-catalogo', device);
	},

	// VersaoSugerida ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	VersaoSugerida_ClicouTab: (posterTitle, thumbIndex, device) => {
		return track(
			'clique',
			'versao-sugerida',
			'versao-sugerida',
			'conteudo',
			normatize(posterTitle) || thumbIndex,
			device
		)
	},
	VersaoSugerida_ClicouThumb: (
		thumbTitle,
		thumbSlug /*, thumbIndex*/,
		device
	) => {
		return track(
			'clique',
			'versao-sugerida',
			`galeria-${thumbSlug}`,
			'conteudo',
			normatize(thumbTitle).replace(/(\d+)”/g, '$1-polegadas'),
			device
		)
	},
	VersaoSugerida_ClicouMonteOSeu: (device) => {
		return track(
			'clique',
			'versao-sugerida',
			'cta',
			'conteudo',
			'monte-o-seu',
			device
		)
	},
	VersaoSugerida_ClicouCompreOSeu: (device) => {
		return track(
			'clique',
			'versao-sugerida',
			'cta',
			'conteudo',
			'compre-o-seu',
			device
		)
	},
	VersaoSugerida_Swipe: (version, device) => {
		return track(
			'clique',
			'pre-venda',
			version,
			'conteudo',
			'swipe',
			device
		)
	},

	// GalleryPage ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	GalleryPage_ClicouPoster: (posterTitle, device) => {
		// Não tinha esse evento p/ ser trackeado no PDF enviado
		// return track('clique', 'galeria', 'galeria', 'conteudo', normatize(posterTitle), device);
	},
	GalleryPage_ClicouThumb: (thumbTitle, thumbIndex, device) => {
		// Não tinha esse evento p/ ser trackeado no PDF enviado
		// return track('clique', 'galeria', 'galeria', 'conteudo', normatize(thumbTitle), device);
		return track(
			'clique',
			'galeria',
			'galeria',
			'conteudo',
			`${normatize(thumbTitle)}-${thumbIndex}`,
			device
		)
	},
	GalleryPage_ClicouBullet: (title, device) => {
		// Não tinha esse evento p/ ser trackeado no PDF enviado
	},
	GalleryPage_MudouPoster: (index, device) => {
		return track('clique', 'galeria', 'galeria', 'conteudo', index, device)
	},
	Galeria_C2A_LinkAgende: (title, device) => {
		return track('clique', 'galeria', 'cta', 'conteudo', 'compre-o-seu', device)
	},
	Galeria_C2A_Fechou: (title, device) => {
		return track('clique', 'galeria', 'cta', 'conteudo', 'fechar', device)
	},
	GalleryPage_OpenZoom: () => {
		return null
	},
	GalleryPage_Swipe: (device) => {
		return track('clique', 'galeria', 'galeria', 'conteudo', 'swipe', device)
	},

	// ActionPage ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	ActionPage_ClicouNavItem: (name, device) => {
		return track(
			'clique',
			'cta-mobile',
			'cta',
			'footer',
			normatize(name),
			device
		)
	},
	ActionPage_ClicouSocialItem: (name, device) => {
		return track('clique', 'social', 'rede-social', 'footer', normatize(name), device)
	},

	ActionPage_ClicouFecharPrivacidade: (name, device) => {
		return track('clique', 'modal', 'modal-privacidade', 'conteudo', "fechar", device)
	},

	ActionPage_ClicouAgendeSeuTesteDrive: (name, device) => {
		return track(
			'clique',
			'cta-mobile',
			'cta',
			'footer',
			normatize(name),
			device
		)
	},

	// OffersPage ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	OffersCard_ClicouEuQuero: (id, mvsCode, device) => {
		return null
	},
	OffersCard_ClicouShare: (title, device) => {
		return null
	},
	OffersPage_ScrollOfertas: (title, device) => {
		return null
	},

	// Banner ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	Banner_ClicouLink: (device) => {
		return null
	},

	// WhatsApp Fold ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	Whatsapp_AbrirConversa: (section, device) => {
		return track(
			'selecao',
			'navigation',
			'',
			'',
			section,
			device
		)
	},

	// Citroen Advisor ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	Citroen_ClicouAdvisor: (section, device) => {
		return track(
			'selecao',
			'botao',
			'',
			'',
			section,
			device
		)
	},
}

export default data;
