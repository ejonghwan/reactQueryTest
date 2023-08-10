import { useState } from "react";



export function useInput(intialValue, cb) {
    const [val, setVal] = useState(intialValue)

    const handleChange = e => {
        setVal(e.target.value)
    }

    const handleSubmit = e => {
        cb()
        setVal(intialValue)
    }

    return [val, handleChange, handleSubmit]
}