import { describe, it, expect } from 'vitest';
import { makeApiTestStore } from './apiTestStore';
import { setCurrentJson } from './mswServer';

import {
  apiGetMediaPath,
  apiGetNations,
  apiGetVehicleTypes,
  apiGetVehicles,
} from '../services';

describe('RTK Query services', () => {
  it('getMediaPath returns base media path string', async () => {
    const store = makeApiTestStore();
    setCurrentJson({ status: 'ok', data: 'https://static.wows-cdn.test/' });

    const r = await store.dispatch(apiGetMediaPath.initiate({ lang: 'en' }));

    expect(r.status).toBe('fulfilled');
    expect((r.data as any).data).toBe('https://static.wows-cdn.test/');

    const r2 = await store.dispatch(apiGetMediaPath.initiate({ lang: 'en' }));
    expect(r2.originalArgs).toEqual({ lang: 'en' });
  });

  it('getNations returns array of nations with localization', async () => {
    const store = makeApiTestStore();
    setCurrentJson({
      status: 'ok',
      data: [
        { name: 'usa',   localization: { mark: { en: 'USA',   de: 'USA' } } },
        { name: 'japan', localization: { mark: { en: 'Japan', ja: '日本' } } },
      ],
    });

    const r = await store.dispatch(apiGetNations.initiate({ lang: 'de' }));
    expect(r.status).toBe('fulfilled');

    const arr = (r.data as any).data;
    expect(Array.isArray(arr)).toBe(true);
    expect(arr[0].name).toBe('usa');
  });

  it('getVehicleTypes returns types dictionary', async () => {
    const store = makeApiTestStore();
    setCurrentJson({
      status: 'ok',
      data: {
        destroyer: { localization: { mark: { en: 'Destroyers' } } },
        cruiser:   { localization: { mark: { en: 'Cruisers' } } },
      },
    });

    const r = await store.dispatch(apiGetVehicleTypes.initiate({ lang: 'en' }));
    expect(r.status).toBe('fulfilled');

    const d = (r.data as any).data;
    expect(d.destroyer.localization.mark.en).toBe('Destroyers');
    expect(Object.keys(d)).toContain('cruiser');
  });

  it('getVehicles returns vehicle dictionary and we can pick one', async () => {
    const store = makeApiTestStore();
    setCurrentJson({
      status: 'ok',
      data: {
        ship_1: {
          name: 'ship_1',
          level: 5,
          nation: 'usa',
          icons: { default: '/img.png' },
          localization: { mark: { en: 'Fletcher' } },
          tags: ['destroyer'],
        },
        ship_2: {
          name: 'ship_2',
          level: 7,
          nation: 'japan',
          icons: { default: '/img2.png' },
          localization: { mark: { en: 'Akatsuki' } },
          tags: ['destroyer'],
        },
      },
    });

    const r = await store.dispatch(apiGetVehicles.initiate({ lang: 'en' }));
    expect(r.status).toBe('fulfilled');

    const dict = (r.data as any).data;
    expect(dict.ship_1.level).toBe(5);
    expect(dict.ship_2.localization.mark.en).toBe('Akatsuki');
  });
});
