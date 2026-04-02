<script lang="ts">
  import type { MouseEventHandler } from 'svelte/elements';
  import type { IconDefinition } from '@fortawesome/free-solid-svg-icons';
  import HeaderLabeledContent from '$lib/components/header-labeled-content.svelte';
  import { labelIconClasses } from '$lib/css-classes';
  import type { Snippet } from 'svelte';
  import { dummyFn } from '$lib/functions/utils';

  interface Props {
    icon?: IconDefinition;
    title: string;
    label?: string;
    disabled?: boolean;
    onclick?: MouseEventHandler<HTMLDivElement>;
    iconContent?: Snippet;
    labelContent?: Snippet;
  }

  let {
    icon,
    title,
    label,
    disabled = false,
    onclick,
    iconContent,
    labelContent
  }: Props = $props();
</script>

<div
  tabindex="0"
  role="button"
  {title}
  class={labelIconClasses}
  style:cursor={disabled ? 'not-allowed' : undefined}
  {onclick}
  onkeyup={dummyFn}
>
  <HeaderLabeledContent {icon} {label} {iconContent} {labelContent} />
</div>
