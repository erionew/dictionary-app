import React from 'react'
import { useState, useEffect } from 'react';
import '../stylesheets/Main.css'
import searchIMG from '../images/search.png'

export default function Main( {submitHandler, word, phonetic, meanings, source} ) {

    return (

        <div>
          <form className='form--word-search' onSubmit={submitHandler}>
            <input id='search-input' type="text" placeholder='Enter word here...'/>
            <button type="submit" >
              <img id="button__img"src={searchIMG} alt="magnifying glass"></img>
            </button>
          </form>

          <div className='container--word-info'>
            <h2 className='word-info__word'>{word}</h2>
            <p className='word-info__phonetic'>{phonetic}</p>
          </div>

          {meanings.map((meaning, i) => {
              return(
                <div key={i} className='container--meaning'>
                  <p className='meaning__part-of-speech'>{meaning.partOfSpeech}</p>
                  <h3>Meaning</h3>
                  <ul className='meaning__list'>
                    {meaning.definitions.map((definition, j) => {
                      return(
                        <li key={j}>{definition.definition}</li>
                      )
                    })}
                  </ul>
                  {meaning.synonyms.length > 0 && 
                    <div className='flex'>
                      <h3>Synonyms</h3>
                      {meaning.synonyms.map((synonym, k) => <span key={k} className='meaning__synonym'>{synonym}</span>)}
                    </div>} 
                  
                </div>
              )
            })
          }

          <div className='flex'>
            <h4>Source</h4>
            <p>{source}</p>
          </div>
        </div>
      )

}