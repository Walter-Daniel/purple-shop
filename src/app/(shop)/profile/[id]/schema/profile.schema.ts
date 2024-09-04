import * as Yup from 'yup';

// Validation schema with Yup
export const profileValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required')
    .matches(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces')
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name cannot exceed 50 characters'),

  email: Yup.string()
    .required('Email is required')
    .email('Email is invalid'),

});


export function checkIfFilesAreTooBig(files?: File[]): boolean {
  let valid = true
  if (files) {
    files.map(file => {
      const size = file.size / 1024 / 1024
      if (size > 10) {
        valid = false
      }
    })
  }
  return valid
}

export function checkIfFilesAreCorrectType(files?: File[]): boolean {
  let valid = true
  if (files) {
    files.map(file => {
      if (!['application/pdf', 'image/jpeg', 'image/png'].includes(file.type)) {
        valid = false
      }
    })
  }
  return valid
}