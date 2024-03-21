import server from './server';

class App {
  constructor() {
    this.start();
  }

  private start() {
    server.listen(3000, () => {
      console.log('server is listenin at 3000 port!');
    });
  }
}

new App();