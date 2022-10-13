<script>
	import Icon from './Icon'
	import theme from '~/lib/theme'

	export let styles = {}
</script>

<style>
	.flag {
		background: var(--flag-color, theme('colors.primary.DEFAULT'));
		clip-path: polygon(0 0, 100% 0%, calc(100% - 5px) 100%, 0% 100%);
	}

	.flag-base {
		@apply absolute h-3 w-1/2;
		bottom: -0.65rem;
	}

	.flag-xs {
		@apply relative h-2 self-end ml-4 w-1/3;
		bottom: -0.45rem;
	}
</style>

<div class="flex w-10/12 h-12 m-auto {$$props.class || ''}">
	<div class="relative flex w-6/12 h-full">
		<Icon.Brand class="self-end ml-4 mt-2" color="{theme.colors.white}" sizes="{['1.5rem']}" />
		<div style="{styles.flag}" class="z-10 flag flag-base"></div>
	</div>
	<div class="relative flex w-6/12 h-full">
		<Icon.Brand class="h-full" color="{theme.colors.white}" sizes="{['5rem', 'inherit']}" />
		<div style="{styles.flag}" class="z-10 flag flag-xs"></div>
	</div>
</div>
