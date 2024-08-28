import * as Yup from 'yup';

// Validation schema with Yup
export const userValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required')
    .matches(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces')
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name cannot exceed 50 characters'),

  email: Yup.string()
    .required('Email is required')
    .email('Email is invalid'),

    role: Yup.string()
    .oneOf(['admin', 'user'], 'Role must be either "admin" or "user"')
    .required('Role is required'),
    id: Yup.string()

});
