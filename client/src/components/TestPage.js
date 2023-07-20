import React,{useEffect, useState} from 'react'
import axios from "axios"

export default function TestPage() {
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

export function TestGamepadConnect() {
  const [pad, setPad] = useState("disconnect")
  useEffect(() => {
    const handleGamepadConnected = (event) => {
      const gamepad = event.gamepad;
      console.log('Gamepad connected:', gamepad.id);
      // Jetson Nano로 데이터 전송 및 원하는 작업 수행
      setPad(gamepad.id)
    };

    const handleGamepadDisconnected = (event) => {
      const gamepad = event.gamepad;
      console.log('Gamepad disconnected:', gamepad.id);
      // 연결 해제시 처리 내용
      setPad("disconnect")
    };

    window.addEventListener('gamepadconnected', handleGamepadConnected);
    window.addEventListener('gamepaddisconnected', handleGamepadDisconnected);

    return () => {
      window.removeEventListener('gamepadconnected', handleGamepadConnected);
      window.removeEventListener('gamepaddisconnected', handleGamepadDisconnected);
    };
  }, [pad]);

  return <div>{pad}</div>;
}