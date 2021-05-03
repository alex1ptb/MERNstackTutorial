import React, {useState, useEffect} from  "react";
import ReactDOM from "react-dom";

function App(){
	const [ message, setMessage ] = useState("Hello World");
	useEffect(()=>{
		setTimeout(() =>{
			setMessage(Math.random().toString()) 
			console.log(message);
		},2000)
	},[]);

	return (
	<>
		<h1><WelcomeMessage user="John Doe" message={message}/></h1>
		<h1><WelcomeMessage user="Jane Doe" message={message}/></h1>
		<h1><WelcomeMessage user="Johnny Doe" message={message}/></h1>
	</>
	);
}

function WelcomeMessage(props) {
	return (
		<>
			<h1>Welcome to this site, {props.user}</h1>
			<p>{props.message}</p>
		</>
	)
}

ReactDOM.render(<App />,document.getElementById("root")	)
