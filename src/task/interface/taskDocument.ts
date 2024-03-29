import type mongoDocument from '../../types/mongoDocument';

interface taskDocument extends mongoDocument {
  categoryID: string,
  status: 'pending'| 'in-progress'| 'finished'
}
export default taskDocument;