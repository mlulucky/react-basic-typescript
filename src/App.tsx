import {
  useCallback,  
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from "react";
import DiaryEditor from "./DiaryEditor";
import DiaryList, { ListProps } from "./DiaryList";
import "./App.css";
import React from "react";

type APIData = {
  email: string;
  body: string;
};

type StateType  = {
  id: number;
  author: string;
  content: string;
  emotion: number;
  create_date?: number;
};

type ActionType =
  | { type: "INIT"; data: StateType[] }
  | { type: "CREATE"; data: StateType }
  | { type: "DELETE"; targetId: number }
  | { type: "MODIFY"; targetId: number; newContent: string };

// 🍒reducer 함수
const reducer = (state: StateType[], action: ActionType): StateType[] => { // reducer 함수 반환타입 : StateType[]
	// reducer 함수의 반환타입 꼭 적어야한다!! 안적으니 dsipatch 타입이 (value: ActionType) => void 에서 () => void 매개변수없는 타입으로 나와서, dispatch 에서 전부 에러 터짐
  // dispatch(action) === dispatch({action.type, action.data})
  // state 즉 data 변경 상태 // getData, create, delete, modify
  // setData() 를 대체 => dispatch()
  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    case "CREATE": {
      const create_date = new Date().getTime();
      const newData = {
        ...action.data,
        create_date,
      };
      return [newData, ...state]; // state 는 변경직전 state // 즉, state === [newData, ...state]
    }
    case "DELETE":
      return state.filter((item) => item.id !== action.targetId);
    case "MODIFY":
      return state.map((item) =>
        item.id === action.targetId
          ? { ...item, content: action.newContent }
          : item
      );
    default:
      return state; // 기존 상태 반환
  }
};

export const DiaryStateContext = React.createContext<StateType[]>([]);
export const DiaryDispatchContext = React.createContext({ // 타입<> 별도 명시x => ()=>{} 로 타입추론
	createDiary: (data: Omit<ListProps, "id" | "create_date">) => {},
  deleteDiary: (targetId: number) => {},
  modifyDiary: (targetId: number, newContent: string) => {}
});

function App() {
  const initialState: StateType[] = [];
  // 🍒useState 말고. useReducer 훅으로 컴포넌트와 분리해서 state(상태)관리하기!
 const [data, dispatch] = useReducer(reducer, initialState); // useReducer(reducer 함수, 초기State(data))
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
    dispatch({ type: "INIT", data: apiData }); // data == action.data
  };

  useEffect(() => {
    getData();
  }, []);

  // 일기 등록 함수
  // onCreate 라는 변수명으로 props 로 전달되는 함수
  // 🍒 함수의 재생성을 막기위해 useCallback 훅으로 최적화하기!
  const createDiary = useCallback(
    ({ author, content, emotion }: Omit<ListProps, "id" | "create_date">) => {
      Id.current += 1; // 1씩 증가
      dispatch({type: "CREATE", data: { author, content, emotion, id: Id.current }});
    },
    []); // 의존성배열 빈배열 : 처음 렌더됬을때 한번만 함수생성. 이후에는 기존 함수를 저장하여 사용.
  // 🍒 처음렌더됬을때의 data 도 빈배열 [] 이기때문에 setData([newData, ...data]); 실행은 기존의 모든 데이터를 [] 빈배열로 하고. 새로 추가한 데이터만 data 로 저장하게 된다.
  // => 해결책) 의존배열에 data 담기? NO! 함수형 업데이트를 하자!
  // 함수형 업데이트란 ? setData(함수), setData 안에 함수를 전달하는 것!
  // 함수형 업데이트를 하면 의존배열에 [data] 를 안담아도 최신의 state data 를 가져와서 상태를 저장할 수 있다.

  // 일기 삭제 함수
  const deleteDiary = useCallback((targetId: number) => {
    dispatch({ type: "DELETE", targetId }); // targetId == action.targetId
  }, []);

  // 일기 수정 함수
  const modifyDiary = useCallback((targetId: number, newContent: string) => {
    dispatch({ type: "MODIFY", targetId, newContent });
  }, []);

	// Context Provider 로 dispatch CRUD 함수 전달하기
	// (useMemo 사용하는 이유 - App 컴포넌트가 리렌더링될때, 함수를 묶은 객체 {createDiary, deleteDiary, modifyDiary} 가 재렌더링 하는것을 방지하기 위해)
	const dispatchFunc = useMemo(()=> {
		return {createDiary, deleteDiary, modifyDiary}
	},[]);

  // 일기 분석 (data.length 변동시에만 렌더링 되도록 최적화하기! => 연산값 렌더링 최적화 useMemo())
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
		// Context.Provider 공급자 컴포넌트
		<DiaryStateContext.Provider value={data}>
			<DiaryDispatchContext.Provider value={dispatchFunc}>
				<div className="App">
					<DiaryEditor/>
					<div>전체 일기 : {data.length}</div>
					<div>기분 좋은 일기 개수 : {goodCount}</div>
					<div>기분 나쁜 일기 개수 : {badCount}</div>
					<div>기분 좋은 일기 비율 : {goodRate}</div>
					<div></div>
					<DiaryList/>
				</div>
			</DiaryDispatchContext.Provider>
		</DiaryStateContext.Provider>
  );
}

// useMemo(최적화 하려는 함수,[의존배열]) == return 된 값 (useMemo 는 함수가아니다. 값이다!)
// return 하는 함수의 연산을 최적화 하는 방법 => useMemo(()=>{},[])

export default App;
