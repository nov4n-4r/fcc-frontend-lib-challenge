import { Fragment, useEffect, useMemo, useRef, useState } from "react"

function useTimer(workTimeInMinutes, breakTimeInMinutes){

    const initialWorkPeriod = 25 * 60
    const initialRestPeriod = 5 * 60

    const [rest, setRest] = useState(false)
    const [time, setTime] = useState(initialWorkPeriod)
    
    const [timer, setTimer] = useState(false)
    const running = useMemo(() => Boolean(timer), [timer])

    // const [workPeriod, setWorkPeriod] = useState(initialWorkPeriod)
    // const [restPeriod, setRestPeriod] = useState(5 * 60)

    function startTimer(){
        if(!Boolean(timer)) return setTimer(
            setInterval(() => {
                setTime(prev => {

                    if(prev === 0){
                        setRest(prev => !prev)
                        return 0
                    }

                    if(prev - 1 >= 0){
                        return prev - 1
                    }else{
                        return 0
                    }
                })
            }, 1000)
        )
    }

    function resetTimer(){
        stopTimer()
        setRest(false)
        // setRestPeriod(initialRestPeriod)
        // setWorkPeriod(initialWorkPeriod)
        setTime(initialWorkPeriod)
    }

    function stopTimer(){
        if(Boolean(timer)){
            clearInterval(timer)
            setTimer(false)
        }
    }

    useEffect(() => setTime(rest ? breakTimeInMinutes * 60 : workTimeInMinutes * 60), [rest])
    useEffect(() => setTime(prev => rest ? breakTimeInMinutes * 60 : prev), [breakTimeInMinutes])
    useEffect(() => setTime(prev => !rest ? workTimeInMinutes * 60 : prev), [workTimeInMinutes])

    // useEffect(() => setWorkPeriod(prev => {
    //     return (0 <= workTimeInMinutes <= 60) ? workTimeInMinutes * 60 : prev
    // }), [workTimeInMinutes])

    // useEffect(() => setRestPeriod(prev => {
    //     return (0 <= breakTimeInMinutes <= 60) ? breakTimeInMinutes * 60: prev
    // }), [breakTimeInMinutes])

    return {rest, time, startTimer, stopTimer, resetTimer, running}

}

function Pomodoro(){

    // represent as minutes
    const [sessionPeriod, setSessionPeriod] = useState(25)
    const [breakPeriod, setBreakPeriod] = useState(5)

    const  audioRef = useRef()

    const addSessionPeriod = () => setSessionPeriod(prev => 60 >= prev + 1 ? prev + 1 : prev)
    const addBreakPeriod = () => setBreakPeriod(prev => 60 >= prev + 1 ? prev + 1 : prev)
    const minSessionPeriod = () => setSessionPeriod(prev => prev - 1 >= 1 ? prev - 1 : prev)
    const minBreakPeriod = () => setBreakPeriod(prev => prev - 1 >= 1 ? prev - 1 : prev)

    const {rest, time, startTimer, stopTimer, resetTimer, running} = useTimer(sessionPeriod, breakPeriod)
    
    const formatTime = secon => {
        const fMinute = Math.floor(secon/60) >= 10 ? Math.floor(secon/60) : `0${Math.floor(secon/60)}`
        const fSecon = secon % 60 >= 10 ? secon % 60 : `0${secon % 60}`
        return `${fMinute}:${fSecon}`
    }

    const reset = () => {
        resetTimer()
        setSessionPeriod(25)
        setBreakPeriod(5)
        stopAudio()
    }

    const stopAudio = () => audioRef.current.pause()

    const playAudio = () => {
        audioRef.current.currentTime = 0
        audioRef.current.play()
        setTimeout(stopAudio, 3000)
    }

    useEffect(() => {
        if(time === 0) playAudio()
        console.log(!audioRef.current.paused)
    }, [time])


    return <section
        className="bg-stone-800 fixed flex items-center p-6 justify-center flex-col gap-4"
        style={{
            width : "800px",
            top : "50%",
            left : "50%",
            minHeight : "400px",
            transform : "translate(-50%, -50%)"
        }}
    >

            <div className="flex gap-40">
                
                <div className="flex flex-col items-center">
                    <p id="session-label" className="text-white text-2xl">Session Length</p>
                    <div className="flex gap-2 items-center">
                        <button id="session-increment" disabled={running} className="p-2 bg-green-500" onClick={addSessionPeriod}>+</button>
                        <p id="session-length" className="text-white text-2xl" >{sessionPeriod}</p>
                        <button id="session-decrement" disabled={running} className="p-2 bg-green-500" onClick={minSessionPeriod}>-</button>
                    </div>
                </div>

                <div className="flex flex-col items-center">
                    <p id="break-label" className="text-white text-2xl">Break Length</p>
                    <div className="flex gap-2 items-center">
                        <button id="break-increment" disabled={running} className="p-2 bg-green-500" onClick={addBreakPeriod}>+</button>
                        <p id="break-length" className="text-white text-2xl">{breakPeriod}</p>
                        <button id="break-decrement" disabled={running} className="p-2 bg-green-500" onClick={minBreakPeriod}>-</button>
                    </div>
                </div>

            </div>
            <h4 id="timer-label" className="text-5xl text-white">{rest ? "Break" : "Session"}</h4>
            <h4 id="time-left" className="text-8xl text-white">{formatTime(time)}</h4>
            <div className="flex gap-2">
                <button id="start_stop" className="p-4 bg-sky-400 text-white rounded" onClick={running ? stopTimer : startTimer}>{running ? "STOP" : "START"}</button>
                <button id="reset" className="p-4 bg-sky-400 text-white rounded" onClick={reset}>RESET</button>
            </div>

            <audio 
                ref={audioRef}
                src="/beep-06.mp3"
                id="beep"
                loop={true}
            />

    </section>
}

export default Pomodoro