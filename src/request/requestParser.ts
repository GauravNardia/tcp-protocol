export function parseHttpRequest(request: string) {
    const [rawHeaders, rawBody] = request.split(/\r?\n\r?\n/);
    const headerLines = rawHeaders.split(/\r?\n/);
  
    const [method, path] = headerLines[0].split(' ');
    const headers: Record<string, string> = {};
  
    for (let i = 1; i < headerLines.length; i++) {
      const [key, value] = headerLines[i].split(': ');
      if (key && value) headers[key.toLowerCase()] = value;
    }
  
    let body = {};
    if (rawBody && headers['content-type'] === 'application/json') {
      body = JSON.parse(rawBody);
    }
  
    return { method, path, headers, body };
  }
  