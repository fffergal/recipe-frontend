import { isEqual } from 'lodash'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import useSWR from 'swr'

import fetcher, { update } from './lib/fetcher'
import RecipeForm from './RecipeForm'

export default function RecipeEditPage() {
  const { id } = useParams()
  const { data, error, isLoading, isValidating, mutate } = useSWR(
    `/api/recipes/${id}/`, fetcher
  )
  const [firstLoadData, setFirstLoadData] = useState(undefined)
  const submit = async newData => {
    const responseData = await mutate(async () => {
      return (await update(`/api/recipes/${id}/`, newData))
    })
    setFirstLoadData(responseData)
  }
  let content
  if (isLoading) {
    content = <p>Loading current recipe values...</p>
  } else if (error) {
    content = <p>Error loading recipe. {error.toString()}.</p>
  } else if (data.detail) {
    content = <p>Error loading recipe. {data.detail}.</p>
  } else {
    if (firstLoadData === undefined) {
      setFirstLoadData(data)
    }
    let sinceWarning
    if (!isValidating && !isEqual(data, firstLoadData)) {
      sinceWarning = (
        <p>
          <span className="warn">
            Recipe has changed since editing began. Reload the page to avoid
            overwriting changes.
          </span>
        </p>
      )
    }
    content = (
      <>
        {sinceWarning}
        <RecipeForm init={firstLoadData} onSave={submit}/>
      </>
    )
  }
  return (
    <>
      <h2>Edit recipe</h2>
      {content}
      <p><Link to={`/recipes/${id}`}>Go back</Link></p>
    </>
  )
}
