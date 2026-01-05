<script lang="ts">
  import { locale, t } from '$lib/translations';
  import { goto, pushState } from '$app/navigation';
  import { page } from '$app/state';
  import { SPEED, TEST_MODE, type TestMode } from '$lib';
  import Button from '../Button.svelte';

  const speeds = [SPEED.SLOW, SPEED.MEDIUM, SPEED.FAST];
  const modes = [TEST_MODE.UNLIMITED, TEST_MODE.LIMITED];

  let selectedSpeed = $state(page.url.searchParams.get('speed') ?? SPEED.SLOW);
  let selectedMode = $state<TestMode>(page.url.searchParams.get('mode') as TestMode ?? TEST_MODE.LIMITED);
  let durationMinutes = $state(parseInt(page.url.searchParams.get('duration') ?? '2', 10));

  function updateSearchParams(params: Record<string, string | undefined>): void {
    const url = new URL(window.location.href);
    Object.entries(params).forEach(([key, value]) => {
      if (value === undefined) {
        url.searchParams.delete(key);
      } else {
        url.searchParams.set(key, value);
      }
    });
    pushState(url, {});
  }

  function selectSpeed(speed: string): void {
    selectedSpeed = speed;
    updateSearchParams({ speed });
  }

  function selectMode(mode: TestMode): void {
    selectedMode = mode;
    updateSearchParams({
      mode,
      duration: mode === TEST_MODE.LIMITED ? durationMinutes.toString() : undefined
    });
  }

  function updateDuration(minutes: number): void {
    durationMinutes = minutes;
    if (selectedMode === TEST_MODE.LIMITED) {
      updateSearchParams({ duration: minutes.toString() });
    }
  }

  function start(): void {
    const url = new URL(window.location.href);
    url.pathname = `${locale.get()}/determination-test/test`;
    url.searchParams.set('speed', selectedSpeed);
    url.searchParams.set('mode', selectedMode);
    if (selectedMode === TEST_MODE.LIMITED) {
      url.searchParams.set('duration', durationMinutes.toString());
    } else {
      url.searchParams.delete('duration');
    }
    goto(url);
  }

  function getSpeedLabel(speed: string): string {
    const labels: Record<string, string> = {
      slow: $t('DETERMINATION_TEST.SETTINGS.SPEED.SLOW'),
      medium: $t('DETERMINATION_TEST.SETTINGS.SPEED.MEDIUM'),
      fast: $t('DETERMINATION_TEST.SETTINGS.SPEED.FAST')
    }
    return labels[speed];
  }
</script>

<div class="flex flex-col items-center gap-6">
    <div class="text-center">
        <h2 class="text-xl font-semibold mb-2">
            {$t('DETERMINATION_TEST.SETTINGS.INSTRUCTIONS')}
        </h2>
    </div>

    <div class="flex flex-col items-center gap-2 w-full max-w-2xl">
        <p class="tracking-wide font-medium">
            {$t('DETERMINATION_TEST.SETTINGS.TEST_MODE.TITLE')}
        </p>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            {#each modes as mode}
                <button class={[
                            'border-2 bg-stone-100 p-4 flex flex-col items-center gap-2 cursor-pointer',
                            selectedMode === mode
                                ? 'border-stone-900'
                                : 'border-stone-200 hover:border-stone-900'
                        ]}
                        onclick={() => selectMode(mode)}
                >
                    <span class="font-medium tracking-wider text-stone-900">
                        {$t(`DETERMINATION_TEST.SETTINGS.TEST_MODE.${mode.toUpperCase()}.TITLE`)}
                    </span>
                    <span class="text-sm text-stone-700 text-center">
                        {$t(`DETERMINATION_TEST.SETTINGS.TEST_MODE.${mode.toUpperCase()}.DESCRIPTION`)}
                    </span>
                </button>
            {/each}
        </div>
    </div>

    <div class="flex flex-col items-center gap-2 w-full max-w-2xl">
        <p class="tracking-wide font-medium">
            {$t('DETERMINATION_TEST.SETTINGS.SPEED.TITLE')}
        </p>
        <div class="grid grid-cols-3 grid-rows-1 gap-4 w-full">
            {#each speeds as speed}
                <button class={[
                            'border-2 bg-stone-100 h-12 px-6 flex items-center justify-center cursor-pointer',
                            selectedSpeed === speed
                                ? 'border-stone-900'
                                : 'border-stone-200 hover:border-stone-900'
                        ]}
                        onclick={() => selectSpeed(speed)}
                >
                    <span class="font-medium text-sm tracking-wider text-stone-900">
                        {getSpeedLabel(speed)}
                    </span>
                </button>
            {/each}
        </div>
    </div>

    {#if selectedMode === TEST_MODE.LIMITED}
        <div class="flex flex-col items-center gap-2">
            <p class="tracking-wide font-medium">
                {$t('DETERMINATION_TEST.SETTINGS.DURATION.TITLE')}
            </p>
            <div class="flex items-center justify-center gap-2">
                <input type="number"
                       min="1"
                       max="60"
                       value={durationMinutes}
                       oninput={e => updateDuration(e.currentTarget.valueAsNumber)}
                       class="w-16 h-10 px-2 border-2 border-stone-900 outline-none text-center bg-stone-100 focus:border-stone-700"
                />
                <span class="text-sm text-stone-600">{$t('DETERMINATION_TEST.SETTINGS.DURATION.MINUTES')}</span>
            </div>
        </div>
    {/if}

    <Button label="Start" size="base" variant="primary" onClick={() => start()}/>
</div> 