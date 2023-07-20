import React,{useEffect, useState} from 'react'
import axios from "axios"

function TestPage() {
    const [str, setStr] = useState("")
    useEffect(() => {
    axios.get("/api/ping").then((response) => {
      setStr(response.data)
    })
  }, [])
  return (
    <div>{str}</div>
  )
}

export default TestPage