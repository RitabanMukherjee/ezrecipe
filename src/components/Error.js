import React from 'react'
import { useNavigate } from 'react-router-dom'

const Error = () => {
    const navigation = useNavigate();
  return (<div className='error-div'>    
  <h1>Something seems to have gone wrong!</h1>
  <button className='submit-btn' type='btn' onClick={() => navigation('../')}>Back to Home Page</button>
</div>

  )
}

export default Error