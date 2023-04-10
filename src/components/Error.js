import React from 'react'
import '../stylesheets/Error.css'

export default function Error({}) {
   //if the word does not exist, the user will be able to press the button and refresh the page.  
  return (
    <div className='container--error'>
      <h2>Uh oh!</h2>
      <p>Could not find that word. Please check the spelling and try again, or try another word.</p>
      <button onClick={() => window.location.reload()}>Try Again</button>
    </div>
  )
}
