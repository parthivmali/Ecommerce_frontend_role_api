import * as Yup from 'yup';


export const RegisterSchemas = Yup.object({
    name : Yup.string().min(2).max(20).required("First name is mandatory"),
    email: Yup.string().email().required('Email is mandatory'),
    password: Yup
    .string()
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character").required("Password is mandatory"),
})