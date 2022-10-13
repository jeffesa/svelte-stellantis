<script>
	export let nextTooltip = ''
	export let isBetween = false
</script>

<style>
	.ArrowControl {
		& .ArrowControl-wrap {
			@apply flex items-center;
		}

    :not(.isBetween) {
      @apply mr-4;
    }

		.isBetween {
			@apply w-full justify-between;
		}

		.text-next {
			color: #333;
			font-size: 14px;
		}
		.text-red {
			font-size: 14px;
		}
	}
</style>

<div class="ArrowControl flex items-center {$$props.class || ''}">
	<div class="ArrowControl-wrap" class:isBetween>
		<slot />
	</div>
	{#if nextTooltip}
		<div class="flex flex-col">
			<span class="text-next text-xs text-secondary">Próximo</span>
			<span class="text-red text-xs font-bold text-secondary"> {nextTooltip} </span>
		</div>
	{/if}
</div>
