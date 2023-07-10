import { useEffect, useRef, useState } from "react"

function Calculator(){

    const [display, setDisplay] = useState("0")
    const [query, setQuery] = useState([])
    
    useEffect(() => {query.current = []}, [])
    // useEffect(() => console.log({display}), [display])

    const clear = () => {setDisplay("0"); setQuery([])}

    const isOperator = char => {
        const  regex = /^[+-/*]+$/gi
        return regex.test(char)
    }

    const addNumber = number => {
        if(number.toString() === "0" && display.toString() === "0"){return}
        if(isOperator(display)) setQuery(prev => [...prev, display])
        setDisplay(prev => prev.toString() !== "0" && !isOperator(display) ? `${prev}${number}`: number.toString())
    }

    const addOperator = operator => {

        if(operator === "-" && isOperator(display)){
            return setDisplay(prev => `${prev}${operator}`)
        }

        if(isOperator(display)){
            setDisplay(operator)
        }else{
            setQuery(prev => [...prev, display])
            setDisplay(operator)
        }
    }

    const addDecimal = () => {
        if(
            isOperator(display) ||
            display.split("").includes(".")
        ) {return}

        setDisplay(prev => `${prev}.`)

    }

    const equals = () => {
        const result = eval(isOperator(display) ? query.join(" ") : [...query, display].join(" "))
        setDisplay(result)
        setQuery([])
    }

    return <section
        className="bg-stone-800 fixed flex items-center p-6 flex-col gap-4"
        style={{
            width : "400px",
            top : "50%",
            left : "50%",
            minHeight : "400px",
            transform : "translate(-50%, -50%)"
        }}
    >
        <div className="flex flex-col bg-stone-900 border-2 border-orange-600">
            <input 
                value={
                    query.join(" ")
                        .replaceAll("*", "x")
                }
                className="text-white p-4 bg-transparent w-full text-right text-2xl"
            />
            <input id="display"
                value={display === "*" ? "x" : display}
                className="text-white p-4 bg-transparent w-full text-right text-4xl"
            />
        </div>

        <div className="grid grid-cols-4 w-full gap-1">

            <button onClick={clear} id="clear" className="text-3xl hover:text-white hover:scale-105 border-red-600 hover:border-white border-2 bg-red-600 hover:bg-red-800 active:bg-red-900 py-5 col-span-2">AC</button>
            <button onClick={() => addOperator("/")} id="divide" className="text-3xl hover:text-white hover:scale-105 border-orange-500 hover:border-white border-2 bg-orange-500 hover:bg-orange-600 active:bg-orange-800 py-5">/</button>
            <button onClick={() => addOperator("*")} id="multiply" className="text-3xl hover:text-white hover:scale-105 border-orange-500 hover:border-white border-2 bg-orange-500 hover:bg-orange-600 active:bg-orange-800 py-5">x</button>
            <button onClick={() => addNumber(7)} id="seven" className="text-3xl hover:text-white hover:scale-105 border-orange-500 hover:border-white border-2 bg-orange-500 hover:bg-orange-600 active:bg-orange-800 py-5">7</button>
            <button onClick={() => addNumber(8)} id="eight" className="text-3xl hover:text-white hover:scale-105 border-orange-500 hover:border-white border-2 bg-orange-500 hover:bg-orange-600 active:bg-orange-800 py-5">8</button>
            <button onClick={() => addNumber(9)} id="nine" className="text-3xl hover:text-white hover:scale-105 border-orange-500 hover:border-white border-2 bg-orange-500 hover:bg-orange-600 active:bg-orange-800 py-5">9</button>
            <button onClick={() => addOperator("-")} id="subtract" className="text-3xl hover:text-white hover:scale-105 border-orange-500 hover:border-white border-2 bg-orange-500 hover:bg-orange-600 active:bg-orange-800 py-5">-</button>
            <button onClick={() => addNumber(4)} id="four" className="text-3xl hover:text-white hover:scale-105 border-orange-500 hover:border-white border-2 bg-orange-500 hover:bg-orange-600 active:bg-orange-800 py-5">4</button>
            <button onClick={() => addNumber(5)} id="five" className="text-3xl hover:text-white hover:scale-105 border-orange-500 hover:border-white border-2 bg-orange-500 hover:bg-orange-600 active:bg-orange-800 py-5">5</button>
            <button onClick={() => addNumber(6)} id="six" className="text-3xl hover:text-white hover:scale-105 border-orange-500 hover:border-white border-2 bg-orange-500 hover:bg-orange-600 active:bg-orange-800 py-5">6</button>
            <button onClick={() => addOperator("+")} id="add" className="text-3xl hover:text-white hover:scale-105 border-orange-500 hover:border-white border-2 bg-orange-500 hover:bg-orange-600 active:bg-orange-800 py-5">+</button>
            <button onClick={() => addNumber(1)} id="one" className="text-3xl hover:text-white hover:scale-105 border-orange-500 hover:border-white border-2 bg-orange-500 hover:bg-orange-600 active:bg-orange-800 py-5">1</button>
            <button onClick={() => addNumber(2)} id="two" className="text-3xl hover:text-white hover:scale-105 border-orange-500 hover:border-white border-2 bg-orange-500 hover:bg-orange-600 active:bg-orange-800 py-5">2</button>
            <button onClick={() => addNumber(3)} id="three" className="text-3xl hover:text-white hover:scale-105 border-orange-500 hover:border-white border-2 bg-orange-500 hover:bg-orange-600 active:bg-orange-800 py-5">3</button>
            <button onClick={equals} id="equals" className="text-3xl hover:text-white hover:scale-105 border-blue-600 hover:border-white border-2 bg-blue-600 hover:bg-blue-800 active:bg-blue-900 py-5 row-span-2">=</button>
            <button onClick={() => addNumber(0)} id="zero" className="text-3xl hover:text-white hover:scale-105 border-orange-500 hover:border-white border-2 bg-orange-500 hover:bg-orange-600 active:bg-orange-800 py-5 col-span-2">0</button>
            <button onClick={() => addDecimal()} id="decimal" className="text-3xl hover:text-white hover:scale-105 border-orange-500 hover:border-white border-2 bg-orange-500 hover:bg-orange-600 active:bg-orange-800 py-5">.</button>


        </div>
        
    </section>
}

export default Calculator