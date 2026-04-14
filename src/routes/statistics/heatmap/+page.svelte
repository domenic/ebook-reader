<script lang="ts">
  import StatisticsHeatmap from '$lib/components/statistics/statistics-heatmap/statistics-heatmap.svelte';
  import StatisticsShell from '$lib/components/statistics/statistics-shell.svelte';
  import { HeatmapType } from '$lib/components/statistics/statistics-heatmap/statistics-heatmap';
  import {
    lastReadingDataHeatmapAggregationMode$,
    lastReadingGoalsHeatmapAggregationMode$
  } from '$lib/data/store';
  import { formatPageTitle } from '$lib/functions/format-page-title';
</script>

<svelte:head>
  <title>{formatPageTitle('Statistics Heatmap')}</title>
</svelte:head>

<StatisticsShell>
  {#snippet children({ readingGoals, statisticsData, statisticsTitleFilters })}
    <StatisticsHeatmap
      {statisticsData}
      {readingGoals}
      {statisticsTitleFilters}
      bind:heatmapAggregration={$lastReadingDataHeatmapAggregationMode$}
    />
    {#if readingGoals.length}
      <div class="mt-8 sm:mt-16">
        <StatisticsHeatmap
          {statisticsData}
          {readingGoals}
          {statisticsTitleFilters}
          heatmapType={HeatmapType.READING_GOALS}
          bind:heatmapAggregration={$lastReadingGoalsHeatmapAggregationMode$}
        />
      </div>
    {/if}
  {/snippet}
</StatisticsShell>
