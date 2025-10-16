<script lang="ts">
  import { t } from '$lib/translations/index.js';
  import Header from '../../components/Header.svelte';
</script>

<svelte:head>
    <title>{$t("TITLE")}</title>
</svelte:head>

<Header/>