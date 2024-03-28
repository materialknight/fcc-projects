'use strict'

//* The commented out code works but is incompatible with the test suite.

// import React, {
//    useReducer,
//    createContext,
//    useContext,
//    useRef,
//    useEffect
// } from 'https://esm.sh/react?dev'
// import { createRoot } from 'https://esm.sh/react-dom/client?dev'

const { useReducer, createContext, useContext, useRef, useEffect } = React

const GlobalContext = createContext()

function reducer(state, action) {
   let newState = null

   switch (action.type)
   {
      case 'decrement_break':
         newState = { ...state, break: new Date(state.break) }
         newState.break.setMinutes(newState.break.getMinutes() - 1)

         if (state.currentSegment === 'break')
         {
            newState.time = new Date(newState.break)
         }

         return newState

      case 'increment_break':
         newState = { ...state, break: new Date(state.break) }
         newState.break.setMinutes(newState.break.getMinutes() + 1)

         if (state.currentSegment === 'break')
         {
            newState.time = new Date(newState.break)
         }

         return newState

      case 'decrement_session':
         newState = { ...state, session: new Date(state.session) }
         newState.session.setMinutes(newState.session.getMinutes() - 1)

         if (state.currentSegment === 'session')
         {
            newState.time = new Date(newState.session)
         }

         return newState

      case 'increment_session':
         newState = { ...state, session: new Date(state.session) }
         newState.session.setMinutes(newState.session.getMinutes() + 1)

         if (state.currentSegment === 'session')
         {
            newState.time = new Date(newState.session)

            if (newState.time.getMinutes() === 0)
            {
               action.min60Ref.current = true
            }
         }

         return newState

      case 'run_stop_timer':

         return { ...state, timerIsRunning: !state.timerIsRunning }

      case 'count_down':
         if (state.time.getMinutes() === 0 && state.time.getSeconds() === 0)
         // if (state.time.toTimeString().slice(3, 8) === '00:00')
         {
            return {
               ...state,
               currentSegment: state.currentSegment === 'break'
                  ? 'session'
                  : 'break',
               time: new Date(
                  state.currentSegment === 'break'
                     ? state.session
                     : state.break
               )
            }
         }

         newState = { ...state, time: new Date(state.time) }
         newState.time.setSeconds(newState.time.getSeconds() - 1)

         if (newState.time.getMinutes() === 0 && newState.time.getSeconds() === 0)
         {
            action.audioRef.current.play()
         }

         return newState

      case 'reset_timer':
         action.audioRef.current.pause()
         action.audioRef.current.currentTime = 0

         return {
            break: new Date('2023-11-26T02:05:00'),
            session: new Date('2023-11-26T02:25:00'),
            currentSegment: 'session',
            time: new Date('2023-11-26T02:25:00'),
            timerIsRunning: false
         }
   }
}

function Clock({ children }) {
   const [state, dispatch] = useReducer(reducer, {
      break: new Date('2023-11-26T02:05:00'),
      session: new Date('2023-11-26T02:25:00'),
      currentSegment: 'session',
      time: new Date('2023-11-26T02:25:00'),
      timerIsRunning: false
   })

   const min60Ref = useRef(false)

   return (
      <GlobalContext.Provider value={{ state, dispatch, min60Ref }}>
         {children}
      </GlobalContext.Provider>
   )
}

function Timer() {
   const { state, dispatch, min60Ref } = useContext(GlobalContext)
   let time = state.time.toTimeString().slice(3, 8)

   if (min60Ref.current)
   {
      time = '60:00'
   }

   const audioRef = useRef(null)

   useEffect(() => {
      let timeout = null

      if (state.timerIsRunning)
      {
         timeout = setInterval(
            () => dispatch({ type: 'count_down', audioRef }),
            1000
         )
      }
      return () => clearInterval(timeout)
   }, [state.timerIsRunning])

   return (
      <section id='timer' class={
         state.currentSegment === 'break' ? 'running-break' : 'running-session'
      }>
         <h2 id='timer-label'>{state.currentSegment}</h2>
         <div id='time-left'>
            {time}
         </div>
         <audio
            src='https://upload.wikimedia.org/wikipedia/commons/4/42/Beep_alarm_clock.ogg'
            id='beep'
            ref={audioRef}
         >
         </audio>
         <button
            id='start_stop'
            onClick={() => {
               min60Ref.current = false
               dispatch({ type: 'run_stop_timer' })
            }}
         >
            <span className="material-symbols-outlined">play_arrow</span>
            <span className="material-symbols-outlined">pause</span>
         </button>
         <button
            id='reset'
            onClick={() => dispatch({ type: 'reset_timer', audioRef })}
         >
            <span className="material-symbols-outlined">refresh</span>
         </button>
      </section>
   )
}

function MinsControl({ segment }) {
   const { state, dispatch, min60Ref } = useContext(GlobalContext)

   let segmentMins = segment === 'break'
      ? state.break.getMinutes()
      : state.session.getMinutes()

   if (segmentMins === 0)
   {
      segmentMins = 60
   }

   return (
      <section id={segment}>
         <h2 id={`${segment}-label`}>{segment} Length</h2>
         <div id={`${segment}-length`}>{segmentMins}</div>
         <button
            type='button'
            id={`${segment}-decrement`}
            onClick={() => {
               if (!state.timerIsRunning && segmentMins > 1)
               {
                  min60Ref.current = false
                  dispatch({ type: `decrement_${segment}` })
               }
            }}
         >
            <span className="material-symbols-outlined">arrow_downward</span>
         </button>
         <button
            type='button'
            id={`${segment}-increment`}
            onClick={() => {
               if (!state.timerIsRunning && segmentMins < 60)
               {
                  dispatch({ type: `increment_${segment}`, min60Ref })
               }
            }}
         >
            <span className="material-symbols-outlined">arrow_upward</span>
         </button>
      </section>
   )
}

// createRoot(document.getElementById('root')).render(
//    <Clock>
//       <MinsControl segment='break' />
//       <MinsControl segment='session' />
//       <Timer />
//    </Clock>
// )

ReactDOM.render(
   <Clock>
      <MinsControl segment='break' />
      <MinsControl segment='session' />
      <Timer />
   </Clock>,
   document.getElementById('root')
)
