import Layout from './Layout.svelte'

if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register('/sw.js')
}

const page = new Layout({
	target: document.querySelector('.page-wrap')
})

export default page

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://www.snowpack.dev/#hot-module-replacement
if (import.meta.hot) {
	import.meta.hot.accept()
	import.meta.hot.dispose(() => {
		page.$destroy()
	})
}
