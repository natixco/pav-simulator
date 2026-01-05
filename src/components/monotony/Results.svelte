<script lang="ts">
  import { t } from '$lib/translations';
  import { monotonyStore } from '$lib/results';

  const results = monotonyStore.getAll();
</script>

<div>
    <p class="text-stone-900 font-medium mb-4">{$t('RESULTS.TITLE')}</p>
    {#if results.length > 0}
        <div class="flex flex-col gap-4 w-full">
            <div class="grid grid-cols-1 gap-4">
                {#each results.reverse() as result}
                    <div class="bg-stone-200 p-4 rounded-md border border-stone-400 flex flex-col gap-6">
                        <div class="text-sm text-stone-600">
                            {new Date(result.timestamp).toLocaleString()}
                        </div>
                        <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
                            <div>
                                <div class="text-sm text-stone-600">
                                    {$t('RESULTS.TOTAL')}
                                </div>
                                <div class="font-medium text-stone-900">
                                    {result.total ?? 0}
                                </div>
                            </div>
                            <div>
                                <div class="text-sm text-stone-600">
                                    {$t('RESULTS.CORRECT')}
                                </div>
                                <div class="font-medium text-stone-900">
                                    {result.correct ?? 0}
                                </div>
                            </div>
                            <div>
                                <div class="text-sm text-stone-600">
                                    {$t('RESULTS.ACCURACY')}
                                </div>
                                <div class="font-medium text-stone-900">
                                    {result.total ? Math.round((result.correct / result.total) * 100) : 0}%
                                </div>
                            </div>
                        </div>
                    </div>
                {/each}
            </div>
        </div>
    {:else}
        <div class="flex flex-col items-center justify-center text-center py-10">
            <p class="text-stone-900">{$t('RESULTS.EMPTY')}</p>
        </div>
    {/if}
</div>
