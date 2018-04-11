const Hospital = require('./hospital');
const Checkout = require('./checkout');
class CheckoutPool {
  constructor() {
    this.checkout = [];
  }
  addCheckout(checkout) {
    if (Checkout.verifyCheckout(checkout)) {
      this.checkout.push(checkout);
    } else {
      console.log('Invalid checkout signature');
    }
  }
}
