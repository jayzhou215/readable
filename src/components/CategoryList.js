import React from 'react'
import {trim} from '../utils/util'

function CategoryList({categories, jump}) {
  const hasCategroy = Object.keys(categories).length > 0
  if (!hasCategroy) {
    return <p>no cagetory yet</p>
  }
  return (
    <div>
      <p>Categories</p>
      <ul className='category-list'>
        {Object.keys(categories).map((name) => (
          <li key={name} onClick={()=> jump(categories[name])}>
            <h3>{trim(name)}</h3>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CategoryList
