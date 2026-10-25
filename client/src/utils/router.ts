export function getSafeRedirectPath(redirect: unknown): string {
  if (typeof redirect !== 'string') return '/'

  if (!redirect.startsWith('/') || redirect.startsWith('//')) return '/'

  return redirect
}
