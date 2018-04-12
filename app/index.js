const express = require('express');
const { Blockchain } = require('../blockchain');
const bodyParser = require('body-parser');
const { P2P } = require('./p2p-server');
const CheckoutPool = require('../hospital/checkout-pool');
const Hospital = require('../hospital/hospital');
console.log(Hospital);
const HTTP_PORT = process.argv[2] || 3001;
const app = express();
const bc = new Blockchain();
const cp = new CheckoutPool();
const p2p = new P2P(bc, cp);
const hospital = new Hospital();
app.use(bodyParser.json());

app.get('/blocks', (req, res) => {
  res.json(bc.chain);
});

app.post('/mine', (req, res) => {
  const block = bc.addBlock(req.body.data);
  console.log(`New block added : ${block.toString()}`);
  p2p.syncChains();
  res.redirect('/blocks');
});
app.listen(HTTP_PORT, () => {
  console.log(`listening on port ${HTTP_PORT}`);
});
app.post('/checkout', (req, res) => {
  const {
    aadhar,
    allergies,
    ailment,
    medicinesUsed,
    testsConducted,
    testResults,
    additionalComments,
    administeringDoctors
  } = req.body;
  const checkout = hospital.createCheckout(
    aadhar,
    allergies,
    ailment,
    medicinesUsed,
    testsConducted,
    testResults,
    additionalComments,
    administeringDoctors,
    cp
  );
  p2p.broadcastPool(cp);
  res.redirect('./checkoutPool');
});

app.get('/checkoutPool', (req, res) => {
  res.json(cp);
});
p2p.listen();
