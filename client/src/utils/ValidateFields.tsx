import { FormInstance } from "antd"

export default function areFieldsInvalid(form: FormInstance, fields: string[]) {
    const notAllTouched = !fields.every(d => form.isFieldTouched(d))
    const validationErrors = fields.some(d => form.getFieldError(d).length !== 0)
    const someNull = fields.some(d => form.getFieldValue(d) === null)

    return notAllTouched || someNull || validationErrors
}