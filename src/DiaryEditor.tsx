import { useRef, useState } from "react";

const DiaryEditor = () => {
	// state 를 이용하는 방법이 동일하다 => 하나의 state 로 묶을 수 있다. => 객체로 전달
	const [state, setState] = useState({
		author: "", 
		content: "",
		emotion: 1,
	});

	// useRef : DOM 객체 참조 => DOM 객제 첩근가능
	const authorInput = useRef<HTMLInputElement | null>(null); // 주로 useRef DOM 참조시, 초기값 null 로 설정 후 실제 DOM 참조
	// const authorInput = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null); // 🔥 문제코드 : ref 는 DOM 을 참조하므로, 제네릭 타입의 DOM 은 서로 호환 가능한 타입이어야 한다. 즉 HTMLInputElement | HTMLTextAreaElement 이렇게 서로 다른 타입을 유니온타입(합집합)으로 사용할 수 없다.
	const contentInput = useRef<HTMLTextAreaElement | null>(null);
	// null : 아직 DOM 에 연결되지 않았음을 의미, 컴포넌트가 아직 생성되지 않았을 수도 있으므로. 초기값을 null 로 설정  
	// const 변수명 = useRef();
	// 변수명.current == DOM 참조

	// 같은 기능의 함수 => 하나의 함수로 묶을 수 있다.
	// 🍒 상태변환 함수 => 이벤트 핸들러 함수로 하나로 합칠 수 있다.
	const changeHandler = (e : React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>): void => {
		setState({
			...state,
			[e.target.name]: e.target.value // 객체 속성 이름을 동적으로 설정 => [객체속성이름] 대괄호로 감싸기
		})
		// 상태변경 함수 내에서는 아직 변경된 상태값이 state 에 반영이 안됨
	}
	function handleSubmit(): void {
		if(state.author.length < 1 ) {
			alert("작성자는 최소 1글자 이상 입력하세요.");
			if(authorInput.current !== null) {
				authorInput.current.focus();
			}
			return; // 함수 종료
		}
		if(state.content.length < 5) {
			alert("일기 본문은 5글자 이상 입력하세요.");
			if(contentInput.current !== null) {
				contentInput.current.focus();
			}
			return;
		}
		console.log(state);
		alert("일기저장 성공");
	}

	return (
		<div className="DiaryEditor">
			<h2>오늘의 일기</h2>
			{/* 작성자 입력 */}
			<div>
				<input ref={authorInput} name="author" value={state.author} onChange={changeHandler}/>
			</div>
			
			{/* 일기본문 */}
			<div>
				<textarea ref={contentInput} name="content" value={state.content} onChange={changeHandler}/>
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