import { useEffect, useState } from "react";

const UnmountTest = () => {
	useEffect(()=>{
		return () => {
			console.log("컴포넌트가 화면에서 사라질때 실행")
		}	

	},[])

	return (
		<div>Unmounting 컴포넌트가 화면에서 사라질때</div>
	)
}

const LifeCycle = () => {
	const [count, setCount] = useState(0);
	const [text, setText] = useState("");
	const [show, setShow] = useState(false);

	const handleShow = () => {
		setShow(!show);
	}

	useEffect(()=>{
		console.log("mount _ 최초1번실행");
	},[])
	
	useEffect(()=>{
		console.log("최초실행 + 리렌더링마다 실행");
	})
	
	useEffect(()=>{
		console.log("최초실행 + count 상태변경마다 실행");
	},[count])

	const style = {
		padding: "20px",
	}

	console.log(text);
	return (
		<div>
			<div style={style}>
				<button onClick={handleShow}>ON/OFF</button>
				<div>
					{show && <UnmountTest />}
				</div>
			</div>
			<div>
				{count}
				<button onClick={() => setCount(count+1)}>+</button>
			</div>
			<input onChange={(e) => setText(e.target.value)}/>
		</div>
	)
}

export default LifeCycle;