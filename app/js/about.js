function dynamicallyLoadScript(url) {
    var script = document.createElement("script");
    script.src = url;

    document.body.appendChild(script);
}

dynamicallyLoadScript('module/js-service/data.js');
dynamicallyLoadScript('module/js-service/app.js');
dynamicallyLoadScript('module/_header/_header.js');