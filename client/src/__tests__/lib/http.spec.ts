import {beforeEach, describe, expect, it, vi} from 'vite-plus/test'
import {http, setOnAuthChangeHandler} from '@/lib/http.ts'
import {URLs} from '@/lib/allauth.ts'

const mockFetch = (status: number, body: unknown) => {
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ status, json: async () => body }))
}

describe('http client', () => {
  const handler = vi.fn()
  beforeEach(() => {
    handler.mockClear()
    setOnAuthChangeHandler(handler)
  })

  it('Error 401', async () => {
    const body = { status: 401, data: { flows: [] }, meta: { is_authenticated: false } }
    mockFetch(401, body)
    await http.GET(URLs.config)
    expect(handler).toHaveBeenCalledWith(body)
  })

  it('Error 410', async () => {
    const body = { status: 401, data: { flows: [] }, meta: { is_authenticated: false } }
    mockFetch(401, body)
    await http.GET(URLs.config)
    expect(handler).toHaveBeenCalledWith(body)
  })

  it('Send CSRF Token', async () => {
    document.cookie = 'csrftoken=csrftoken'
    mockFetch(200, { status: 200 })
    await http.POST(URLs.login, { email: 'test@test.es', password: 'test123@' })
    const [, init] = vi.mocked(fetch).mock.calls[0]

    expect(new Headers(init!.headers).get('X-CSRFToken')).toBe('csrftoken')
  })

  it('Send CSRF Token only on not-GET requests', async () => {
    document.cookie = 'csrftoken=csrftoken'
    mockFetch(200, { status: 200 })
    await http.GET(URLs.login, { email: 'test@test.es', password: 'test123@' })
    const [, init] = vi.mocked(fetch).mock.calls[0]

    expect(new Headers(init!.headers).get('X-CSRFToken')).toBeNull()
  })
})
