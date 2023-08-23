import * as Yup from 'yup';

export const LoginSchemas = Yup.object({
    email: Yup.string().email().required('Please enter the email'),
    password: Yup
    .string().required("Please enter the password"),
})