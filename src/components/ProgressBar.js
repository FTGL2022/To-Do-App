import React from 'react'

const ProgressBar = ({progress}) => {
  const colors = ['#11998e', '#38ef7d', '#f9d423', '#f8961e', '#f94144']
  const randomColor= colors[Math.floor(Math.random () * colors.length)]


  return (
    <div className="outer-bar">
      <div className="inner-bar" 
      style={{width:`${progress}%` , backgroundColor: randomColor}}
      >

      </div>
      
    </div>
  )
}

export default ProgressBar
