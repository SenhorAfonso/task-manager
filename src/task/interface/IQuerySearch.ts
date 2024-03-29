interface IQuerySearch {
  category?: string,
  status?: 'pending' | 'in-progress' | 'finished',
  expiration?: string,
  userID?: string
}

export default IQuerySearch;