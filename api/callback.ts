import type { VercelRequest, VercelResponse } from '@vercel/node'

function getOAuthCredentials() {
  const clientId = process.env.OAUTH_GITHUB_CLIENT_ID ?? process.env.OAUTH_CLIENT_ID
  const clientSecret = process.env.OAUTH_GITHUB_CLIENT_SECRET ?? process.env.OAUTH_CLIENT_SECRET

  if (!clientId || !clientSecret) {
    throw new Error('Missing OAUTH_GITHUB_CLIENT_ID or OAUTH_GITHUB_CLIENT_SECRET')
  }

  return { clientId, clientSecret }
}

function renderBody(status: 'success' | 'error', content: object) {
  return `<!doctype html><html><body><script>
(function () {
  function receiveMessage(event) {
    window.opener.postMessage(
      'authorization:github:${status}:${JSON.stringify(content)}',
      event.origin
    );
    window.removeEventListener('message', receiveMessage, false);
  }
  window.addEventListener('message', receiveMessage, false);
  window.opener.postMessage('authorizing:github', '*');
})();
</script></body></html>`
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const code = typeof req.query.code === 'string' ? req.query.code : null
  const host = req.headers.host

  if (!code || !host) {
    res.status(400).send(renderBody('error', { message: 'Missing OAuth code or host' }))
    return
  }

  try {
    const { clientId, clientSecret } = getOAuthCredentials()

    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code,
        redirect_uri: `https://${host}/api/callback`,
      }),
    })

    const data = (await tokenResponse.json()) as {
      access_token?: string
      error?: string
      error_description?: string
    }

    if (!data.access_token) {
      res.status(200).send(renderBody('error', data))
      return
    }

    res.status(200).send(
      renderBody('success', {
        token: data.access_token,
        provider: 'github',
      }),
    )
  } catch (error) {
    res.status(200).send(
      renderBody('error', {
        message: error instanceof Error ? error.message : 'OAuth callback failed',
      }),
    )
  }
}
