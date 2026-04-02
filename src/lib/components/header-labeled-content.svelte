<script lang="ts">
  import type { IconDefinition } from '@fortawesome/free-solid-svg-icons';
  import type { Snippet } from 'svelte';
  import { labeledHeaderIconClasses } from '$lib/css-classes';
  import Fa from 'svelte-fa';

  interface Props {
    icon?: IconDefinition;
    label?: string;
    iconContent?: Snippet;
    labelContent?: Snippet;
  }

  let { icon, label, iconContent, labelContent }: Props = $props();
</script>

{#if iconContent}
  {@render iconContent()}
{:else if icon}
  <Fa {icon} class={labeledHeaderIconClasses} />
{/if}

{#if labelContent}
  {@render labelContent()}
{:else if label}
  <span>{label}</span>
{/if}
