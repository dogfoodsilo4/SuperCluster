/// <reference path="typings/node/node.d.ts" />

import os      = require("os");
import cluster = require("cluster");

class Server
{
    private _status: string;
    private _serverId: number;

    constructor() {
        this._status = "Stopped";
    }

    public Start(): void
    {
        //console.log("Server Starting");

        let numberOfCPUs = os.cpus().length;
        //console.log("Number Of CPUs: " + this._numberOfCPUs);

        if (cluster.isMaster) {
            console.log(`Master Server Started`);

            // Create worker servers, up to the number of available CPUs. i.e. master + (worker * (CPUs - 1) = CPUs
            for (var i = 1; i < numberOfCPUs; i++)
            {
                this._serverId = i;
                cluster.fork();
                console.log(`Worker ${this._serverId} Started`);
            }
        }

        this._status = "Started";
    }

    public Stop(): void
    {
        this._status = "Stopped";
    }

    public Status(): string
    {
        return this._status;
    }
}
export = Server;
