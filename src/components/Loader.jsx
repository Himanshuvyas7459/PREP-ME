import React from 'react'

const Loader = ({loadingMessage = "Loading..." , color = "text-gray-400"}) => {
  return (
    <div className="min-h-screen flex items-center justify-center">
        <h1 className={`${color} text-4xl font-bold`}>{loadingMessage}</h1>
      </div>
  )
}

export default Loader