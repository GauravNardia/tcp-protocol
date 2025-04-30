export function handleRequest(method: string, path: string, body: any, query:any) {

    if(method === 'GET' && path === '/'){
        return {
            status: 200,
            body: {message: body},
            contentType: 'application/json'
        }
    }

    if (method === 'POST' && path === '/echo') {
        return {
          status: 200,
          body: {message: 'Welcome!', query} ,
          contentType: 'application/json'
        };
      }
    
    if (method === 'DELETE' && path === '/delete') {
      return {
        status: 200,
        body: {deleted: true} ,
        contentType: 'application/json'
      };
    }

    if(method === 'PUT' && path === '/update'){
      return {
        status: 200,
        body: { updated: true, data: body },
        contentType: 'application/json'
      }
    }

      return {
        status: 404,
        body: 'Not Found',
        contentType: 'text/plain'
      }

}