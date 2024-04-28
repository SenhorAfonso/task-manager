import type mongoDocument from '../../types/mongoDocument';

interface taskDocument extends mongoDocument {
  title: string,
  categoryID: string,
  type: string,
  status: 'pending'| 'in-progress'| 'finished',
  date_conclusion: Date,
  date_creation: Date,
  description: string
}
export default taskDocument;