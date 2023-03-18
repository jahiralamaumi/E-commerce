const yup = require("yup");

// Create User Schema Definition
const createUserSchema = yup.object().shape({
    firstName: yup
        .string()
        .min(2, "Must be at least two characters.")
        .max(50, "Maximum 30 characters")
        .required("First Name is required"),
    lastName: yup
        .string()
        .min(2, "Must be at least two characters.")
        .max(50, "Maximum 30 characters")
        .required("Last Name is required"),
    email: yup
        .string()
        .email("Enter a valid email")
        .required("Email is required"),
    password: yup
        .string()
        .min(8, 'Must be at least 8 characters')
        .max(50, "Maximum 50 characters")
        .required("Password is required"),
    confirmPassword: yup
        .string()
        .required("Confirm password is required")
        .oneOf([yup.ref('password'), null], 'Password and Confirm password must be matched'),   
});

// Update user schema definition ( Only firstname & lastname )
const updateUserSchema = yup.object().shape({
    firstName: yup
        .string()
        .min(2, "Must be at least two characters.")
        .max(50, "Maximum 30 characters")
        .required("First Name is required"),
    lastName: yup
        .string()
        .min(2, "Must be at least two characters.")
        .max(50, "Maximum 30 characters")
        .required("Last Name is required"),
})

module.exports.createUserSchema = createUserSchema;
module.exports.updateUserSchema = updateUserSchema;
