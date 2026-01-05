<script lang="ts">
  let { children } = $props();
</script>

<div class="flex flex-col items-center w-full max-w-4xl mx-auto">
    {@render children()}
</div>
