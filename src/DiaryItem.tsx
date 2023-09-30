import { ListProps } from "./DiaryList";

const DiaryItem = ({
  id,
  author,
  content,
  emotion,
  create_date,
}: ListProps) => {
  // 객체 ele 를 객체로 전달받는 방법
  return (
    <div className="DiaryItem">
      <div className="info">
        <span>
          작성자: {author} | 감정점수 : {emotion}
        </span>
				<div className="date">{new Date(create_date).toLocaleString()}</div>
      </div>
			<div className="content">{content}</div>
    </div>
  );

  // new Date(시간).toLocaleString() : date 객체 생성

  // props 를 객체로 전달하여 사용하는 법
  // (eledata : ListProps) => {} // (객체 : 타입)
  // 🍒 사용할때, eledata.id / eledata.author / eledata.content ..

  // 구조분해 할당
  // ({id, author, content} : ListProps)
  // 🍒 사용할때, id / author / content ...
};

export default DiaryItem;
