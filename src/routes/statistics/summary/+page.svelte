<script lang="ts">
  import StatisticsShell from '$lib/components/statistics/statistics-shell.svelte';
  import StatisticsSummary from '$lib/components/statistics/statistics-summary/statistics-summary.svelte';
  import { formatPageTitle } from '$lib/functions/format-page-title';
</script>

<svelte:head>
  <title>{formatPageTitle('Statistics Summary')}</title>
</svelte:head>

<StatisticsShell>
  {#snippet children({
    aggregatedStatistics,
    handleDeleteRequest,
    handleEditRequest,
    statisticsDateRangeLabel
  })}
    <StatisticsSummary
      {aggregatedStatistics}
      {statisticsDateRangeLabel}
      ondelete={handleDeleteRequest}
      onedit={handleEditRequest}
    />
  {/snippet}
</StatisticsShell>
