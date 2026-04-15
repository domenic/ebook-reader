<script lang="ts">
  import type { RouteId } from '$app/types';
  import { faBookOpenReader, faClock, faDatabase } from '@fortawesome/free-solid-svg-icons';
  import HeaderButton from '$lib/components/header-button.svelte';
  import HeaderNavTabs from '$lib/components/header-nav-tabs.svelte';
  import type { SettingsRoute } from '$lib/components/settings/settings-route';
  import { baseHeaderClasses, pxScreen } from '$lib/css-classes';

  interface Props {
    activeRouteId?: RouteId | null;
    onselect?: (href: SettingsRoute) => void;
  }

  interface SettingItem {
    label: string;
    href: SettingsRoute;
    icon: typeof faBookOpenReader;
  }

  let { activeRouteId, onselect }: Props = $props();

  const settingItems: SettingItem[] = [
    {
      label: 'Reader',
      href: '/settings/reader',
      icon: faBookOpenReader
    },
    {
      label: 'Data',
      href: '/settings/data',
      icon: faDatabase
    },
    {
      label: 'Statistics',
      href: '/settings/statistics',
      icon: faClock
    }
  ];
</script>

<div class={baseHeaderClasses}>
  <div class="{pxScreen} flex h-full justify-between px-0 md:px-5">
    <div class="flex">
      {#each settingItems as settingItem (settingItem.label)}
        <HeaderButton
          faIcon={settingItem.icon}
          label={settingItem.label}
          selected={activeRouteId === settingItem.href}
          variant="tab"
          onclick={() => onselect?.(settingItem.href)}
        />
      {/each}
    </div>
    <div class="flex">
      <HeaderNavTabs />
    </div>
  </div>
</div>
