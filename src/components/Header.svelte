<script lang="ts">
  import { locale } from '$lib/translations';
  import { t } from '$lib/translations/index.js';
  import { goto } from '$app/navigation';
  import LanguageSwitcher from './LanguageSwitcher.svelte';
  import { page } from '$app/state';
  import Button from './Button.svelte';

  function navigate(pathname?: string) {
    const url = new URL(window.location.href);
    url.search = '';
    url.pathname = pathname ? `${locale.get()}/${pathname}` : `${locale.get()}`;
    goto(url);
  }

  function active(pathname: string) {
    return page.url.pathname === `/${locale.get()}/${pathname}`;
  }
</script>

<div class="w-full flex flex-row items-center max-w-[95vw] xl:max-w-6xl mx-auto px-5">
    <div
            class="flex flex-col items-center w-full"
    >
        <div
                class="flex flex-row items-center justify-between w-full mt-10 mb-20 bg-white p-4"
        >
            <button
                    onclick={() => navigate()}
                    class="text-zinc-900 font-bold text-2xl cursor-pointer"
            >
                {$t("TITLE")}
            </button>
            <div class="flex flex-row items-center justify-center gap-4">
                <Button label={$t("DETERMINATION_TEST.TITLE")} size="base"
                        variant={ active("determination-test") ? 'primary' : 'outline'}
                        disabled={ active("determination-test")}
                        onClick={() => navigate("determination-test")}/>
                <Button label={$t("MONOTONY_TEST.TITLE")} size="base"
                        variant={ active("monotony-test") ? 'primary' : 'outline'}
                        disabled={ active("monotony-test")}
                        onClick={() => navigate("monotony-test")}/>
            </div>
            <LanguageSwitcher/>
        </div>
    </div>
</div>
