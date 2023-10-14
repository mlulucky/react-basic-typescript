import { useState } from "react";
import OddEvenResult from "./OddEvenResult";

type Props = {
	a : number;
	b : string;
	c: string;
	initialValue : number;
}

const Counter = ({initialValue} : Props) => { // 구조분해 할당 (원하는 값만 받기)
// const Counter = (props : Props) => { // props 객체 전체 받기
	console.log("initialValue",initialValue);
	// console.log(props) // props 는 객체안 값이 담겨서 전달된다. {prop1: 값, prop2: 값}
	// console.log(props.initialValue);
	// 상태 사용하는 법 : useState()
	const [count, setCount] = useState(0);

	const increaseCount = () => {
		setCount(count + 1);
	}

	const decreaseCount = () => {
		setCount(count -1);
	}

	return (
		<div>
			<h2>{count}</h2>
			<button onClick={increaseCount}>+</button>
			<button onClick={decreaseCount}>-</button>
			<OddEvenResult count={count}/>
		</div>
	)
}

export default Counter;