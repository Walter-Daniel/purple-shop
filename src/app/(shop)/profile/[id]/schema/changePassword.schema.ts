import * as Yup from 'yup';

// Validation schema with Yup
export const changePasswordSchema = Yup.object().shape({
  oldPassword: Yup.string()
    .required('Old password is required'),
    // .min(8, 'Password must be at least 8 characters')
    // .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    // .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    // .matches(/[0-9]/, 'Password must contain at least one number')
    // .matches(/[@$!%*?&]/, 'Password must contain at least one special character (@, $, !, %, *, ?, &)'),

  newPassword: Yup.string()
    .required('New Password is required'),
    // .min(8, 'Password must be at least 8 characters')
    // .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    // .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    // .matches(/[0-9]/, 'Password must contain at least one number')
    // .matches(/[@$!%*?&]/, 'Password must contain at least one special character (@, $, !, %, *, ?, &)'),

  confirmNewPassword: Yup.string()
    .required('Confirm new password is required')
    .oneOf([Yup.ref('newPassword')], 'Passwords must match'),
});
