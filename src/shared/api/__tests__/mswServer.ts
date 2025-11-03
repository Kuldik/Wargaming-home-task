import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';

let CURRENT_JSON: unknown = { ok: true };
export const setCurrentJson = (v: unknown) => { CURRENT_JSON = v; };

const handler = () => {
  let body: any = CURRENT_JSON;
  const isObj = body && typeof body === 'object';
  if (!isObj || (isObj && !('data' in body))) {
    body = { status: 'ok', data: body };
  }
  return HttpResponse.json(body, { status: 200 });
};

export const server = setupServer(
  http.get('*', handler),
  http.post('*', handler),
  http.put('*', handler),
  http.delete('*', handler)
);
