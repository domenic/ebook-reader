<script lang="ts">
  import { faBookmark as farBookmark } from '@fortawesome/free-regular-svg-icons';
  import {
    faBookmark as fasBookmark,
    faCrosshairs,
    faExpand,
    faFlag,
    faHashtag,
    faImages,
    faList,
    faRotateLeft
  } from '@fortawesome/free-solid-svg-icons';
  import { readerImageGalleryPictures$ } from '$lib/components/book-reader/book-reader-image-gallery/book-reader-image-gallery';
  import HeaderIconButton from '$lib/components/header-icon-button.svelte';
  import HeaderLabeledContent from '$lib/components/header-labeled-content.svelte';
  import HeaderNavTabs from '$lib/components/header-nav-tabs.svelte';
  import Popover from '$lib/components/popover/popover.svelte';
  import {
    baseHeaderClasses,
    headerDividerClasses,
    labelIconClasses,
    nTranslateXHeaderFa,
    translateXHeaderFa
  } from '$lib/css-classes';
  import { customReadingPointEnabled$, viewMode$ } from '$lib/data/store';
  import { ViewMode } from '$lib/data/view-mode';
  import { dummyFn, isMobile$ } from '$lib/functions/utils';
  import Fa from 'svelte-fa';

  interface Props {
    hasChapterData: boolean;
    hasText: boolean;
    autoScrollMultiplier: number;
    hasCustomReadingPoint: boolean;
    showFullscreenButton: boolean;
    isBookmarkScreen: boolean;
    hasBookmarkData: boolean;
    ontocClick?: () => void;
    onbookmarkClick?: () => void;
    onscrollToBookmarkClick?: () => void;
    onjumpClick?: () => void;
    oncompleteBook?: () => void;
    onfullscreenClick?: () => void;
    onshowCustomReadingPoint?: () => void;
    onsetCustomReadingPoint?: () => void;
    onresetCustomReadingPoint?: () => void;
    onstatisticsClick?: () => void;
    onreaderImageGalleryClick?: () => void;
    onsettingsClick?: () => void;
    onbookManagerClick?: () => void;
  }

  let {
    hasChapterData,
    hasText,
    autoScrollMultiplier,
    hasCustomReadingPoint,
    showFullscreenButton,
    isBookmarkScreen = $bindable(),
    hasBookmarkData,
    ontocClick,
    onbookmarkClick,
    onscrollToBookmarkClick,
    onjumpClick,
    oncompleteBook,
    onfullscreenClick,
    onshowCustomReadingPoint,
    onsetCustomReadingPoint,
    onresetCustomReadingPoint,
    onstatisticsClick,
    onreaderImageGalleryClick,
    onsettingsClick,
    onbookManagerClick
  }: Props = $props();

  let customReadingPointMenuItems = $derived([
    ...(hasCustomReadingPoint ? [{ label: 'Show Point', action: onshowCustomReadingPoint }] : []),
    { label: 'Set Point', action: onsetCustomReadingPoint },
    ...(hasCustomReadingPoint ? [{ label: 'Reset Point', action: onresetCustomReadingPoint }] : [])
  ]);

  let customReadingPointMenuElm: Popover = $state(undefined as any);

  function dispatchCustomReadingPointAction(action: (() => void) | undefined) {
    action?.();
    customReadingPointMenuElm.toggleOpen();
  }
</script>

<div class="flex justify-between bg-gray-700 px-4 md:px-8 {baseHeaderClasses}">
  <div class="flex transform-gpu {nTranslateXHeaderFa}">
    {#if hasChapterData}
      <HeaderIconButton
        icon={faList}
        title="Open Table of Contents"
        label="TOC"
        onclick={() => ontocClick?.()}
      />
    {/if}
    <HeaderIconButton
      icon={isBookmarkScreen ? fasBookmark : farBookmark}
      title="Create Bookmark"
      label="Bookmark"
      onclick={() => onbookmarkClick?.()}
    />
    {#if hasBookmarkData}
      <HeaderIconButton
        icon={faRotateLeft}
        title="Return to Bookmark"
        label="Return to Bookmark"
        onclick={() => onscrollToBookmarkClick?.()}
      />
    {/if}
    {#if $viewMode$ === ViewMode.Continuous && !$isMobile$}
      <div
        class="flex items-center px-4 text-xl xl:px-3 xl:text-lg"
        title="Current Autoscroll Speed"
      >
        {autoScrollMultiplier}x
      </div>
    {/if}
    <HeaderIconButton
      icon={faFlag}
      title="Complete Book"
      label="Complete Book"
      onclick={() => oncompleteBook?.()}
    />
    {#if showFullscreenButton}
      <HeaderIconButton
        icon={faExpand}
        title="Toggle Fullscreen"
        label="Fullscreen"
        onclick={() => onfullscreenClick?.()}
      />
    {/if}
    {#if hasText}
      <HeaderIconButton
        icon={faHashtag}
        title="Jump to Position"
        label="Jump"
        onclick={() => onjumpClick?.()}
      />
    {/if}
    {#if $readerImageGalleryPictures$.length}
      <HeaderIconButton
        icon={faImages}
        title="Open Image Gallery"
        label="Images"
        onclick={() => onreaderImageGalleryClick?.()}
      />
    {/if}
  </div>

  <div class="flex transform-gpu {translateXHeaderFa}">
    {#if $customReadingPointEnabled$ || $viewMode$ === ViewMode.Paginated}
      <div class="flex">
        <Popover
          placement="bottom"
          fallbackPlacements={['bottom-end', 'bottom-start']}
          yOffset={0}
          bind:this={customReadingPointMenuElm}
        >
          {#snippet icon()}
            <div title="Open Custom Point Actions" class={labelIconClasses}>
              <HeaderLabeledContent icon={faCrosshairs} label="Point ▾" />
            </div>
          {/snippet}
          {#snippet content()}
            <div class="w-40 bg-gray-700 md:w-32">
              {#each customReadingPointMenuItems as actionItem (actionItem.label)}
                <div
                  tabindex="0"
                  role="button"
                  class="px-4 py-2 text-sm hover:bg-white hover:text-gray-700"
                  onclick={() => dispatchCustomReadingPointAction(actionItem.action)}
                  onkeyup={dummyFn}
                >
                  {actionItem.label}
                </div>
              {/each}
            </div>
          {/snippet}
        </Popover>
      </div>
      <div class={headerDividerClasses}></div>
    {/if}
    <HeaderNavTabs
      disableNavigation
      onnavigate={(routeId) => {
        if (routeId === '/statistics') onstatisticsClick?.();
        else if (routeId === '/settings') onsettingsClick?.();
        else if (routeId === '/manage') onbookManagerClick?.();
      }}
    />
  </div>
</div>
