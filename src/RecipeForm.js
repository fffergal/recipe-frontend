import { cloneDeep, isEqual } from 'lodash'
import { useState } from 'react'

import EditableField from './EditableField'

export default function RecipeForm({ init, onSave }) {
  const [savedData, setSavedData] = useState(init)
  const [data, setData] = useState(savedData)
  const [saving, setSaving] = useState(false)
  const [justSaved, setJustSaved] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [fieldErrors, setFieldErrors] = useState({})
  const submit = evt => {
    evt.preventDefault()
    setSaving(true)
    const save = async () => {
      let newData
      try {
        newData = await onSave(data)
      } catch (e) {
        setErrorMessage(e.toString())
        setSaving(false)
        if (e.response) {
          setFieldErrors(e.response)
        }
        return
      }
      setErrorMessage('')
      setFieldErrors({})
      setSavedData(newData)
      setSaving(false)
      setJustSaved(true)
    }
    save()
  }
  const makeOnChange = setter => {
    return evt => {
      setJustSaved(false)
      const newData = cloneDeep(data)
      setter(newData, evt.target.value)
      setData(newData)
    }
  }
  let success
  if (justSaved) {
    success = <span className="success">Saved</span>
  }
  let error
  if (errorMessage !== '') {
    error = <p><span className="error">{errorMessage}</span></p>
  }
  return (
    <>
      {error}
      <form onSubmit={submit}>
        <dl>
          <EditableField
            label="Title"
            name="title"
            value={data.title}
            onChange={makeOnChange((d, v) => { d.title = v })}
            errors={fieldErrors.title}
          />
          <EditableField
            label="Time"
            name="time_minutes"
            value={data.time_minutes}
            onChange={makeOnChange((d, v) => { d.time_minutes = v })}
            unit="minutes"
            errors={fieldErrors.time_minutes}
          />
          <EditableField
            label="Price"
            name="price"
            value={data.price}
            onChange={makeOnChange((d, v) => { d.price = v })}
            errors={fieldErrors.price}
          />
          <EditableField
            label="Link"
            name="link"
            value={data.link}
            onChange={makeOnChange((d, v) => { d.link = v })}
            errors={fieldErrors.link}
          />
          {data.ingredients.map((ingredient, index) => (
            <div key={`ingredient_${index + 1}`}>
              <EditableField
                label={`Ingredient ${index + 1}`}
                name={`ingredient_${index + 1}`}
                value={ingredient.name}
                onChange={
                  makeOnChange((d, v) => { d.ingredients[index].name = v })
                }
                errors={fieldErrors.ingredients?.reduce((a, c) => a.concat(c.name), [])}
              />
              <button onClick={evt => {
                evt.preventDefault()
                setJustSaved(false)
                const newData = cloneDeep(data)
                newData.ingredients.splice(index, 1)
                setData(newData)
              }}>
                Delete ingredient {index + 1}
              </button>
            </div>
          ))}
          <button onClick={evt => {
            evt.preventDefault()
            setJustSaved(false)
            const newData = cloneDeep(data)
            newData.ingredients.push({name: ""})
            setData(newData)
          }}>
            Add ingredient
          </button>
          <EditableField
            label="Description"
            name="description"
            value={data.description}
            onChange={makeOnChange((d, v) => { d.description = v })}
            errors={fieldErrors.description}
          />
        </dl>
        <button type="submit" disabled={saving || isEqual(init, data)}>
          {saving ? 'Saving...' : 'Save'}
        </button>
        {success}
      </form>
    </>
  )
}
