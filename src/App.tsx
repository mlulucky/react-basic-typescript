import { useRef, useState } from "react";
import "./App.css";
import DiaryEditor from "./DiaryEditor";
import DiaryList, { ListProps } from "./DiaryList";
import LifeCycle from "./LifeCycle";

function App() { 
	const [data, setData] = useState<ListProps[]>([]); // 일기 [item1, item2...]
	const Id = useRef(0); // useRef(): 데이터가 변해도 리렌더링 X
	
	// 일기 등록 함수
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

	// 일기 삭제 함수
	const deleteDiary = (targetId: number) => {
		console.log("targetId", targetId); // DiaryItem 에서 함수 호출시, targertId 가 전달되는지 체크
		const newDiaryList = data.filter(item => item.id !== targetId);
		setData(newDiaryList);
	}

	// 일기 수정 함수
	const modifyDiary = (targetId: number, newContent: string) => {
		const newDiary = data.map((ele, index)=> ele.id === targetId ? {...ele, content: newContent} : {...ele})
		setData(newDiary);
	}

  return (
    <div className="App">
			<LifeCycle />
      <DiaryEditor onCreate={createDiary}/>
      <DiaryList dummyData={data} onDelete={deleteDiary} onModify={modifyDiary}/>
    </div>
  );
}

export default App;
