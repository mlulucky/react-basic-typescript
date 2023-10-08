import React from "react";
import { useState } from "react";

const CountView = React.memo(({propCount} : {propCount: number}) => {
	console.log("count 컴포넌트 렌더링");

	return <div>{propCount}</div>
})

const TextView = React.memo(({propText} : {propText: string}) => {
	console.log("text 컴포넌트 렌더링");

	return (
		<div>
			{propText}
		</div>
	)
})

// 부모컴포넌트 OptimizeTest 의 상태 count, text 가 변동되면서 
// 자식컴포넌트 CountView, TextView 도 렌더링이 되는데..
// TextView 는 count 상태와는 관련이 없기 때문에 count 상태가 업데이트되어도 리렌더링 될 필요가 없다
// => 이를 해결하기위해, 컴포넌트의 props 데이터가 변하지 않으면 리렌더링 하지 않게 하기
// React.memo(컴포넌트)로 컴포넌트를 감싼다!

const OptimizeTest = () => {
	// 원시타입(기본형 타입) 상태
	const [count, setCount] = useState(1);
	const [text, setText] = useState("");

	return (
		<div style={{padding: 50}}>
			<h2>count</h2>
			<CountView propCount={count}/>
			<button onClick={(e)=>{setCount(count+1)}}>+</button>
			<h2>text</h2>
			<TextView	propText={text}/>
			<input onChange={(e)=>{setText(e.target.value)}}></input>
		</div>
	)
}

export default OptimizeTest;