const Hospital = require('./hospital');
const Checkout = require('./checkout');
class CheckoutPool {
  constructor() {
    this.checkoutPool = [];
  }
  addCheckout(checkout) {
    if (Checkout.verifyCheckout(checkout)) {
      this.checkoutPool.push(checkout);
    } else {
      console.log('Invalid checkout signature');
    }
  }
  pushCheckout(data) {
    this.checkoutPool.push(data[data.length - 1]);
  }
}

module.exports = CheckoutPool;
