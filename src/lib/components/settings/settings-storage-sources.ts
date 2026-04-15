import { browser } from '$app/environment';
import { logger } from '$lib/data/logger';
import { isAppDefault } from '$lib/data/storage/storage-source-manager';
import { defaultStorageSources } from '$lib/data/storage/storage-types';
import { isStorageSourceAvailable } from '$lib/data/storage/storage-view';
import { database } from '$lib/data/store';
import { map } from 'rxjs';

export const storageSources$ = database.storageSourcesChanged$.pipe(
  map((storageSources) => [
    ...(browser
      ? defaultStorageSources
          .filter((defaultStorageSource) =>
            isStorageSourceAvailable(defaultStorageSource.type, defaultStorageSource.name, window)
          )
          .map((defaultStorageSource) => ({
            name: defaultStorageSource.name,
            type: defaultStorageSource.type,
            storedInManager: false,
            encryptionDisabled: false,
            data: new ArrayBuffer(0),
            lastSourceModified: 0
          }))
      : []),
    ...storageSources.filter((storageSource) => !isAppDefault(storageSource.name))
  ])
);

export async function ensureStorageSources() {
  try {
    database.storageSourcesChanged$.next(await database.getStorageSources());
  } catch (error: any) {
    logger.error(`Failed to retrieve storage sources: ${error.message}`);
    database.storageSourcesChanged$.next([]);
  }
}
