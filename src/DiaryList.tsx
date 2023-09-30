import DiaryItem from "./DiaryItem";

export type ListProps = {
  id: number;
  author: string;
  content: string;
  emotion: number;
  create_date: number;
};

type DiaryListProps = {
  dummyData: ListProps[];
};

const DiaryList = ({ dummyData }: DiaryListProps) => {
  // 비구조화 할당
  console.log(dummyData);

  return (
    <div className="DiaryList">
      <h2>다이어리 리스트</h2>
      <h4>{dummyData.length} 개의 일기가 있습니다.</h4>
      <div>
        {dummyData.map((ele)=> // {...ele} : ele 에 포함된 모든 객체데이터를 props 를 전달
				  (
            <DiaryItem key={ele.id} {...ele} />
          ),
        )}
      </div>
      {/* <div>{dummyData[0].id}</div> */}
    </div>
  );

  // 비구조화 할당하면, 객체로부터 특정 속성을 추출하여 해당 속성을 변수에 할당. 🍒 직접 변수처럼 사용가능
  // map(()=>{}) : 명시적으로 return 문을 사용하여 값을 반환해야 한다.
  // map(()=>()) : return 문 생략가능
};

// 🍒 defaultProps : undefined 로 넘어올수있는 props 의 기본값을 설정
DiaryList.defaultProps = {
  dummyData: [],
};

export default DiaryList;
