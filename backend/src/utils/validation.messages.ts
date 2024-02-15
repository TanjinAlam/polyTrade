export function message(field: string) {
    return {
        isString: `Invalid format of the field ${field}`,
        isNotEmpty: `${field} can not be empty`,
        isEmail: `Invalid ${field} format`
    }
}
