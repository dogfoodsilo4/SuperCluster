/// <reference path="../typings/chai/chai.d.ts" />
/// <reference path="../typings/mocha/mocha.d.ts" />

import chai = require('chai');

import Server = require('../Server');

/**
* These tests cover the basics
*/
describe("Server Tests", function() {

    let _server = new Server();

    it("Server should start and stop", function (done)
    {
        _server.Start();
        chai.expect(_server.Status()).to.equal("Started");

        _server.Stop();
        chai.expect(_server.Status()).to.equal("Stopped");

        done();
    });
});
