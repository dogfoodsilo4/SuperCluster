/// <reference path="typings/node/node.d.ts" />

import os      = require("os");
import cluster = require("cluster");
import express = require('express');

if (cluster.isMaster)
{
    let numberOfCPUs = os.cpus().length;
    for (var i = 0; i < numberOfCPUs; i++)
    {
        cluster.fork();
    }

    cluster.on('exit', function (worker) {

        // Replace the dead worker
        console.log('Worker %d died :(', worker.id);
        cluster.fork();

    });
}
else
{
    let app = express();

    // Add index page
    app.get('/:input', (req, res) => {
        console.log('Request handled by worker %d', cluster.worker.id);

        setTimeout(() => {
                res.send('Hello from worker ' + cluster.worker.id);
                console.log('Request completed by worker %d', cluster.worker.id);
            }
            ,5000);
    });

    // Bind to a port
    app.listen(3000);
    console.log('Worker %d running!', cluster.worker.id);
}
