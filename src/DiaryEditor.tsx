import React, { useContext, useEffect } from "react";
import { useRef, useState } from "react";
import { DiaryDispatchContext } from "./App";
import { ListProps } from "./DiaryList";

// 함수 내에서 diary 라는 이름으로 ListProps 타입 객체를 사용할 수 있다. (React 컴포넌트에서 props 전달시, 해당 변수의 이름과 타입만 중요, 함수 내부의 변수이름은 무관하다.)
// 🍒 App 컴포넌트가 리렌더링 될때 DiaryEditor 에서 props 로 받은 onCreate 함수도 다시 생성이 된다.
// => props 데이터가 변경 되면 컴포넌트도 리렌더링된다. 즉 DiaryEditor 컴포넌트가 재렌더링이된다.
// => 최적화 하기위해서 onCreate 함수를 재생성하지 않도록 하기!
// => App 컴포넌트에서 onCreate 함수에 useCallback 최적화하기!
const DiaryEditor = () => {
	const {createDiary} = useContext(DiaryDispatchContext);

	useEffect(()=>{ // 렌더링 체크
		console.log("DiaryEditor 렌더링");
	},[]);

	// state 를 이용하는 방법이 동일하다 => 하나의 state 로 묶을 수 있다. => 객체로 전달
	const [state, setState] = useState({
		author: "", 
		content: "",
		emotion: 1,
	});

	// useRef : DOM 객체 참조 => DOM 객제 첩근가능
	const authorInput = useRef<HTMLInputElement | null>(null); // null : 아직 DOM 에 연결되지 않았음을 의미, 컴포넌트가 아직 생성되지 않았을 수도 있으므로. 초기값을 null 로 설정 
  const contentInput = useRef<HTMLTextAreaElement | null>(null);

	// 같은 기능의 함수 => 하나의 함수로 묶을 수 있다.
	// 🍒 상태변환 함수 => 이벤트 핸들러 함수로 하나로 합칠 수 있다.
	const changeHandler = (e : React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>): void => {
		setState({
			...state,
			[e.target.name]: e.target.value // 객체 속성 이름을 동적으로 설정 => [객체속성이름] 대괄호로 감싸기
		})
		// 상태변경 함수 내에서는 아직 변경된 상태값이 state 에 반영이 안됨
	}
	
	// 일기등록 함수
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

		// 입력한 author, content, emotion 을 등록
		createDiary({ author: state.author, content: state.content, emotion: state.emotion });
		setState({ // 등록 후, 입력값 초기화
			author: "",
			content: "",
			emotion: 1
		})
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

export default React.memo(DiaryEditor);