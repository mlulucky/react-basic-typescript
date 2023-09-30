import { useState } from "react";

const DiaryEditor = () => {
	// state 를 이용하는 방법이 동일하다 => 하나의 state 로 묶을 수 있다. => 객체로 전달
	const [state, setState] = useState({
		author: "", 
		content: ""
	});

	return (
		<div className="DiaryEditor">
			<h2>오늘의 일기</h2>
			{/* 작성자 입력 */}
			<div>
				<input name="author" value={state.author} onChange={ // e.target : 이벤트가 발생한 태그
					(e)=> { // onChange 의 event 객체를 매개변수로 받는다.
						console.log(e.target.value);
						setState({ // state 객체 값 변경 // 객체의 값을 변경하려면 새로운 객체의 값을 전달해야함 // 🍒 setState(새로운 객체)
							...state, // 기존 state 값(state.author, state.content)을 전달
							author: e.target.value, // 새로 입력한 값으로 업데이트 // => 업데이트할 값을 나중에 적는다.(값 업데이트)
							// content: state.content // 기존 state 값을 전달
						})
					}
				}/>
			</div>
			
			{/* 일기본문 */}
			<div>
				<textarea name="content" value={state.content} onChange={
					(e) => {
						console.log(e.target.value);
						setState({
							...state,
							// author: state.author,
							content: e.target.value
						})
					}
				}/>
			</div>

			{/* 감정점수 */}



			{/* 저장하기 버튼 */}
		</div>
	)
}

export default DiaryEditor;