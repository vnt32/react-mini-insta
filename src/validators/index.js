import validator from "validator/es";

export function validatePassword(value) {
    return validator.isLength(value, { min: 8 });
}

export function validateName(value) {
    return validator.isLength(value, { min: 3 });
}
export function validateNick(value) {
    return validator.isAlphanumeric (value)
}

export const validateEmail = validator.isEmail
