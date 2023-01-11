export default function FieldErrors({errors}) {
  if (errors && errors.length > 0) {
    return <span className="error">{errors.join(' ')}</span>
  }
  return
}
