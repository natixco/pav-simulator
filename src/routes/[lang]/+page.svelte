<script lang="ts">
  import { t } from '$lib/translations/index.js';
  import Header from '../../components/Header.svelte';
  import Container from '../../components/Container.svelte';
</script>

<svelte:head>
    <title>{$t("TITLE")}</title>
</svelte:head>

<Header/>

<Container>
    <div class="flex flex-col items-center gap-6">
        <p class="text-xl text-stone-900">
            {$t('HOME.1')}
        </p>
        <p class="text-xl text-stone-900">
            {$t('HOME.2')}
        </p>
    </div>
</Container>