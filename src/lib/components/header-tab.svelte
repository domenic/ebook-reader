<script lang="ts">
  import type { MouseEventHandler } from 'svelte/elements';
  import type { IconDefinition } from '@fortawesome/free-solid-svg-icons';
  import HeaderLabeledContent from '$lib/components/header-labeled-content.svelte';
  import { ripple } from '$lib/components/ripple';

  interface Props {
    icon: IconDefinition;
    label: string;
    active?: boolean;
    title?: string;
    onclick?: MouseEventHandler<HTMLButtonElement>;
  }

  let { icon, label, active = false, title, onclick }: Props = $props();
</script>

<button
  use:ripple
  {title}
  class="flex flex-col items-center justify-center h-12 px-3 text-xs cursor-pointer xl:h-10"
  class:bg-gray-900={active}
  class:hover:bg-gray-800={active}
  class:hover:bg-gray-900={!active}
  {onclick}
>
  <HeaderLabeledContent {icon} {label} />
</button>
