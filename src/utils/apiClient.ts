/**
 * Safe API request helper for NisKart.
 * Validates HTTP status codes and Content-Type headers before parsing responses.
 * Prevents "Unexpected token 'A', 'A server e...' is not valid JSON" errors
 * and provides clear, user-facing error messages.
 */

export interface ApiFetchResult<T = any> {
  ok: boolean;
  status: number;
  data?: T;
  error?: string;
}

/**
 * Performs a fetch request and safely handles JSON, HTML, or plain text error responses.
 */
export async function safeFetchJson<T = any>(
  input: RequestInfo | URL,
  init?: RequestInit
): Promise<ApiFetchResult<T>> {
  try {
    const res = await fetch(input, init);
    const contentType = res.headers.get('content-type') || '';
    const isJson = contentType.toLowerCase().includes('application/json');

    // Case 1: Server returned non-2xx status code
    if (!res.ok) {
      let errorMessage = `Server error (${res.status})`;

      if (isJson) {
        try {
          const errBody = await res.json();
          errorMessage = errBody.error || errBody.message || errorMessage;
        } catch {
          // Fallback if body parsing fails
        }
      } else {
        try {
          const text = await res.text();
          if (text.includes('A server error') || text.includes('FUNCTION_INVOCATION_FAILED')) {
            errorMessage = 'Backend service is unavailable or restarting. Please check connection and try again.';
          } else if (text.includes('Cannot GET') || text.includes('Cannot POST') || res.status === 404) {
            errorMessage = `API endpoint not found (${res.status}).`;
          } else if (text.trim().length > 0 && text.trim().length < 150 && !text.includes('<html')) {
            errorMessage = text.trim();
          }
        } catch {
          // Ignore read error
        }
      }

      return {
        ok: false,
        status: res.status,
        error: errorMessage,
      };
    }

    // Case 2: Server returned 2xx but NOT JSON (e.g. HTML redirect or plain text)
    if (!isJson) {
      try {
        const text = await res.text();
        return {
          ok: false,
          status: res.status,
          error: `Server responded with ${contentType || 'non-JSON'} content instead of JSON.`,
        };
      } catch {
        return {
          ok: false,
          status: res.status,
          error: 'Expected JSON response but received non-JSON data.',
        };
      }
    }

    // Case 3: Parse valid JSON body
    try {
      const data = await res.json();
      return {
        ok: true,
        status: res.status,
        data: data as T,
      };
    } catch (parseErr: any) {
      return {
        ok: false,
        status: res.status,
        error: 'Failed to parse JSON response from server.',
      };
    }
  } catch (networkErr: any) {
    const msg = networkErr?.message || '';
    if (msg.includes('Failed to fetch') || msg.includes('NetworkError') || msg.includes('Load failed')) {
      return {
        ok: false,
        status: 0,
        error: 'Cannot connect to NisKart server. Please check your internet connection.',
      };
    }
    return {
      ok: false,
      status: 0,
      error: msg || 'An unexpected network error occurred.',
    };
  }
}

/**
 * Convenient wrapper that returns the typed data or throws a descriptive Error.
 */
export async function apiRequest<T = any>(
  input: RequestInfo | URL,
  init?: RequestInit
): Promise<T> {
  const result = await safeFetchJson<T>(input, init);
  if (!result.ok) {
    throw new Error(result.error || 'Request failed');
  }
  return result.data as T;
}
