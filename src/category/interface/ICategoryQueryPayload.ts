interface ICategoryQueryPayload {
  limit?: string,
  skip?: string,
  sort?: string,
  page?: string,
  name?: string,
  color?: 'Green' | 'Yellow' | 'Orange' | 'Red' | 'Pink' | 'Purple' | 'Gray' | 'Cyan' | 'Blue'
}

export default ICategoryQueryPayload;