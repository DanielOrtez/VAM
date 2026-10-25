function getCookie(name: string): string | null {
  let cookieValue: string | null = null

  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';')
    for (const c of cookies) {
      const cookie = c.trim()
      if (cookie.substring(0, name.length + 1) === name + '=') {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1))
        break
      }
    }
  }

  return cookieValue
}

export function getCsrfToken(): string | null {
  return getCookie('csrftoken')
}
