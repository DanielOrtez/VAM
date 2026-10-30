import {settings} from '@/lib/allauth'
import {getCsrfToken} from '@/lib/cookie'
import type {SessionResponse} from '@/types/auth.ts'

let onAuthChange: (value: SessionResponse) => void = () => {}
export const setOnAuthChangeHandler = (fn: (value: SessionResponse) => void) => (onAuthChange = fn)

function useHttp() {
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
    const headers: Record<string, string> = {
      Accept: 'application/json',
    }
    if (payload !== undefined) headers['Content-Type'] = 'application/json'
    if (method !== 'GET') headers['X-CSRFToken'] = getCsrfToken() ?? ''

    const options: RequestInit = {
      method,
      headers,
      credentials: 'include',
      body: payload ? JSON.stringify(payload) : undefined,
    }

    const response = await fetch(`${settings?.baseUrl}${url}`, options)

    const data = await response.json().catch(() => null)

    if ([401, 410].includes(response.status)) {
      onAuthChange(data)
    }

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

export const http = useHttp()
