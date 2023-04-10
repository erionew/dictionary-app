import './App.css';
import { useState, useEffect } from 'react';
import Header from './components/Header.js';
import Main from './components/Main.js';
import Error from './components/Error.js';

function App() {
  const [word, setWord] = useState('')
  const [loading, setLoading] = useState(true)
  const [errorState, setErrorState] = useState(false)

  //useEffect below will run when the document is loaded. I have prefilled the api url with a word to fill the page at start. 

  useEffect(() => {
    fetch('https://api.dictionaryapi.dev/api/v2/entries/en/word')
    .then(res => res.json())
    .then(data => {
      setWord(data[0])
      setLoading(false)
    })
  }, [])

  //when the use submits a word, it will fetch the word data from the api and set it to the state. 

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setErrorState(true)
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${document.getElementById('search-input').value}`)
    .then(res => {
      //if the word does not exist in the api, the errorState will be set to true. Which will allow me to return the error page component.
      if(res.status >= 400){
        setErrorState(true)
        setLoading(false)
        throw new Error("error")
      } 
      setErrorState(false)
      setLoading(false)
      return res.json()

    })
    .then(data => setWord(data[0]))

  }

  const handleComponents = () => {
    if(loading){
      //the page will show this text when the data is being fetched and checked. In the future this can be changed to render a loading animation.
      return <h1>Loading...</h1>
    } else if(errorState){
      return (
        <>
        <Error />
        </>
      )
    } else {
      //If the word exists, it will render the main component.
      return <Main submitHandler={handleSubmit} word={word.word} phonetic={ word.phonetics.length > 1 ? word.phonetics[0].text : `/${word.word}/`} meanings={word.meanings} source={word.sourceUrls[0]} />
    }
  }

  return (
    // The header component will always be rendered.
    <div className="container--all">
      <Header />
      {handleComponents()}
     
    </div>
  );
}

export default App;
