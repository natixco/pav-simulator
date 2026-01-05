<script lang="ts">
  let { tabs, activeTab, onTabChange } = $props<{
    tabs: { id: string; label: string }[];
    activeTab: string;
    onTabChange: (tabId: string) => void;
  }>();
</script>

<div class="flex gap-2 p-2 border border-stone-400 mb-4 bg-white">
    {#each tabs as tab}
        <button class={[
                'flex-1 px-4 py-1.5 cursor-pointer font-medium',
                activeTab === tab.id
                    ? 'bg-stone-900 text-white'
                    : 'bg-transparent text-stone-900 hover:bg-stone-200'
            ]}
                onclick={() => onTabChange(tab.id)}
        >
            {tab.label}
        </button>
    {/each}
</div> 