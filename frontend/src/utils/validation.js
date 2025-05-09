export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(String(email).toLowerCase())
}

export const validatePassword = (password) => {
  return password.length >= 8
}

export const validateMaterialForm = (formData) => {
  const errors = {}
  
  if (!formData.title || formData.title.length < 5) {
    errors.title = 'Title must be at least 5 characters'
  }
  
  if (!formData.course) {
    errors.course = 'Please select a course'
  }
  
  if (!formData.file) {
    errors.file = 'Please select a file'
  }
  
  return errors
}