<script lang="ts">
  import { locale } from '$lib/translations';
  import { goto } from '$app/navigation';
  import Header from '../../../components/Header.svelte';
  import Results from '../../../components/monotony/Results.svelte';
  import Button from '../../../components/Button.svelte';
  import Container from '../../../components/Container.svelte';
  import Instructions from '../../../components/Instructions.svelte';

  function start(): void {
    const url = new URL(window.location.href);
    url.search = '';
    url.pathname = `${locale.get()}/monotony-test/test`;
    goto(url);
  }

</script>

<Header/>
<Container>
    <div class="flex flex-col gap-20 pb-10">
        <Instructions
                descriptions={["MONOTONY_TEST.INSTRUCTIONS.DESCRIPTION","MONOTONY_TEST.INSTRUCTIONS.DESCRIPTION2"]}
                i18nKeys={[
            'MONOTONY_TEST.INSTRUCTIONS.STEPS.GOAL',
            'MONOTONY_TEST.INSTRUCTIONS.STEPS.KEYS',
            'MONOTONY_TEST.INSTRUCTIONS.STEPS.DURATION',
            'MONOTONY_TEST.INSTRUCTIONS.STEPS.SCORING',
            'MONOTONY_TEST.INSTRUCTIONS.STEPS.TIPS'
        ]}/>

        <div class="flex flex-col items-center gap-6">
            <Button label="Start" size="base" variant="primary" onClick={() => start()}/>
        </div>

        <Results/>
    </div>
</Container>
