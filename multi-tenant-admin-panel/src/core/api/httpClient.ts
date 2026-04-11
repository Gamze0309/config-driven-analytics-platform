import { AppError } from './errors';
import { createMockTransport } from './mockTransport';

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export type HttpClientConfig = {
  baseUrl?: string;
  timeoutMs?: number;
  getAuthToken?: () => string | undefined;
  getTenantId?: () => string | undefined;
  transport?: (req: {
    path: string;
    method: HttpMethod;
    headers: Record<string, string>;
    body?: unknown;
    signal: AbortSignal;
  }) => Promise<Response>;
};

export type RequestOptions = {
  path: string;
  method?: HttpMethod;
  query?: Record<string, string | number | boolean | undefined | null>;
  headers?: Record<string, string | undefined>;
  body?: unknown;
  signal?: AbortSignal;
};

function buildUrl(baseUrl: string, path: string, query?: RequestOptions['query']): string {
  const trimmedBase = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const url = new URL(`${trimmedBase}${normalizedPath}`, trimmedBase ? undefined : window.location.origin);

  if (query) {
    for (const [key, raw] of Object.entries(query)) {
      if (raw === undefined || raw === null) continue;
      url.searchParams.set(key, String(raw));
    }
  }

  return url.toString();
}

async function safeParseJson(res: Response): Promise<unknown | undefined> {
  const contentType = res.headers.get('content-type') ?? '';
  if (!contentType.includes('application/json')) return undefined;
  try {
    return await res.json();
  } catch {
    return undefined;
  }
}

function mapStatusToCode(status: number): AppError['code'] {
  if (status === 401) return 'UNAUTHORIZED';
  if (status === 403) return 'FORBIDDEN';
  if (status === 404) return 'NOT_FOUND';
  if (status >= 400 && status < 500) return 'BAD_REQUEST';
  if (status >= 500) return 'SERVER';
  return 'UNKNOWN';
}

export function createHttpClient(config: HttpClientConfig = {}) {
  const baseUrl = config.baseUrl ?? '';
  const timeoutMs = config.timeoutMs ?? 10_000;

  async function request<TResponse>(options: RequestOptions): Promise<TResponse> {
    const method = options.method ?? 'GET';
    const url = buildUrl(baseUrl, options.path, options.query);

    const tenantId = config.getTenantId?.();
    const token = config.getAuthToken?.();

    const headers: Record<string, string> = {};

    if (options.headers) {
      for (const [key, value] of Object.entries(options.headers)) {
        if (value !== undefined) headers[key] = value;
      }
    }

    if (tenantId) headers['X-Tenant-Id'] = tenantId;
    if (token) headers.Authorization = `Bearer ${token}`;

    let body: BodyInit | undefined;

    if (options.body !== undefined && options.body !== null) {
      if (options.body instanceof FormData) {
        body = options.body;
      } else {
        headers['Content-Type'] = headers['Content-Type'] ?? 'application/json';
        body = JSON.stringify(options.body);
      }
    }

    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), timeoutMs);

    const signal = options.signal
      ? new AbortSignalAny([options.signal, controller.signal]).signal
      : controller.signal;

    try {
      const res = config.transport
        ? await config.transport({ path: options.path, method, headers, body: options.body, signal })
        : await fetch(url, {
            method,
            headers,
            body,
            signal,
          });

      if (!res.ok) {
        const details = await safeParseJson(res);
        const code = mapStatusToCode(res.status);
        const message = `Request failed (${res.status})`;
        throw new AppError({ message, code, status: res.status, details });
      }

      // No content
      if (res.status === 204) return undefined as TResponse;

      const json = (await safeParseJson(res)) as TResponse | undefined;
      if (json !== undefined) return json;

      return (await res.text()) as unknown as TResponse;
    } catch (err) {
      if (err instanceof AppError) throw err;

      if (err instanceof DOMException && err.name === 'AbortError') {
        throw new AppError({ message: 'Request timed out', code: 'TIMEOUT' });
      }

      // Fetch often throws TypeError for network failures.
      if (err instanceof TypeError) {
        throw new AppError({ message: 'Network error', code: 'NETWORK', details: err });
      }

      throw new AppError({ message: err instanceof Error ? err.message : String(err), code: 'UNKNOWN', details: err });
    } finally {
      window.clearTimeout(timeout);
    }
  }

  return { request };
}

export const httpClient = createHttpClient({ transport: createMockTransport() });

class AbortSignalAny {
  readonly signal: AbortSignal;

  constructor(signals: AbortSignal[]) {
    const controller = new AbortController();
    for (const s of signals) {
      if (s.aborted) {
        controller.abort();
        break;
      }
      s.addEventListener('abort', () => controller.abort(), { once: true });
    }
    this.signal = controller.signal;
  }
}
