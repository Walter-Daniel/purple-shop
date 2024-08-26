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

  password: Yup.string()
    .required('Password is required'),
    // .min(8, 'Password must be at least 8 characters')
    // .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    // .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    // .matches(/[0-9]/, 'Password must contain at least one number')
    // .matches(/[@$!%*?&]/, 'Password must contain at least one special character (@, $, !, %, *, ?, &)'),

    role: Yup.string()
    .oneOf(['admin', 'user'], 'Role must be either "admin" or "user"')
    .required('Role is required'),
    id: Yup.string()

});
