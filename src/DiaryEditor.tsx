import { FormEvent, useState } from "react";

const DiaryEditor = () => {
	// state 를 이용하는 방법이 동일하다 => 하나의 state 로 묶을 수 있다. => 객체로 전달
	const [state, setState] = useState({
		author: "", 
		content: "",
		emotion: 1,
	});

	// 같은 기능의 함수 => 하나의 함수로 묶을 수 있다.
	// 🍒 상태변환 함수 => 이벤트 핸들러 함수로 하나로 합칠 수 있다.
	const changeHandler = (e : React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>): void => {
		console.log("e.target.name",e.target.name);
		console.log("e.target.value",e.target.value);
		setState({
			...state,
			[e.target.name]: e.target.value // 객체 속성 이름을 동적으로 설정 => [객체속성이름] 대괄호로 감싸기
		})
		// 상태변경 함수 내에서는 아직 변경된 상태값이 state 에 반영이 안됨
	}
	function handleSubmit(): void {
		console.log(state);
		alert("일기저장 성공");
	}

	return (
		<div className="DiaryEditor">
			<h2>오늘의 일기</h2>
			{/* 작성자 입력 */}
			<div>
				<input name="author" value={state.author} onChange={changeHandler}/>
			</div>
			
			{/* 일기본문 */}
			<div>
				<textarea name="content" value={state.content} onChange={changeHandler}/>
			</div>

			{/* 감정점수 */}
			<div>
				오늘의 감정점수 : 
				<select name="emotion" value={state.emotion} onChange={changeHandler}>
					<option value={1}>1</option>
					<option value={2}>2</option>
					<option value={3}>3</option>
					<option value={4}>4</option>
					<option value={5}>5</option>
				</select>
			</div>

			{/* 저장하기 버튼 */}
			<div>
				<button onClick={handleSubmit}>일기 저장하기</button>
			</div>
		</div>
	)
}

export default DiaryEditor;