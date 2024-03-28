'use strict'

import React, { StrictMode, useState, createContext, useContext } from 'https://esm.sh/react?dev'
import { createRoot } from 'https://esm.sh/react-dom/client?dev'
import { quotes, colors } from './quotes-and-colors.js'

const get_Quote = () => quotes[Math.floor(Math.random() * quotes.length)]
const get_Color = () => colors[Math.floor(Math.random() * colors.length)]

const QuoteContext = createContext()

function RandomQuote({ children }) {
   document.getElementById("root").style.backgroundColor = get_Color()

   const [quoteInfo, setQuoteInfo] = useState(get_Quote())

   return (
      <article id='quote-box' style={{ backgroundColor: get_Color(), maxWidth: '35em', minHeight: '20em' }}
         className='d-flex flex-column align-items-center justify-content-between p-4 rounded'>
         <QuoteContext.Provider value={{ quoteInfo, setQuoteInfo }}>
            {children}
         </QuoteContext.Provider>
      </article>
   );
}

function Quoteframe() {
   const { quoteInfo } = useContext(QuoteContext)

   return (
      <section className='text-bg-light opacity-75 rounded'>
         <blockquote id='text' className='blockquote opacity-1 p-3 lh-lg'>"{quoteInfo.quote}"</blockquote>
         <p id='author' className='blockquote-footer fs-5'>{quoteInfo.author}</p>
      </section>
   )
}

function Buttons() {
   const { quoteInfo, setQuoteInfo } = useContext(QuoteContext)

   const href = `https://twitter.com/intent/tweet?text="${encodeURI(quoteInfo.quote + `"\n- ${quoteInfo.author}`)}&url=`

   return (
      <section className='d-flex justify-content-center align-items-center gap-3'>
         <button id='new-quote' type='button' onClick={() => setQuoteInfo(get_Quote())}
            className='btn btn-primary text-capitalize'>
            new quote
         </button>
         <a
            id="tweet-quote"
            target="_top"
            data-size="large"
            href={href}
            className="twitter-share-button btn btn-outline-dark"
         >
            <i className="bi bi-twitter-x"></i>
         </a>
      </section>
   )
}

createRoot(document.getElementById('root')).render(
   <>
      <h1>Random Quote Machine</h1>
      <RandomQuote>
         <Quoteframe />
         <Buttons />
      </RandomQuote>
   </>
)