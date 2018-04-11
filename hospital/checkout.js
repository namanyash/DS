let possibleInput = {
  aadhar: 123412341234,
  allergies: 'delta, xyz',
  ailment: 'heart-falana',
  medicinesUsed: 'xyx 3 times a day,abc 4 times a day',
  testsConducted: 'alpha, beta, gamma',
  testResults: 'alpha good, beta poor, gamma sucks',
  additionalComments: 'patient is dying bye bye',
  administeringDoctors: 'raam , shaam , polo gopal'
};
const Hospital = require('./hospital');
const SHA = require('crypto-js/sha256');
const { ChainUtil } = require('../chain-util');
class Checkout {
  constructor(
    aadhar,
    allergies,
    ailment,
    medicinesUsed,
    testsConducted,
    testResults,
    additionalComments,
    administeringDoctors
  ) {
    this.id = this.id = ChainUtil.id();
    this.input = null;
    this.aadhar = aadhar;
    this.allergies = allergies;
    this.ailment = ailment;
    this.medicinesUsed = medicinesUsed;
    this.testsConducted = testsConducted;
    this.testResults = testResults;
    this.additionalComments = additionalComments;
    this.administeringDoctors = administeringDoctors;
    console.log('aaaaaaaaaaa');
  }
  static createCheckout(
    aadhar,
    allergies,
    ailment,
    medicinesUsed,
    testsConducted,
    testResults,
    additionalComments,
    administeringDoctors,
    hospital
  ) {
    let checkout = new this(
      aadhar,
      allergies,
      ailment,
      medicinesUsed,
      testsConducted,
      testResults,
      additionalComments,
      administeringDoctors
    );
    Checkout.signCheckout(checkout, hospital);
    return checkout;
  }
  static signCheckout(checkout, hospital) {
    checkout.input = {
      timestamp: Date.now(),
      signingHospital: hospital.publicKey,
      signature: hospital.sign(
        SHA(
          `${checkout.aadhar}${checkout.allergies}${checkout.ailment}${
            checkout.medicinesUsed
          }${checkout.testsConducted}${checkout.testResults}${
            checkout.additionalComments
          }${checkout.administeringDoctors}`
        ).toString()
      )
    };
  }
  static verifyCheckout(checkout) {
    return ChainUtil.verifySignature(
      checkout.input.signingHospital,
      checkout.input.signature,
      SHA(
        `${checkout.aadhar}${checkout.allergies}${checkout.ailment}${
          checkout.medicinesUsed
        }${checkout.testsConducted}${checkout.testResults}${
          checkout.additionalComments
        }${checkout.administeringDoctors}`
      ).toString()
    );
  }
}

module.exports = Checkout;
