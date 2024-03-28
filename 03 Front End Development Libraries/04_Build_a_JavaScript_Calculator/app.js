'use strict'

import React, {
   useReducer,
   createContext,
   useContext
} from 'https://esm.sh/react?dev'
import { createRoot } from 'https://esm.sh/react-dom/client?dev'

const KeypadContext = createContext()

function reduceKeydown(state, action) {
   let { lastInput, formula } = state

   switch (action.type)
   {
      case 'number':

         lastInput = lastInput === '0' || /[+\-*/]/.test(lastInput)
            ? action.lastInput
            : lastInput + action.lastInput

         formula += action.lastInput

         return { lastInput, formula }

      case 'clear':

         return { lastInput: '0', formula: '' }

      case 'dot':

         lastInput = lastInput.includes('.') ? lastInput : lastInput + '.'

         if (formula === '' || /\d[+\-*/]$/.test(formula))
         {
            formula += '0.'
         }
         else if (!formula
            .split(formula.match(/[+\-*/=]/))
            .at(-1)
            .includes('.'))
         {
            formula += '.'
         }

         return { lastInput, formula }

      case 'minus':

         lastInput = '-'

         if (formula.includes('='))
         {
            formula = formula.split('=')[1] + '-'
         }
         else if (formula === '' || /\d[+\-*/]$|\d$/.test(formula))
         {
            formula += '-'
         }
         else
         {
            formula = formula.slice(0, formula.lastIndexOf(formula.at(-1))) + '-'
         }

         return { lastInput, formula }

      case 'plus':

         lastInput = '+'

         if (formula.includes('='))
         {
            formula = formula.split('=')[1] + '+'
         }
         else if (formula === '' || /\d[*/]$|\d$/.test(formula))
         {
            formula += '+'
         }
         else
         {
            const cutIndex = formula.lastIndexOf(
               formula.match(/[+*/]-$/)
               ?? formula.at(-1)
            )

            formula = formula.slice(0, cutIndex) + '+'
         }

         return { lastInput, formula }

      case 'per':

         lastInput = '/'

         if (formula.includes('='))
         {
            formula = formula.split('=')[1] + '/'
         }
         else if (/\d$/.test(formula))
         {
            formula += '/'
         }
         else
         {
            const cutIndex = formula.lastIndexOf(
               formula.match(/[+*/]-$/)
               ?? formula.at(-1)
            )

            formula = formula.slice(0, cutIndex) + '/'
         }

         return { lastInput, formula }

      case 'times':

         lastInput = '*'

         if (formula.includes('='))
         {
            formula = formula.split('=')[1] + '*'
         }
         else if (/\d$/.test(formula))
         {
            formula += '*'
         }
         else
         {
            const cutIndex = formula.lastIndexOf(
               formula.match(/[+*/]-$/)
               ?? formula.at(-1)
            )

            formula = formula.slice(0, cutIndex) + '*'
         }

         return { lastInput, formula }

      case 'equal':

         if (formula.includes('='))
         {
            const prevResult = formula.split('=')[1]

            formula = prevResult + '=' + prevResult
         }
         else if (Number.isNaN(Number(formula)))
         {
            const trailingSigns = formula.match(/[+\-*/]+$/)

            const cutIndex = trailingSigns
               ? formula.lastIndexOf(trailingSigns)
               : formula.length

            formula = formula.slice(0, cutIndex)
            formula = formula + '=' + Function(`return ${formula}`)()
         }
         else
         {
            formula + '=' + formula
         }

         lastInput = formula.split('=').at(-1) || '0'

         return { lastInput, formula }
   }
}

function Keypad() {
   const ids = ['nine', 'eight', 'seven', 'six', 'five', 'four', 'three', 'two', 'one', 'zero']
   const dispatch = useContext(KeypadContext)

   return (
      <>
         <div id='clear' className='key sp' onClick={() => dispatch({ type: 'clear' })}>
            Clear
         </div>
         <div id='divide' className='key op' onClick={() => dispatch({ type: 'per' })}>
            /
         </div>
         <div id='multiply' className='key op' onClick={() => dispatch({ type: 'times' })}>
            *
         </div>
         <div id='subtract' className='key op' onClick={() => dispatch({ type: 'minus' })}>
            -
         </div>
         <div id='add' className='key op' onClick={() => dispatch({ type: 'plus' })}>
            +
         </div>
         <div id='equals' className='key sp' onClick={() => dispatch({ type: 'equal' })}>
            =
         </div>
         <div id='decimal' className='key sp' onClick={() => dispatch({ type: 'dot' })}>
            .
         </div>
         {[9, 8, 7, 6, 5, 4, 3, 2, 1, 0].map((n, i) =>
            <div id={ids[i]} key={n} className='key num' onClick={() => dispatch({ type: 'number', lastInput: String(n) })}>
               {n}
            </div>
         )}
      </>
   )
}

function Calculator({ children }) {
   const [state, dispatch] = useReducer(reduceKeydown, { formula: '', lastInput: '0' })

   return (
      <div id='calculator'>
         <div id='formula'>{state.formula}</div>
         <div id='display'>{state.lastInput}</div>
         <KeypadContext.Provider value={dispatch}>
            {children}
         </KeypadContext.Provider>
      </div >
   )
}

createRoot(document.getElementById('root')).render(
   <Calculator>
      <Keypad />
   </Calculator>
)
