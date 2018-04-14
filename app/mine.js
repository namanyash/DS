const blockchain = require('../blockchain');
class Mine {
  constructor(blockchain, checkoutPool, p2p) {
    this.p2p = p2p;
    this.blockchain = blockchain;
    this.checkoutPool = checkoutPool;
  }
  minePool() {
    console.log(this.checkoutPool);
    this.blockchain.addBlock(this.checkoutPool.checkoutPool);
    this.p2p.syncChains();
    this.p2p.clearPool();
  }
}

module.exports = Mine;
