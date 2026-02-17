export const createUserValidationSchema = {

    user_name:{
        notEmpty:{
            errorMessage : "User Name must not be empty"
        },
        isLength:{
            options:{min:5,max:20},
            errorMessage:"User Name must be between 5 and 20 characters long"
        },
        isString:{
            errorMessage:"User Name must be string"
        }
    },
    age:{
    notEmpty:{
        errorMessage : "Age must not be empty"
    }
}
}