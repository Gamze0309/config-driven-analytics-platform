import type { HttpMethod, RequestOptions } from './httpClient';
import { fetchRemoteFlagsForTenant, updateRemoteFlagForTenant } from '../flags/mockRemote';
import type { FeatureKey } from '../flags/types';

type TransportRequest = {
  path: string;
  method: HttpMethod;
  headers: Record<string, string>;
  body?: unknown;
  signal: AbortSignal;
};

function jsonResponse(data: unknown, init?: ResponseInit): Response {
  return new Response(JSON.stringify(data), {
    status: init?.status ?? 200,
    headers: {
      'content-type': 'application/json',
      ...(init?.headers ?? {}),
    },
  });
}

function errorResponse(status: number, message: string): Response {
  return jsonResponse({ message }, { status });
}

function parseTenantFlagsPath(path: string): { tenantId: string } | null {
  // Supports both with and without leading slash.
  const normalized = path.startsWith('/') ? path : `/${path}`;
  const match = /^\/tenants\/([^/]+)\/flags$/.exec(normalized);
  if (!match) return null;
  return { tenantId: match[1] };
}

export function createMockTransport() {
  return async function mockTransport(req: TransportRequest): Promise<Response> {
    if (req.signal.aborted) {
      throw new DOMException('The operation was aborted.', 'AbortError');
    }

    const parsed = parseTenantFlagsPath(req.path);

    if (parsed) {
      if (req.method === 'GET') {
        const flags = await fetchRemoteFlagsForTenant(parsed.tenantId);
        return jsonResponse({ flags });
      }

      if (req.method === 'PATCH') {
        const body = req.body as { key?: FeatureKey; enabled?: boolean } | undefined;
        if (!body?.key || typeof body.enabled !== 'boolean') {
          return errorResponse(400, 'Invalid body. Expected { key, enabled }.');
        }

        const flags = await updateRemoteFlagForTenant(parsed.tenantId, body.key, body.enabled);
        return jsonResponse({ flags });
      }

      return errorResponse(405, 'Method not allowed');
    }

    return errorResponse(404, 'Not found');
  };
}

// Prevent unused import churn when RequestOptions changes; ensures file stays in sync with httpClient types.
export type { RequestOptions };
