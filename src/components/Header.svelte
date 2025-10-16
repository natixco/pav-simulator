<script lang="ts">
  import { locale } from '$lib/translations';
  import { t } from '$lib/translations/index.js';
  import { goto } from '$app/navigation';
  import LanguageSwitcher from './LanguageSwitcher.svelte';
  import { page } from '$app/state';

  console.log(page.url.pathname);

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

<div class="flex flex-row items-center justify-between w-full">
    <button onclick={() => navigate()} class="text-zinc-900 font-bold text-2xl my-10 cursor-pointer">
        {$t("TITLE")}
    </button>
    <div class="flex flex-row items-center justify-center gap-4">
        <button onclick={() => navigate('determination-test')}
                class={[
            'h-10 px-10 font-bold text-sm cursor-pointer tracking-wider',
            active('determination-test') ? 'bg-stone-900 text-stone-50' : 'text-stone-900 border-b-2 border-transparent hover:border-b-stone-900',
        ]}>
            {$t("DETERMINATION_TEST")}
        </button>
        <button onclick={() => navigate('monotony-test')}
                class={[
            'h-10 px-10 font-bold text-sm cursor-pointer tracking-wider',
            active('monotony-test') ? 'bg-stone-900 text-stone-50' : 'text-stone-900 border-b-2 border-transparent hover:border-b-stone-900',
        ]}>
            {$t("MONOTONY_TEST")}
        </button>
    </div>
    <LanguageSwitcher/>
</div>
