import { uniqueId } from 'lodash'

import FieldErrors from './FieldErrors'

export default function EditableField(
  {label, name, value, onChange, unit, errors}
) {
  let unitContent
  if (unit) {
    unitContent = (
      <>
        {' '}
        {unit}
      </>
    )
  }
  let errorsContent = <FieldErrors errors={errors}/>
  if (errorsContent) {
    errorsContent = (
      <>
        {' '}
        {errorsContent}
      </>
    )
  }
  const id = uniqueId(`${name}_`)
  return (
    <>
      <dt><label htmlFor={id}>{label}</label></dt>
      <dd>
        <input
          type="text"
          id={id}
          value={value}
          onChange={onChange}
        />
        {unitContent}
        {errorsContent}
      </dd>
    </>
  )
}
