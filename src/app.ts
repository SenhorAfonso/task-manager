import server from './server';
import serverConfig from './config/config';

class App {
  private port: number = Number(serverConfig.SERVER_PORT);

  constructor() {
    this.start();
  }

  private start() {
    server.listen(this.port, () => {
      console.log(`server is listening at ${this.port} port!`);
    });
  }
}

new App();