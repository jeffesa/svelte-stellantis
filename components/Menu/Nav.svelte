<ul class="pt-6 pb-20 sm:pt-2 overflow-y-auto {$$props.class || ''}">
	<slot />
</ul>

<style>
	ul {
		height: calc(100vh - 3rem);

		&::-webkit-scrollbar {
			width: 6px;
		}

		&::-webkit-scrollbar-thumb {
			background-color: #ebeaea;
		}
	}
</style>
