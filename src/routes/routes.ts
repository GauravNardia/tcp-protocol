export function handleRequest(method: string, path: string, body: any) {

    if(method === 'GET' && path === '/'){
        return {
            status: 200,
            body: {message: 'Welcome to raw HTTP server!'},
            contentType: 'application/json'
        }
    }

    if (method === 'POST') {
        return {
          status: 200,
          body: {received: body} ,
          contentType: 'application/json'
        };
      }

      return {
        status: 404,
        body: 'Not Found',
        contentType: 'text/plain'
      }

}