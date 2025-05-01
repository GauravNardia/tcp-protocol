import fs from "fs"
import pathModule from 'path'

export async function handleRequest(method: string, path: string, body: any, query:any, headers:any) {

    if(method === 'GET' && path === '/'){
        return {
            status: 200,
            body: {message: body},
            contentType: 'application/json'
        }
    }

  //   if (method === 'GET' && path === '/static') {
  //     const filePath = pathModule.join(__dirname, '../public', path.replace('/static/', ''));
  //     if (fs.existsSync(filePath)) {
  //         const content = fs.readFileSync(filePath);
  //         return {
  //             status: 200,
  //             body: content,
  //             contentType: getMimeType(filePath),
  //         };
  //     }
  //     return { status: 404, body: 'File not found', contentType: 'text/plain' };
  // }

    if (method === 'POST' && path === '/echo') {
        return {
          status: 200,
          body: {message: 'Welcome!', query, headers} ,
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



// function getMimeType(filePath: string): string {
//   if(filePath.endsWith('.txt')) return 'text/plain';
//   if (filePath.endsWith('.png')) return 'image/png';
//   if (filePath.endsWith('.jpg') || filePath.endsWith('.jpeg')) return 'image/jpeg';
//   if (filePath.endsWith('.html')) return 'text/html';
//   return 'application/octet-stream';
// }