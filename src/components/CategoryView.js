import React from 'react'
import {Link} from 'react-router-dom'

function CategoryView(props) {
  return (
    <div>
      <Link to='/' className='close-search'/>
      {console.log(props)}
      {props.match.params.category}
    </div>
  )
}

export default CategoryView
