import { getAssetFromKV, mapRequestToAsset } from '@cloudflare/kv-asset-handler';

interface Env {
  __STATIC_CONTENT: KVNamespace;
}

export default {
  async fetch(request: Request, env: Env, ctx: any): Promise<Response> {
    if (request.method !== 'GET' && request.method !== 'HEAD') {
      return new Response('Method Not Allowed', { status: 405 });
    }

    try {
      return await getAssetFromKV(
        {
          request,
          waitUntil(promise: Promise<any>) {
            return ctx.waitUntil(promise);
          },
        } as any,
        {
          ASSET_NAMESPACE: env.__STATIC_CONTENT,
          mapRequestToAsset,
        },
      );
    } catch (error) {
      return getAssetFromKV(
        {
          request: new Request(`${new URL(request.url).origin}/index.html`, request),
          waitUntil(promise: Promise<any>) {
            return ctx.waitUntil(promise);
          },
        } as any,
        {
          ASSET_NAMESPACE: env.__STATIC_CONTENT,
        },
      ).catch(() => new Response('Not Found', { status: 404 }));
    }
  },
};
