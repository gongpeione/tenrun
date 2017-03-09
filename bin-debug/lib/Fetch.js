function fetch(url, parame) {
    var _this = this;
    if (parame === void 0) { parame = {}; }
    console.log(url, parame);
    return new Promise(function (resolve, reject) {
        var r = new egret.HttpRequest();
        r.responseType = egret.HttpResponseType.TEXT;
        r.open(url, parame.method || egret.HttpMethod.GET);
        if (parame.headers) {
            parame.headers.forEach(function (header) {
                r.setRequestHeader(header[0], header[1]);
            });
        }
        var bodyLink = '';
        // let formData = null;
        if (parame.method === egret.HttpMethod.POST) {
            var body = parame.body || {};
            // formData = new FormData();
            for (var key in body) {
                // formData.append(key, body[key]);
                var bodyParsed = void 0;
                if (typeof body[key] === 'object') {
                    bodyParsed = JSON.stringify(body[key]);
                }
                else {
                    bodyParsed = body[key];
                }
                bodyLink += key + "=" + bodyParsed + "&";
            }
        }
        r.send(bodyLink);
        r.addEventListener(egret.Event.COMPLETE, function (e) {
            var response = e.currentTarget;
            var responseText = response.response;
            // console.log(e.currentTarget);
            var retResponse = {
                response: responseText,
                status: response._xhr.status,
                header: response.getAllResponseHeaders(),
                json: function () {
                    return new Promise(function (resolve, _) { return resolve(JSON.parse(responseText)); });
                },
                text: function () {
                    return new Promise(function (resolve, _) { return resolve(responseText); });
                },
                blob: function () {
                    return new Promise(function (resolve, _) {
                        var blob = new Blob([JSON.stringify(JSON.parse(responseText), null, 2)], {
                            type: 'application/json'
                        });
                        resolve(blob);
                    });
                }
            };
            resolve(retResponse);
        }, _this);
    });
}
//# sourceMappingURL=Fetch.js.map