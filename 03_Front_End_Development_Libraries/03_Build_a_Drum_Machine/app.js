'use strict'

import React, {
   useState,
   useEffect
} from 'https://esm.sh/react?dev'
import { createRoot } from 'https://esm.sh/react-dom/client?dev'
import { padKeys } from './pad-keys.js'

function DrumMachine({ padKeys }) {
   const [displayText, setDisplayText] = useState('')
   return (
      <>
         <p id='display' className='text-white bg-primary text-center rounded-3'>
            {displayText}
         </p>
         <Keypad
            padKeys={padKeys}
            setDisplayText={setDisplayText}
         />
      </>
   )
}

function Keypad({ padKeys, setDisplayText }) {

   useEffect(() => {
      const keypad = document.body.querySelector('.keypad')
      const audios = Array.from(keypad.querySelectorAll('.clip'))

      keypad.addEventListener('click', click => {
         const audio = click.target.lastElementChild

         if (audio.tagName === 'AUDIO')
         {
            audio.currentTime = 0
            audio.play()

            setDisplayText(click.target.id.toUpperCase())
         }
      }, { passive: true })

      addEventListener('keydown', keydown => {
         const audio = audios.find(e => e.id === keydown.key.toUpperCase())

         if (audio)
         {
            audio.currentTime = 0
            audio.play()

            const parentDiv = audio.parentElement
            parentDiv.classList.add('active')

            setDisplayText(document
               .getElementById(keydown.key.toUpperCase())
               .parentElement.id.toUpperCase())
         }
      }, { passive: true })

      addEventListener('keyup', keyup => {
         const audio = audios.find(e => e.id === keyup.key.toUpperCase())

         if (audio)
         {
            const parentDiv = audio.parentElement
            parentDiv.classList.remove('active')
         }
      }, { passive: true })

   }, [])

   return (
      <div className='keypad'>
         {padKeys.map(({ divId, audioId, src }) => (
            <div id={divId} key={divId} className='drum-pad rounded-3'>
               {audioId}
               <audio id={audioId} className='clip' src={src}></audio>
            </div>
         ))}
      </div>
   )
}

createRoot(document.getElementById('drum-machine'))
   .render(<DrumMachine padKeys={padKeys} />)
