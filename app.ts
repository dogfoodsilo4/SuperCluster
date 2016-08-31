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
    let id = cluster.worker.id;

    var slowFunc = (cb: () => void) => {
        setTimeout(() => {
            return cb();
        }, 1000);
    };

    // Add index page
    app.get('/:input', (req, res) => {
        console.log('Request handled by worker %d', id);

        slowFunc(() => {
            res.send('Hello from worker ' + id);
            console.log('Request completed by worker %d', id);
        });
    });

    // Bind to a port
    app.listen(3000);
    console.log('Worker %d running!', id);
}
