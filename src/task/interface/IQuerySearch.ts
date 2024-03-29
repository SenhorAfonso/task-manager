interface IQuerySearch {
  category?: string,
  status?: 'pending' | 'in-progress' | 'finished',
  conclusion?: string,
  userID?: string
}

export default IQuerySearch;