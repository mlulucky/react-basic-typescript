import { useRef, useState } from "react";
import "./App.css";
import DiaryEditor from "./DiaryEditor";
import DiaryList, { ListProps } from "./DiaryList";

// const diaryDummyList = [
// 	{
// 		id: 1,
// 		author: "문은정",
// 		content: "오늘의 일기",
// 		emotion: 4,
// 		create_date: new Date().getTime(), // 시간객체 _ new Date() : 현재시간
// 	},
// 	{
// 		id: 2,
// 		author: "은정",
// 		content: "오늘의 일기2",
// 		emotion: 5,
// 		create_date: new Date().getTime(),
// 	},
// 	{
// 		id: 3,
// 		author: "mlulucky",
// 		content: "오늘의 일기3",
// 		emotion: 3,
// 		create_date: new Date().getTime(),
// 	},
// ];
// new Date.getTime() : Date 객체를 숫자 밀리세컨즈로 반환


function App() { 
	const [data, setData] = useState<ListProps[]>([]); // 일기 [item1, item2...]
	const Id = useRef(0); // useRef(): 데이터가 변해도 리렌더링 X
	
	// 아이템 등록 함수
	const createDiary = ({author, content, emotion} : Omit<ListProps, "id"| "create_date">) => {
		const create_date = new Date().getTime();
		const newData = {
			id: Id.current,
			author,
			content, 
			emotion,
			create_date
		}
		Id.current += 1; // 1씩 증가
		setData([newData, ...data]) // 배열의 순서 [최신글, 기존글] : 최신글을 첫번째 인덱스로
	}

	// 아이템 삭제 함수
	const deleteDiary = (targetId: number) => {
		console.log("targetId", targetId); // DiaryItem 에서 함수 호출시, targertId 가 전달되는지 체크
		const newDiaryList = data.filter(item => item.id !== targetId);
		setData(newDiaryList);
	}

  return (
    <div className="App">
      <DiaryEditor onCreate={createDiary}/>
      <DiaryList onDelete={deleteDiary} dummyData={data} />
    </div>
  );
}

export default App;
