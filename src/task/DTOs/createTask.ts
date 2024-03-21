interface createTask {
  title: string,
  description: string,
  date_creation?: Date,
  date_conclusion?: Date,
  type: string,
  category: string,
  status?: string,
  userId?: string
}

export default createTask;