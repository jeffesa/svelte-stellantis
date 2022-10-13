<script>
  import { path, device as device$ } from '~/lib'
  
  const lazyModal = () => import('./Modal.svelte')
  const lazyModalMobile = () => import('./ModalMobile.svelte')
  const lazyReview = () => import('./Review.svelte')
  const lazyForm = () => import('../FormSchedule.svelte')

  export let name
</script>

{#if $path === name && $path === 'agenda'}
  {#await lazyForm() then Form}
    <svelte:component this="{Form.default}" />
  {/await}
{:else if $path === name && $path === 'avaliacoes'}
  {#await lazyReview() then Review}
    <svelte:component this="{Review.default}" {...$$props} />
  {/await}
{:else if $path === name}
  {#if $device$.isMobile}
    {#await lazyModalMobile() then Modal}
      <svelte:component this="{Modal.default}" {...$$props} />
    {/await}
  {:else}
    {#await lazyModal() then Modal}
      <svelte:component this="{Modal.default}" {...$$props} />
    {/await}
  {/if}
{/if}
