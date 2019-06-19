const expect = require('chai').expect;
const Nightmare = require('nightmare');
const express = require('express');
const axios = require('axios');
const path = require('path');

const app = require('../server.js'); //express();

const url='http://localhost:8888';
const urlPortfolio='http://localhost:8888/portfolio';
const urlContact='http://localhost:8888/contact';

describe("Portfolio Tests", function() {
  let nightmare = new Nightmare();
  let httpServer = null;
  let portfolioPage = null;
  let contactPage = null;
  this.timeout(10000);

  before(done => {
    httpServer = app.listen(8888);
    done();
  });
  
  // beforeEach(() => {
  //   let nightmare = new Nightmare({
      // openDevTools: {
      //  mode: 'detach'
      // },
      // show: true
  //    });
  // });

  after((done) => {
    httpServer.close();
    done();
  });
  
  it('should load successfully', () => axios.get(url).then(r => expect(r.status === 200)));

  before(done => {
    portfolioPage = nightmare.goto(urlPortfolio);
    done();
  });

  it('should contain a .carousel-item', () => { 
    return portfolioPage
      .evaluate(() => document.getElementsByClassName('carousel-item'))
      .then(output => {
        expect(output).to.exist;
        expect(output).to.not.be.null;
        expect(typeof output).to.equal('object');
         });
  });

  before(done => {
    contactPage = nightmare.goto(urlContact);
    done();
  });

  it('should contain a email field', () => { 
    return contactPage
      .evaluate(() => document.querySelector('#email'))
      .then(output => {
        expect(output).to.exist;
        expect(output).to.not.be.null;
        expect(typeof output).to.equal('object');
         });
  });




});