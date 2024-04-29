interface ICategoryQueryObject {
  limit: number,
  skip: number,
  sort: string,
  name?: string,
  color?: 'Green' | 'Yellow' | 'Orange' | 'Red' | 'Pink' | 'Purple' | 'Gray' | 'Cyan' | 'Blue'
}

export default ICategoryQueryObject;