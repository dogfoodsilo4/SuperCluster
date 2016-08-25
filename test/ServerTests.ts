/// <reference path="../typings/chai/chai.d.ts" />
/// <reference path="../typings/mocha/mocha.d.ts" />

import chai = require('chai');

import Server = require('../Server');

/**
* These tests cover the basics
*/
describe("Server", function() {

    let _server = new Server();

    it("should start", function (done)
    {
        chai.expect(_server.Start()).to.equal("Server Started Successfully");
        done();
    });
});
