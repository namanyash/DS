const express = require('express');
const { Blockchain } = require('../blockchain');
const bodyParser = require('body-parser');
const { P2P } = require('./p2p-server');
const HTTP_PORT = process.argv[2] || 3001;
const app = express();
const 
const bc = new Blockchain();
const p2p = new P2P(bc);

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
  const 
});
p2p.listen();
