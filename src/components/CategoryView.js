import React from 'react'
import {Link} from 'react-router-dom'

function CategoryView(props) {
  return (
    <div>
      <Link to='/' className='close-search'/>
      {props.location.pathname}
    </div>
  )
}

export default CategoryView
