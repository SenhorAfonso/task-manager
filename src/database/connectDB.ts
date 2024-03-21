import IORM from './interfaces/ORM';

class DataBase {
  private URL: string;
  private ORM: IORM;

  constructor(ORM: IORM, URL: string) {
    this.URL = URL;
    this.ORM = ORM;
  }

  async connect() {
    try {
      await this.ORM.connect(this.URL);
    } catch (error) {
      await this.ORM.disconnect();
      throw new Error('Internal Server Error');
    }
  }
}

export default DataBase;