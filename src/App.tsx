import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import "./App.css";
import DiaryEditor from "./DiaryEditor";
import DiaryList, { ListProps } from "./DiaryList";
import LifeCycle from "./LifeCycle";
import OptimizeTest from "./OptimizeTest_Primitive";
import OptimizeTest_Reference from "./OptimizeTest_Reference";
import ContainerTest from "./ContainerTest";
import MyComponent from "./MyComponent";

type APIData = {
  email: string;
  body: string;
};

function App() {
  const [data, setData] = useState<ListProps[]>([]); // 일기 [item1, item2...]
  const Id = useRef(0); // useRef(): 데이터가 변해도 리렌더링 X

  // API 호출
  const getData = async () => {
    const data = await fetch(
      "https://jsonplaceholder.typicode.com/comments"
    ).then((res) => res.json());
    console.log(data);
    const create_date = new Date().getTime();
    const apiData = data.slice(0, 20).map((value: APIData) => {
      return {
        id: Id.current++,
        author: value.email,
        content: value.body,
        emotion: Math.floor(Math.random() * 5) + 1,
        create_date,
      };
    });
    setData(apiData);
  };

  useEffect(() => {
    getData();
  }, []);

  // 일기 등록 함수
	// onCreate 라는 변수명으로 props 로 전달되는 함수
	// 🍒 함수의 재생성을 막기위해 useCallback 훅으로 최적화하기!
  const createDiary = useCallback(
		({
			author,
			content,
			emotion,
		}: Omit<ListProps, "id" | "create_date">) => {
			const create_date = new Date().getTime();
			const newData = {
				id: Id.current,
				author,
				content,
				emotion,
				create_date,
			};
			Id.current += 1; // 1씩 증가
			setData((data)=> [newData, ...data]); // 배열의 순서 [최신글, 기존글] : 최신글을 첫번째 인덱스로
		},[]); // 의존성배열 빈배열 : 처음 렌더됬을때 한번만 함수생성. 이후에는 기존 함수를 저장하여 사용.
		// 🍒 처음렌더됬을때의 data 도 빈배열 [] 이기때문에 setData([newData, ...data]); 실행은 기존의 모든 데이터를 [] 빈배열로 하고. 새로 추가한 데이터만 data 로 저장하게 된다.
		// => 해결책) 의존배열에 data 담기? NO! 함수형 업데이트를 하자!
		// 함수형 업데이트란 ? setData(함수), setData 안에 함수를 전달하는 것!
		// 함수형 업데이트를 하면 의존배열에 [data] 를 안담아도 최신의 state data 를 가져와서 상태를 저장할 수 있다. 

  // 일기 삭제 함수
  const deleteDiary = (targetId: number) => {
    const newDiaryList = data.filter((item) => item.id !== targetId);
    setData(newDiaryList);
  };

  // 일기 수정 함수
  const modifyDiary = (targetId: number, newContent: string) => {
    const newDiary = data.map((ele, index) =>
      ele.id === targetId ? { ...ele, content: newContent } : { ...ele }
    );
    setData(newDiary);
  };

  // 일기 분석 (data.length 변동시에만 렌더링 되도록 최적화하기! => 함수 렌더링 최적화 useMemo())
  // 한번 연산해둔 값을 저장해 두고 값을 사용하다가, 의존데이터가 변동시에만 다시 렌더링되게끔 연산 낭비를 막는다.
  const getDiaryAnalysis = useMemo(() => {
    // getDiaryAnalysis 는 return 된 값! (더이상 함수 X)
    console.log("일기분석 함수 실행");
    // 기분 좋은 일기 개수
    const goodCount = data.filter((ele) => ele.emotion >= 3).length;
    // 기분 나쁜 일기 개수
    const badCount = data.length - goodCount;
    // 기분 좋은 일기 비율
    const goodRate = Math.floor((goodCount / data.length) * 100);
    return { goodCount, badCount, goodRate };
  }, [data.length]);

  const { goodCount, badCount, goodRate } = getDiaryAnalysis;

  return (
    <div className="App">
      <DiaryEditor onCreate={createDiary} />
      <div>전체 일기 : {data.length}</div>
      <div>기분 좋은 일기 개수 : {goodCount}</div>
      <div>기분 나쁜 일기 개수 : {badCount}</div>
      <div>기분 좋은 일기 비율 : {goodRate}</div>
      <div></div>
      <DiaryList
        dummyData={data}
        onDelete={deleteDiary}
        onModify={modifyDiary}
      />
    </div>
  );
}

// useMemo(최적화 하려는 함수,[의존배열]) == return 된 값 (useMemo 는 함수가아니다. 값이다!)
// return 하는 함수의 연산을 최적화 하는 방법 => useMemo(()=>{},[])

export default App;
