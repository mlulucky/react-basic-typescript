import React from "react";
import { useState } from "react";

const CounterA = React.memo(({countProp}:{countProp: number}) => { // {객체변수이름} : {객체} //(객체 구조분해 할당)
	console.log("CounterA 컴포넌트 리렌더링");
	return <div>{countProp}</div>
})

const CounterB = ({count} : {count: number})=> {
	console.log("CounterB 컴포넌트 리렌더링");
	return <div>{count}</div>
}

type PropType = {
	count : number;
}

function areEqual(prevProps : PropType, nextProps: PropType) {
	return prevProps.count === nextProps.count;
}

const MemoizedCounterB = React.memo(CounterB, areEqual);
// React.memo(최적화 하려는 컴포넌트, areEqual)
// React.memo 가 컴포넌트의 리렌더링이 필요한지 판단할때, areEqual 함수를 호출하여 매개변수 prevProps, nextProps 를 제공
// areEqual 함수는 prevProps 와 nextProps 의 값이 동일한지 판단. 동일하면 true, 아니면 false 를 반환


const OptimizeTest = () => {
	// 참조타입(객체 타입) 상태
	const [count, setCount] = useState(1);
	const [obj, setObj] = useState({count: 1});

	// setCount() 로 count 원시값 1을 다시 대입하는 경우 => 동일한 값으로 변경을 하는 것은 동일한 상태로 보기 때문에 리렌더링 되지 않는다.
	// setObj() 로 {count: 1} 객체를 다시 대입하는 경우

	// 👀 이러한 이유는 자바스크립트는 객체를 비교할때, 객체의 주소를 비교한다! (얕은비교)
	// 주소가 동일하면 상태를 동일하게 보고 리렌더링x
	// 주소가 다르면 상태를 다르게 보고 리렌더링

	// 👀 객체가 같더라도, 값이 다른지를 비교하는 방법 (깊은비교)
	// areEqual(prevProps, nextProps) 함수
	// prevProps 와 nextProps 가 동일한 값을 가지면 true, 아닌 경우 false 반환
	
	// 여기서 B button_ 객체를 새로 대입 을 클릭했을때는 원래 객체를 새로 할당한 것으로
	// 상태가 변한것으로 판단 -> 컴포넌트가 리렌더링 되어야하지만
	// React.memo areEqual 함수를 사용하여, 객체의 주소가 아닌. 값을 비교하여 렌더링하게끔 적용시켜서
	// 동일한 값인 경우에는 리렌더링 안되게 하였다. 
	// 만약 setObj({count: obj.count+1}) 하는 경우에는 렌더링되는 것을 확인할 수 있다.

	return (
		<div style={{padding: 50}}>
			<h2>Count A</h2>
			<CounterA countProp={count}/>
			<button onClick={(e)=>{setCount(count)}}>A button</button>
			<h2>Count B</h2>
			<MemoizedCounterB {...obj}/>
			<button onClick={(e)=>{setObj(obj)}}>B button _ 객체 그대로 대입</button> 
			{/* const obj = obj (객체가 그대로 참조되므로, 상태가 동일하다고 판단 -> 리렌더링x) */}
			<button onClick={(e)=>{setObj({count: obj.count})}}>B button _ 객체을 새로 대입</button>
			{/* const obj = {count: 1} (새로운 객체를 할당 하는 것으로, 상태가 변했다고 판단 -> 리렌더링) */}
		</div>
	)
}

export default OptimizeTest;