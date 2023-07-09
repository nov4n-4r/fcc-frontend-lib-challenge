import { Fragment, useEffect, useRef, useState } from "react"
import {quotes} from "../assets/json/quotes.json"

const generateQuote = () => quotes[ Math.floor( Math.random() * quotes.length ) ]

const generateBackground = () => {

    const colors = [
        '#16a085',
        '#27ae60',
        '#2c3e50',
        '#f39c12',
        '#e74c3c',
        '#9b59b6',
        '#FB6964',
        '#342224',
        '#472E32',
        '#BDBB99',
        '#77B1A9',
        '#73A857'
      ];
      return colors[ Math.floor( Math.random() * colors.length ) ]  

}

function QuotesGenerator(){

    const [bgColor, setBgColor] = useState(generateBackground())
    const [containerBgColor, setContainerBgColor] = useState(generateBackground())
    const [activeQuote, setActiveQuote] = useState(generateQuote())

    function regenerateQuote(){
        setBgColor(generateBackground())
        setContainerBgColor(generateBackground())
        setActiveQuote(generateQuote)
    }

    return <div className=" w-screen h-screen"
        style={{backgroundColor : bgColor}}
    >
        <div
            className="fixed flex items-center p-6 justify-center flex-col gap-4"
            style={{
                backgroundColor : containerBgColor,
                width : "800px",
                top : "50%",
                left : "50%",
                minHeight : "400px",
                transform : "translate(-50%, -50%)"
            }}
            id="quote-box"
        >
            <p id="text">{`'${activeQuote.quote}'`}</p>
            <div className="flex items-center justify-between w-8/12">
                <div className="flex items-center gap-2">
                    <a id="tweet-quote" className="text-white" href={`https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text="${activeQuote.quote}" ${activeQuote.author}`}>Tweet</a>
                </div>
                {/* https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=%22If%20you%20want%20your%20children%20to%20turn%20out%20well%2C%20spend%20twice%20as%20much%20time%20with%20them%2C%20and%20half%20as%20much%20money.%22%20Abigail%20Van%20Buren */}
                <p id="author">{"~" + activeQuote.author}</p>

            </div>
            <button id="new-quote" className="p-2 bg-sky-600 rounded text-white" onClick={regenerateQuote}>Generate Quote</button>
        </div>
    </div>
}   

export default QuotesGenerator