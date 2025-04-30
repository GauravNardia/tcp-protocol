export function parseHttpRequest(request: string) {
  const [rawHeaders, rawBody] = request.split(/\r?\n\r?\n/);
  const headerLines = rawHeaders.split(/\r?\n/);
  const [method, fullPath] = headerLines[0].split(' ');

  const [path, rawQuery] = fullPath.split('?');
  const query: Record<string, string> = {};

  if (rawQuery) {
      rawQuery.split('&').forEach(pair => {
          const [key, value] = pair.split('=');
          query[key] = decodeURIComponent(value || '');
      });
  }

  const headers: Record<string, string> = {};
  for (let i = 1; i < headerLines.length; i++) {
      const [key, value] = headerLines[i].split(': ');
      headers[key.toLowerCase()] = value;
  }

  let body = {};
  if (rawBody && headers['content-type'] === 'application/json') {
      try {
          body = JSON.parse(rawBody);
      } catch {
          throw new Error('Invalid JSON');
      }
  }

  return { method, path, headers, body, query };
}
