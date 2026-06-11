import type { VercelRequest, VercelResponse } from '@vercel/node'
import crypto from 'node:crypto'

function getOAuthCredentials() {
  const clientId = process.env.OAUTH_GITHUB_CLIENT_ID ?? process.env.OAUTH_CLIENT_ID
  const clientSecret = process.env.OAUTH_GITHUB_CLIENT_SECRET ?? process.env.OAUTH_CLIENT_SECRET

  if (!clientId || !clientSecret) {
    throw new Error('Missing OAUTH_GITHUB_CLIENT_ID or OAUTH_GITHUB_CLIENT_SECRET')
  }

  return { clientId, clientSecret }
}

export default function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const { clientId } = getOAuthCredentials()
    const host = req.headers.host

    if (!host) {
      res.status(500).json({ error: 'Missing host header' })
      return
    }

    const params = new URLSearchParams({
      client_id: clientId,
      redirect_uri: `https://${host}/api/callback`,
      scope: 'repo,user',
      state: crypto.randomBytes(16).toString('hex'),
    })

    res.redirect(302, `https://github.com/login/oauth/authorize?${params}`)
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : 'OAuth misconfigured' })
  }
}
