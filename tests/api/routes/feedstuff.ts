// Imports
import 'mocha';
import { expect } from 'chai';
import request = require('supertest');
import express = require("express");

// Imports app
import { WebApi } from './../../../api/src/app';


let webApi = new WebApi(express(), 3000);

describe('GET /api/feedstuff/list', function() {
  it('respond with json', function(done) {
    request(webApi.getApp())
      .get('/api/feedstuff/list')
      .expect(200)
      .then(response => {
          expect(response.body.length).to.be.greaterThan(0);
          done();
      });
  });
});

