export function buildResponse(status: number, body: any, contentType = 'text/plain'){
    const bodyString = typeof body === 'string' ? body : JSON.stringify(body);

    const responseLine = [
        `HTTP/1.1 ${status} ${getStatusMessage(status)}`,
        `Date: ${new Date().toUTCString()}`,
        `Content-type: ${contentType}`,
        `Content-length: ${Buffer.byteLength(bodyString)}`,
        `Access-Control-Allow-Origin: *`,
        `Access-Control-Allow-Headers: Content-Type, Authorization`,
        '',
        bodyString
    ];

    console.log(`Response Status: ${status}, Body: ${JSON.stringify(body)}`);

    return responseLine.join('\r\n')

}

function getStatusMessage (status: number) {
const messages: Record<number, string> = {
    200: 'OK',
    400: 'Bad Request',
    404: 'Not Found',
    405: 'Method Not Allowed',
    500: 'Internal Server Error'
 };

 return messages[status] || 'Unknown';
  
}