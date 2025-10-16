<script lang="ts">
  import { t } from '$lib/translations';
</script>

<div class="flex flex-col gap-4">
    <p class="text-stone-600">
        {$t('MONOTONY_INSTRUCTIONS.DESCRIPTION')}
    </p>

    <div class="flex flex-col gap-2">
        <h2 class="text-xl font-semibold">
            {$t('MONOTONY_INSTRUCTIONS.HOW_TO_PLAY')}
        </h2>

        <ul class="list-disc list-inside flex flex-col gap-2">
            <li>{$t('MONOTONY_INSTRUCTIONS.STEPS.GOAL')}</li>
            <li>{$t('MONOTONY_INSTRUCTIONS.STEPS.KEYS')}</li>
            <li>{$t('MONOTONY_INSTRUCTIONS.STEPS.DURATION')}</li>
            <li>{$t('MONOTONY_INSTRUCTIONS.STEPS.SCORING')}</li>
            <li>{$t('MONOTONY_INSTRUCTIONS.STEPS.TIPS')}</li>
        </ul>
    </div>
</div>

