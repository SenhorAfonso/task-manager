interface IUpdateTask {
  title: string,
  description: string,
  type: string,
  category: string,
  status: 'pending' | 'in-progress' | 'finished'
}

export default IUpdateTask;