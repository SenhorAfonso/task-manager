interface IQuerySearch {
  category?: string,
  taskStatus?: 'pending' | 'in-progress' | 'finished',
  expiration?: string,
  userID?: string
}

export default IQuerySearch;