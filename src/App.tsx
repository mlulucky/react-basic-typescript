import "./App.css";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";

function App() {
  const diaryDummyList = [
    {
      id: 1,
      author: "문은정",
      content: "오늘의 일기",
      emotion: 4,
      create_date: new Date().getTime(), // 시간객체 _ new Date() : 현재시간
    },
    {
      id: 2,
      author: "은정",
      content: "오늘의 일기2",
      emotion: 5,
      create_date: new Date().getTime(),
    },
    {
      id: 3,
      author: "mlulucky",
      content: "오늘의 일기3",
      emotion: 3,
      create_date: new Date().getTime(),
    },
  ];
  // new Date.getTime() : Date 객체를 숫자 밀리세컨즈로 반환
  return (
    <div className="App">
      <DiaryEditor />
      <DiaryList dummyData={diaryDummyList} />
    </div>
  );
}

export default App;
