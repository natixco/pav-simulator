<script lang="ts">
  import { t } from '$lib/translations/index.js';
  import Instructions from '../../../components/Instructions.svelte';
  import PseudoSignalControls from '../../../components/PseudoSignalControls.svelte';
  import TestSettings from '../../../components/TestSettings.svelte';
  import Keybindings from '../../../components/Keybindings.svelte';
  import Results from '../../../components/Results.svelte';
  import Tabs from '../../../components/Tabs.svelte';
  import Header from '../../../components/Header.svelte';

  let activeTab = $state('keybindings');
</script>

<Header />

<div class="flex flex-col gap-20 pb-10">
    <PseudoSignalControls/>
    <Instructions/>
    <TestSettings/>
    <div>
        <Tabs tabs={[
                { id: 'keybindings', label: $t('KEYBINDINGS.TITLE') },
                { id: 'results', label: $t('RESULTS.TITLE') }
            ]}
              {activeTab}
              onTabChange={(id) => activeTab = id}
        />
        {#if activeTab === 'keybindings'}
            <Keybindings/>
        {:else}
            <Results/>
        {/if}
    </div>
</div>
