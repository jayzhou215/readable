import React from 'react'
import {trim} from '../utils/util'
import {Link} from 'react-router-dom'

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
          <li key={name} >
            <Link to={'/' + categories[name]} >{trim(name)}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CategoryList
