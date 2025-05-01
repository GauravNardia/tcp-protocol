import net from 'net'
import { buildResponse } from './response/responseBuilder';
import { parseHttpRequest } from './request/requestParser';
import { handleRequest } from './routes/routes';

const server = net.createServer((socket) => {
    let buffer = '';

    socket.on("data", async(chunk) => {
        buffer += chunk.toString();

        if(buffer.indexOf('\r\n\r\n') === -1) return; 

           try {

                const {method, path, headers, body, query} = parseHttpRequest(buffer);
                const {status, body:resBody, contentType} =  await handleRequest(method, path, body, query, headers);
                const response = buildResponse(status, resBody, contentType);
                

                socket.write(response);

                if(headers['connection'] !== 'keep-alive') {
                    socket.end();
                }

           } catch (error) {
            const response = buildResponse(400, 'Invalid JSON');
            socket.write(response);
           }
    

    });



    socket.on('error', (err) => {
        console.log('Socket error', err);
    })
});

server.on('error', (err) => {
    throw err;
  });

process.on('SIGINT', () => {
    console.log('Gracefully shutting down...');
    server.close(() => {
      console.log('Server closed');
      process.exit(0);
    });
  });

server.listen(3000, () => {
    console.log('Server listening on port 3000')
})