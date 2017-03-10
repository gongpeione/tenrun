// TODO make this function act just like fetch api
interface requestParame {
    method?: string,
    headers?: Array<[string, string]>,
    body?
}
interface responseObject {
    response: string,
    status: string,
    json (),
    text (),
    blob (),
    header
}

function fetch (url: string, parame: requestParame = {}) {

    console.log(url, parame);
    return new Promise((resolve, reject) => {

        const r = new egret.HttpRequest();

        r.responseType = egret.HttpResponseType.TEXT;
        r.open(url, parame.method || egret.HttpMethod.GET);

        if (parame.headers) {
            parame.headers.forEach(header => {
                r.setRequestHeader(header[0], header[1]);
            });
        }

        let bodyLink = '';
        // let formData = null;
        if (parame.method === egret.HttpMethod.POST) {
            const body = parame.body || {};
            
            // formData = new FormData();
            for (let key in body) {
                // formData.append(key, body[key]);
                let bodyParsed;
                if (typeof body[key] === 'object') {
                    bodyParsed = JSON.stringify(body[key]);
                } else {
                    bodyParsed = body[key];
                }
                bodyLink += `${key}=${bodyParsed}&`;
            }

            r.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        }

        r.send(bodyLink);

        r.addEventListener(egret.Event.COMPLETE, (e: egret.Event) => {
            const response = e.currentTarget;
            const responseText = response.response;

            // console.log(e.currentTarget);

            const retResponse: responseObject = {
                response: responseText,
                status: response._xhr.status,
                header: response.getAllResponseHeaders(),
                json: () => {
                    return new Promise((resolve, _) => resolve(JSON.parse(responseText)))
                },
                text: () => {
                    return new Promise((resolve, _) => resolve(responseText));
                },
                blob: () => {
                    return new Promise((resolve, _) => {
                        const blob = new Blob(
                                        [JSON.stringify(JSON.parse(responseText), null, 2)], 
                                        {
                                            type : 'application/json'
                                        }
                                    );
                        resolve(blob);
                    });
                }
            };

            resolve(retResponse);
        }, this);

    });
}