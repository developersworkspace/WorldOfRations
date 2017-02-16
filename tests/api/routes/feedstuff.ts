// Imports
import 'mocha';
import { expect } from 'chai';
import request = require('supertest');
import express = require("express");

// Imports app
import { WebApi } from './../../../api/src/app';


let webApi = new WebApi(express(), 3000);


let existingFormulaIdWithSuggestedValue = 'CB0360F3-4617-4922-B20D-C3F223BBBCEB';
let existingFeedstuffIdWithSuggestedValue = 'B3EDBFD3-CB3C-4427-A6FB-B20EBF4FC831';
let nonExistingFeedstuffId = '078567E3-A67E-4737-B273-4AE381FDBACD';
let nonExistingFormulaId = '3DE8F48A-CC7A-4217-B317-979866B42BB6';

describe('GET /api/feedstuff/list', () => {
  it('responds with list of feedstuff', () => {
    return request(webApi.getApp())
      .get('/api/feedstuff/list')
      .expect(200)
      .then(response => {
        expect(response.body.length).to.be.greaterThan(0);
      });
  });
});

describe('GET /api/feedstuff/suggestedValues', () => {
  it('responds with null given non-existing feedstuff id and non-existing formula id', () => {
    return request(webApi.getApp())
      .get('/api/feedstuff/suggestedValues')
      .field('formulaId', nonExistingFeedstuffId)
      .field('feedstuffId', nonExistingFormulaId)
      .expect(200)
      .then(response => {
        expect(response.body).to.be.null;
      });
  });
  it('responds with object given existing feedstuff id and existing formula id', () => {
    return request(webApi.getApp())
      .get('/api/feedstuff/suggestedValues')
      .field('formulaId', existingFormulaIdWithSuggestedValue)
      .field('feedstuffId', existingFeedstuffIdWithSuggestedValue)
      .expect(200)
      .then(response => {
        expect(response.body).to.be.null;
      });
  });
});

describe('GET /api/feedstuff/listExample', () => {
  it('responds with list of feedstuff', () => {
    return request(webApi.getApp())
      .get('/api/feedstuff/listExample')
      .expect(200)
      .then(response => {
        expect(response.body.length).to.be.greaterThan(0);
      });
  });
});

