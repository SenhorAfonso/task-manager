import type mongoDocument from '../../types/mongoDocument';

interface taskDocument extends mongoDocument {
  title: string | null,
  categoryID: string | null,
  type: string | null,
  status: 'pending'| 'in-progress'| 'finished' | null,
  date_conclusion: Date | null,
  date_creation: Date | null,
  description: string
}
export default taskDocument;