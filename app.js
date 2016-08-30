var os = require("os");
var cluster = require("cluster");
var express = require('express');
if (cluster.isMaster) {
    var numberOfCPUs = os.cpus().length;
    for (var i = 0; i < numberOfCPUs; i++) {
        cluster.fork();
    }
    cluster.on('exit', function (worker) {
        console.log('Worker %d died :(', worker.id);
        cluster.fork();
    });
}
else {
    var app = express();
    app.get('/:input', function (req, res) {
        console.log('Request handled by worker %d', cluster.worker.id);
        setTimeout(function () {
            res.send('Hello from worker ' + cluster.worker.id);
            console.log('Request completed by worker %d', cluster.worker.id);
        }, 5000);
    });
    app.listen(3000);
    console.log('Worker %d running!', cluster.worker.id);
}
//# sourceMappingURL=app.js.map