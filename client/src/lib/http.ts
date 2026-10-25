import {settings} from '@/lib/allauth'
import {getCsrfToken} from '@/lib/cookie'

export default function useHttp() {
  type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

  interface HttpResponse<T> {
    status: number
    ok: boolean
    data: T
  }

  async function request<T>(
    method: HttpMethod,
    url: string,
    payload?: unknown,
  ): Promise<HttpResponse<T>> {
    const options: RequestInit = {
      method,
      credentials: 'include',
      body: payload ? JSON.stringify(payload) : undefined,
      headers: {
        'X-CSRFToken': getCsrfToken() ?? '',
        'Content-Type': 'application/json',
      },
    }

    const response = await fetch(`${settings?.baseUrl}${url}`, options)
    const data = await response.json().catch(() => null)

    return { status: response.status, ok: response.ok, data: data as T }
  }

  async function GET<T>(url: string) {
    return await request<T>('GET', url)
  }

  async function POST<T>(url: string, payload: unknown) {
    return await request<T>('POST', url, payload)
  }

  async function DELETE<T>(url: string) {
    return await request<T>('DELETE', url)
  }

  return {
    GET,
    POST,
    DELETE,
  }
}
