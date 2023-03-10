import './App.css';
import { useState, useEffect } from 'react';
import Header from './Header';
import Main from './Main';

function App() {
  const [word, setWord] = useState('')
  const [loading, setLoading] = useState(true)
  const [errorState, setErrorState] = useState(false)

  useEffect(() => {
    fetch('https://api.dictionaryapi.dev/api/v2/entries/en/word')
    .then(res => res.json())
    .then(data => {
      setWord(data[0])
      setLoading(false)
    })
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setErrorState(true)
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${document.getElementById('search-input').value}`)
    .then(res => {
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
      return <h1>Loading...</h1>
    } else if(errorState){
      return (
        <div>
          <button onClick={() => window.location.reload()}>Search</button>
        </div>
      )
    } else {
      return <Main submitHandler={handleSubmit} word={word.word} phonetic={word.phonetics[0].text} meanings={word.meanings} source={word.sourceUrls[0]} />
    }
  }

  return (
    <div className="container--all">
      <Header />
      {handleComponents()}
     
    </div>
  );
}

export default App;
