import React from "react";
import Message from "./message";
function App(){
    return (
        <div className="app">
            <div>test</div>
            <input type="text" name="name" placeholder="input"/>
            <Message/>
        </div>
    )
}

export default App;