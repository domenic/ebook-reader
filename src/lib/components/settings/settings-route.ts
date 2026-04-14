import type { RouteId } from '$app/types';

export type SettingsRoute = Extract<
  RouteId,
  '/settings/reader' | '/settings/data' | '/settings/statistics'
>;

export const settingsRoutes: SettingsRoute[] = [
  '/settings/reader',
  '/settings/data',
  '/settings/statistics'
];
