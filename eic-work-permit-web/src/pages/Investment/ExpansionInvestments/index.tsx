import React, { useState } from "react"
import MainPage from "./main"
import IntroPage from "./IntroPage/"

export default () => {
  const [hasBegan, setHasBegan] = useState(false)


  return (
    <>
      <div style={{ display: hasBegan? "none" : "flex" }}>
        <IntroPage closePage={() => setHasBegan(true)} />
      </div>
      <div style={{ display: hasBegan? "flex" : "none" }}>
        <MainPage />
      </div>
    </>
  )
}