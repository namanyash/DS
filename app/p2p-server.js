const websocket = require('ws');

const P2P_PORT = process.argv[3] || 5001;
console.log(P2P_PORT);
const peers = process.argv[4] ? process.argv[4].split(',') : [];

class P2P {
  constructor(blockchain, pool) {
    this.blockchain = blockchain;
    this.checkoutPool = pool;
    this.sockets = [];
  }
  listen() {
    const server = new websocket.Server({ port: P2P_PORT }); //connects to the first main server
    server.on('connection', socket => this.connectSocket(socket));

    this.connectToPeers();
    console.log(`listening for p2p connection on ${P2P_PORT}`);
  }
  connectToPeers() {
    //interlinks the sockets
    console.log(peers);
    peers.forEach(peer => {
      const socket = new websocket(peer);
      socket.on('open', () => this.connectSocket(socket));
    });
  }
  connectSocket(socket) {
    this.sockets.push(socket);
    console.log('socket connected');

    this.messageHandler(socket);
    this.sendChain(socket);
    this.sendPool(socket);
  }
  messageHandler(socket) {
    socket.on('message', message => {
      const data = JSON.parse(message);
      if (data.chain) {
        this.blockchain.replaceChain(data.chain);
      }
      if (data.pool) {
        console.log(data.pool);
        this.checkoutPool.pushCheckout(data.pool.checkoutPool);
      }
      if (data.clearPool) {
        this.checkoutPool.checkoutPool = [];
      }
    });
  }

  syncChains() {
    //when a new block is added by one socket it sould be sent to all servers right?
    this.sockets.forEach(socket => this.sendChain(socket));
  }

  sendChain(socket) {
    socket.send(
      JSON.stringify({
        chain: this.blockchain.chain
      })
    );
  }

  broadcastPool() {
    this.sockets.forEach(socket => this.sendPool(socket));
  }
  sendPool(socket) {
    socket.send(JSON.stringify({ pool: this.checkoutPool }));
  }
  clearPool() {
    this.checkoutPool.checkoutPool = [];
    this.sockets.forEach(socket => this.clearingPool(socket));
  }
  clearingPool(socket) {
    socket.send(JSON.stringify({ clearPool: '1' }));
  }
}

module.exports = { P2P };
