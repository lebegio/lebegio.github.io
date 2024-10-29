import { useState } from 'react'
import './App.css'
import { TonConnectButton } from '@tonconnect/ui-react';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <TonConnectButton />
      </div>
      <h1>Voting</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </>
  )
}



export default App
