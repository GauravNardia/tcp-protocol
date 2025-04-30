import net from 'net'
import { buildResponse } from './response/responseBuilder';
import { parseHttpRequest } from './request/requestParser';
import { handleRequest } from './routes/routes';

const server = net.createServer((socket) => {
    socket.on("data", (data) => {
        const request = data.toString();

        if(!request){
            const badResponse = buildResponse(400, 'Invalid Request');
            socket.write(badResponse);
            socket.end();
            return;
        };

           try {

                const {method, path, headers, body} = parseHttpRequest(request);
                const {status, body:resBody, contentType} =  handleRequest(method, path, body);
                const response = buildResponse(status, resBody, contentType);

                socket.write(response);

           } catch (error) {
            const response = buildResponse(400, 'Invalid JSON');
            socket.write(response);
           }
    

        socket.end();
    });



    socket.on('error', (err) => {
        console.log('Socket error', err);
    })
});

server.on('error', (err) => {
    throw err;
  });


server.listen(3000, () => {
    console.log('Server listening on port 3000')
})