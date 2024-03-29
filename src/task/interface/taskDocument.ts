import type mongoDocument from '../../types/mongoDocument';

interface taskDocument extends mongoDocument {
  categoryID: string
}
export default taskDocument;