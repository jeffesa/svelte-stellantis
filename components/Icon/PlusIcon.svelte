<script>
  export let styles = ''
  export let scale = 1;
</script>

<style>
  i {
    zoom: var(--scale, 1);
    &::before,
    &::after {
      content: " ";
      width: 2px;
      height: auto;
      background: #fff;
      position: absolute;
      /* right: 50%; */
      top: 0;
      bottom: 0;
    }
    &::before {
      transform: rotateZ(90deg);
    }
  }

  @screen sm {
    i {
      &::before,
      &::after {
        background: var(--color) !important;
      }
    }
  }
</style>

<i
  style="{styles}"
  class="relative flex justify-center items-center {$$props.class || ''}"
  rel="icon"
  role="icon" 
/>
