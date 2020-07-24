var http = require('http');
const https = require('https');

http.createServer(onRequest).listen(3000);
http.createServer(handleBCMRequest).listen(3003);


function getOdataCfg(request) {
    const headers = request.headers;
    headers.host = null;

    return {
        hostname: 'finbrq02-pali-custom-bcmserviceforui-srv.cfapps.sap.hana.ondemand.com',
        //hostname: 'wz0dgrg6emt0lj3cerviceforui-1-srv.cfapps.sap.hana.ondemand.com/',
        // port: 443,
        path: request.url,
        method: request.method,
        headers: headers
    };
}

function getBCMCfg(request) {
    return {
        hostname: 'localhost',
        port: 3003,
        path: request.url,
        method: request.method,
        body: request.body

        // headers: client_req.headers
    };
}

function onRequest(request, response) {
    const url = request.url;
    console.log('serve> ' + request.method + " " + url);

    console.log(request.headers);

    request.on('error', (err) => {
        console.error(err);
    });


    if (url.startsWith('/iflow_deployer')) {
        onBCM(request, response);
    } else {
        oDataRequest(request, response);
    }
}

function onBCM(request, response) {
    const url = request.url;
    console.log('COOKBOOOK: ' + url);

    var proxy = http.request(getBCMCfg(request), function(res) {
        response.writeHead(res.statusCode, res.headers)
        res.pipe(response, {
            end: true
        });
    });

    request.pipe(proxy, {
        end: true
    });
}

function oDataRequest(request, response) {
    const url = request.url;
    console.log('OData: ' + url);

    if (url.startsWith("/srv_api")) {
        console.log("modifiing route");
        var modifiedUrl = url.slice("srv_api".length + 1);
        request.url = modifiedUrl;
        console.log(request.url);
    }

    var proxy = https.request(getOdataCfg(request), function(res) {
        request.on('data', (chunk) => {
            body.push(chunk);

        })

        response.writeHead(res.statusCode, res.headers)

        res.pipe(response, {
            end: true
        });
    });

    request.pipe(proxy, {
        end: true
    });
}

function handleBCMRequest(request, response) {
    const url = request.url;
    console.log('Handle: ' + url);

    if (url.startsWith("/srv_api")) {
        console.log("modifiing route");
        var modifiedUrl = url.slice("srv_api".length + 1);
        request.url = modifiedUrl;
        console.log(request.url);
    }

    let body = [];

    request.on('data', (chunk) => {
        body.push(chunk);

    }).on('end', () => {
        body = Buffer.concat(body).toString();
        console.error(body);
    });


    const sendResponse = (message, statusCode) => {
        if (!statusCode) statusCode = 200;
        response.statusCode = statusCode;
        response.end(message);
    };

    if (url.startsWith('/iflow_deployer/api/v1/ebicsconnector/server/')) {
        
        console.log('Sending Response 204 on file upload');
        sendResponse(undefined, 204);
    }

    
    // if (url.startsWith('/iflow_deployer/api/v1/certificate/customerintegration/certificateupload/CustomerSystem/10223b5e-0f59-479d-aeff-b7f141e092c6')) {

    //     console.log('Sending Response 500 on file upload');
    //     sendResponse('<!DOCTYPE html><html><head><title>Error report</title></head><body><h1>HTTP Status 500 - Uploaded file is not an image from the allowed range! (allowed file types: gif, png, jpg, bmp)</h1></body></html>', 500);
    // }
}
