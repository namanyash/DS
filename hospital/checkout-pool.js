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
    if (data.length > 0) {
      if ((this.checkoutPool = [])) {
        this.checkoutPool = data;
      } else {
        this.checkoutPool.push(data[data.length - 1]);
      }
    }
  }
}

module.exports = CheckoutPool;
