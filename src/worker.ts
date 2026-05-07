/// <reference types="@cloudflare/workers-types" />
import { getAssetFromKV, mapRequestToAsset } from '@cloudflare/kv-asset-handler';

declare let __STATIC_CONTENT: KVNamespace;

addEventListener('fetch', (event: FetchEvent) => {
  event.respondWith(handleRequest(event));
});

async function handleRequest(event: FetchEvent): Promise<Response> {
  const request = event.request;
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  try {
    return await getAssetFromKV(
      {
        request,
        waitUntil(promise: Promise<any>) {
          return event.waitUntil(promise);
        },
      } as any,
      {
        ASSET_NAMESPACE: __STATIC_CONTENT,
        mapRequestToAsset,
      },
    );
  } catch (err) {
    return getAssetFromKV(
      {
        request: new Request(`${new URL(request.url).origin}/index.html`, request),
        waitUntil(promise: Promise<any>) {
          return event.waitUntil(promise);
        },
      } as any,
      {
        ASSET_NAMESPACE: __STATIC_CONTENT,
      },
    ).catch(() => new Response('Not Found', { status: 404 }));
  }
}
