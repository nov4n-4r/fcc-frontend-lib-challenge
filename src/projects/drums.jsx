import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { createContext } from "react";
import { useContext } from "react";

const soundBankOne = [{
  keyTrigger: 'Q',
  id: 'Heater-1',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
}, {
  keyTrigger: 'W',
  id: 'Heater-2',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
}, {
  keyTrigger: 'E',
  id: 'Heater-3',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
}, {
  keyTrigger: 'A',
  id: 'Heater-4',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
}, {
  keyTrigger: 'S',
  id: 'Clap',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
}, {
  keyTrigger: 'D',
  id: 'Open-HH',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
}, {
  keyTrigger: 'Z',
  id: "Kick-n'-Hat",
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
}, {
  keyTrigger: 'X',
  id: 'Kick',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
}, {
  keyTrigger: 'C',
  id: 'Closed-HH',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
},
];

const PageContext = createContext()

function DrumPad({keyTrigger, id, url}){
    const audio = useRef()
    const {power, volume, setDisplayedText} = useContext(PageContext)

    const play = () => {
      if(power){
        audio.current.currentTime = 0
        audio.current.play()
        setDisplayedText(id)
      }
    }

    useEffect(() => {
        audio.current.currentTime = 0
        audio.current.volume = volume/100
      addEventListener("keydown", e => {
        if(e.keyCode === keyTrigger.charCodeAt()){
          play()
        }
      })
    }, [volume])

    return <div onClick={play} id={id} className="drum-pad bg-sky-400 p-8 rounded w-32 h-32 hover:bg-sky-600 active:bg-sky-900">
      <p className="text-white text-5xl text-center">{keyTrigger}</p>
      <audio
        className="clip"
        id={keyTrigger}
        ref={audio}
        src={url}
      />
    </div>
    
}

function DrumsApp(props){

  const [power, setPower] = useState(true)
  const [volume, setVolume] = useState(50)
  const [displayedText, setDisplayedText] = useState("Hello world")

  return <PageContext.Provider value={{power, volume, setDisplayedText}}>
    <section 
      id="drum-machine"
      className="bg-stone-800 fixed flex items-center p-6"
      style={{
        width : "800px",
        top : "50%",
        left : "50%",
        minHeight : "400px",
        transform : "translate(-50%, -50%)"
      }}
    >
      
      <div className="grid grid-cols-3 grid-rows-3 w-full gap-6">
        
        {soundBankOne.map(
          (props, index) => <DrumPad {...props} key={index} volume={volume} />
        )}
        
      </div>

      <div className="flex flex-col items-center justify-center gap-10 w-full">

        <div className="flex bg-slate-800 h-20 w-40 items-center justify-center">
          <h5 id="display" className="text-white">{displayedText}</h5>
        </div>

        <label className="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" value={power} min={0} max={100} checked={power} onChange={e => setPower(e.target.checked)} className="sr-only peer" />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          <span className="ml-3 text-white">POWER</span>
        </label> 

        <div>
          <label htmlFor="large-range" className="block mb-2 text-white">VOLUME</label>
          <input id="large-range" type="range" value={volume} onChange={e => setVolume(e.target.value)} className="w-full h-3 bg-gray-200 rounded-lg DrumsAppearance-none cursor-pointer range-lg dark:bg-gray-700" />
        </div>

      </div>

    </section>
  </PageContext.Provider>
}

export default DrumsApp