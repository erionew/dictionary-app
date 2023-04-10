import React from 'react'
import '../stylesheets/Header.css'
import dictionary from '../images/dictionary.svg'


export default function Header() {
  return (
    <header>
        <img id='header__dictionary-img'src={dictionary}></img>
        <h1>Dictionary</h1>
    </header>
  )
}
