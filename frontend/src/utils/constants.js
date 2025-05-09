export const MATERIAL_TYPES = [
  { value: 'PDF', label: 'PDF Document' },
  { value: 'DOC', label: 'Word Document' },
  { value: 'PPT', label: 'PowerPoint' },
  { value: 'VIDEO', label: 'Video' },
  { value: 'AUDIO', label: 'Audio' },
]

export const FILE_EXTENSIONS = {
  PDF: ['.pdf'],
  DOC: ['.doc', '.docx'],
  PPT: ['.ppt', '.pptx'],
  VIDEO: ['.mp4', '.mov', '.avi'],
  AUDIO: ['.mp3', '.wav'],
}

export const MAX_FILE_SIZE = 50 * 1024 * 1024 // 50MB