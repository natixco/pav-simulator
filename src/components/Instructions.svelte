<script lang="ts">
  import { t } from '$lib/translations';

  let { descriptions, i18nKeys }: { descriptions: string[]; i18nKeys: string[]; } = $props();
</script>

<div class="flex flex-col gap-4">
    {#each descriptions as description}
        <p class="text-stone-600">
            {$t(description)}
        </p>
    {/each}

    <div class="flex flex-col gap-2">
        <h2 class="text-xl font-semibold">
            {$t('TEST_INSTRUCTIONS')}
        </h2>

        <ul class="list-disc list-inside flex flex-col gap-2">
            {#each i18nKeys as key}
                <li>{$t(key)}</li>
            {/each}
        </ul>
    </div>
</div>