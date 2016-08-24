import React from 'react'
import './Cell.css'
import classNames from 'classnames'

export default ({alive, index, click}) => {
  return <div onClick={() => {click(index)}} className={classNames('Cell', {'Cell-alive': alive})}></div>
}
