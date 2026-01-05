<script lang="ts">
  import { locales, setLocale } from '$lib/translations';
  import { goto } from '$app/navigation';
  import { page } from '$app/state';
  import Button from './Button.svelte';

  function switchLanguage(newLocale: string) {
    const url = new URL(window.location.href);
    const currentPath = url.pathname.split('/').filter(Boolean);

    if (currentPath[0] === page.params.lang) {
      currentPath.shift();
    }

    url.pathname = `/${newLocale}${currentPath.length ? '/' + currentPath.join('/') : ''}`;
    goto(url);
    setLocale(newLocale);
  }

  const languages: any = {
    en: 'English',
    hu: 'Magyar',
  };
</script>

<div class="flex gap-2">
    {#each locales.get() as loc}
        <Button label={languages[loc]}
                variant={page.params.lang === loc ? 'secondary' : 'ghost'}
                disabled={page.params.lang === loc}
                size="sm"
                onClick={() => switchLanguage(loc)}/>
    {/each}
</div>