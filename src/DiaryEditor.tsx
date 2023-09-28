import { useState } from "react";

const DiaryEditor = () => {
	// state 를 이용하는 방법이 동일하다 => 하나의 state 로 묶을 수 있다.
	const [author, setAuthor] = useState("");
	const [content, setContent] = useState("");

	return (
		<div className="DiaryEditor">
			<h2>오늘의 일기</h2>
			{/* 작성자 입력 */}
			<div>
				<input name="author" value={author} onChange={ // e.target : 이벤트가 발생한 태그
					(e)=> { // onChange 의 event 객체를 매개변수로 받는다.
						console.log(e.target.value);
						setAuthor(e.target.value);
					}
				}/>
			</div>
			
			{/* 일기본문 */}
			<div>
				<textarea name="content" value={content} onChange={
					(e) => {
						console.log(e.target.value);
						setContent(e.target.value);
					}
				}/>
			</div>

			{/* 감정점수 */}



			{/* 저장하기 버튼 */}
		</div>
	)
}

export default DiaryEditor;