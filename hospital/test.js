const Hospital = require('./hospital');
const Checkout = require('./checkout');
const hospital = new Hospital();
const check = new Checkout(1, 2, 3, 4, 5, 7, 8, 2);
const checkout = hospital.createCheckout(1, 2, 3, 4, 5, 6, 7, 866);
console.log(checkout);
console.log('----------------');
checkout.aadhar = 12231;
console.log(Checkout.verifyCheckout(checkout));
