interface IcreateTask {
  userID: string
  title: string,
  description: string,
  date_creation?: Date,
  date_conclusion?: Date,
  type: string,
  category: string,
  categoryID?: string,
  status?: string,
}

export default IcreateTask;