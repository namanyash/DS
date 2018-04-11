const { ChainUtil } = require('../chain-util');
const Checkout = require('./checkout');
const CheckoutPool = require('./checkout-pool');
class Hospital {
  constructor() {
    this.keyPair = ChainUtil.genKeyPair();
    this.publicKey = this.keyPair.getPublic().encode('hex');
    console.log(
      `Your public key is ${
        this.publicKey
      } please make sure that you validate this key with the admin`
    );
  }
  createCheckout(
    aadhar,
    allergies,
    ailment,
    medicinesUsed,
    testsConducted,
    testResults,
    additionalComments,
    administeringDoctors,
    checkoutPool
  ) {
    //if this is a valid hospital only then proceed
    let checkout = Checkout.createCheckout(
      aadhar,
      allergies,
      ailment,
      medicinesUsed,
      testsConducted,
      testResults,
      additionalComments,
      administeringDoctors,
      this
    );
    checkoutPool.addCheckout(checkout);
    return checkout;
  }
  sign(dataHash) {
    return this.keyPair.sign(dataHash);
  }
}

module.exports = Hospital;
