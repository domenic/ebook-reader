import type { RouteId } from '$app/types';

export type StatisticsRoute = Extract<RouteId, '/statistics/heatmap' | '/statistics/summary'>;

export const defaultStatisticsRoute: StatisticsRoute = '/statistics/heatmap';
export const statisticsRoutes: StatisticsRoute[] = [defaultStatisticsRoute, '/statistics/summary'];

export function isStatisticsRoute(routeId?: RouteId | null): routeId is StatisticsRoute {
  return statisticsRoutes.includes(routeId as StatisticsRoute);
}

export function getValidStatisticsRoute(routeId?: string | null): StatisticsRoute {
  return statisticsRoutes.includes(routeId as StatisticsRoute)
    ? (routeId as StatisticsRoute)
    : defaultStatisticsRoute;
}
