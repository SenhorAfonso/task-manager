interface IORM {
  connect(url: string, options?: object | undefined): Promise<any>,
  disconnect(): Promise<void>;
}

export default IORM;