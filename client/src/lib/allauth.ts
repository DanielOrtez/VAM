const Client = {
  APP: 'app',
  BROWSER: 'browser',
} as const

export const settings: { client: string; baseUrl: string } = {
  client: Client.BROWSER,
  baseUrl: `/_allauth/${Client.BROWSER}/v1`,
}

export const URLs = {
  config: '/config',
  login: '/auth/login',
  session: '/auth/session',
} as const
