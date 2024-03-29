import type mongoDocument from '../../types/mongoDocument';

interface taskDocument extends mongoDocument {
  categoryID: string,
  status: 'pending'| 'in-progress'| 'finished',
  date_conclusion: Date
}
export default taskDocument;