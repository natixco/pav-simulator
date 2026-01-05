<script lang="ts">
  import { t } from '$lib/translations/index.js';
  import PseudoSignalControls from '../../../components/determination/PseudoSignalControls.svelte';
  import Settings from '../../../components/determination/Settings.svelte';
  import Keybindings from '../../../components/determination/Keybindings.svelte';
  import Results from '../../../components/determination/Results.svelte';
  import Tabs from '../../../components/Tabs.svelte';
  import Header from '../../../components/Header.svelte';
  import Container from '../../../components/Container.svelte';
  import Instructions from '../../../components/Instructions.svelte';

  let activeTab = $state('keybindings');
</script>

<Header/>
<Container>
    <div class="flex flex-col gap-20 pb-10">
        <PseudoSignalControls/>
        <Instructions descriptions={["DETERMINATION_TEST.INSTRUCTIONS.DESCRIPTION"]}
                      i18nKeys={[
            'DETERMINATION_TEST.INSTRUCTIONS.STEPS.MODE',
            'DETERMINATION_TEST.INSTRUCTIONS.STEPS.SPEED',
            'DETERMINATION_TEST.INSTRUCTIONS.STEPS.COLORS',
            'DETERMINATION_TEST.INSTRUCTIONS.STEPS.PEDALS',
            'DETERMINATION_TEST.INSTRUCTIONS.STEPS.SOUNDS',
            'DETERMINATION_TEST.INSTRUCTIONS.STEPS.TIMING'
        ]}/>
        <Settings/>
        <div>
            <Tabs
                    tabs={[
          { id: "keybindings", label: $t("KEYBINDINGS.TITLE") },
          { id: "results", label: $t("RESULTS.TITLE") },
        ]}
                    {activeTab}
                    onTabChange={(id) => (activeTab = id)}
            />
            {#if activeTab === "keybindings"}
                <Keybindings/>
            {:else}
                <Results/>
            {/if}
        </div>
    </div>
</Container>
