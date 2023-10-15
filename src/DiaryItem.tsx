import React, { useEffect } from "react";
import { useRef, useState } from "react";
import { ListProps } from "./DiaryList";

type ListPropExtend = ListProps & {
  // 타입 병합
  onDelete: (id: number) => void;
  onModify: (id: number, content: string) => void;
};

const DiaryItem = ({
  id,
  author,
  content, // 값이 바뀌는 state
  emotion,
  create_date,
  onDelete, // 함수
  onModify, // 함수
}: ListPropExtend) => {
  // 객체 ele 를 객체로 전달받는 방법

  const [showEdit, setShowEdit] = useState(false);
  const [newContent, setNewContent] = useState(content);
  const textAreaInput = useRef<HTMLTextAreaElement | null>(null);

	useEffect(()=>{
		console.log(`${id} 번째 DiaryItem 리렌더링`);
	}) // 의존배열 없는 경우. 리렌더링 될때마다 useEffect 실행

  const removeDiary = () => {
    if (window.confirm(`${id} 번째 일기를 정말 삭제하시겠습니까?`)) {
      onDelete(id);
    }
  };

  const toggleShowEdit = () => {
    setShowEdit(!showEdit);
  };

  const quitEdit = () => {
    setNewContent(content);
    toggleShowEdit();
  };

  const modifyContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewContent(e.target.value);
  };

  const modifyDiary = () => {
    if (newContent.length < 5) {
      textAreaInput?.current?.focus();
      return;
    }
    if (window.confirm(`${id} 번째 일기를 정말 수정하시겠습니까?`)) {
      onModify(id, newContent);
    }
    toggleShowEdit();
  };

  return (
    <div className="DiaryItem">
      <div className="info">
        <span>
          작성자: {author} | 감정점수 : {emotion}
        </span>
        <div className="date">{create_date ? new Date(create_date).toLocaleString(): 'N/A'}</div>
      </div>
      {showEdit ? (
        <>
          <textarea
            ref={textAreaInput}
            value={newContent}
            onChange={modifyContent}
          ></textarea>
          <button onClick={quitEdit}>수정 취소</button>
          <button onClick={modifyDiary}>수정 완료</button>
        </>
      ) : (
        <>
          <div className="content">{content}</div>
          <button onClick={removeDiary}>삭제하기</button>
          <button onClick={toggleShowEdit}>수정하기</button>
        </>
      )}
    </div>
  );

  // onClick 이벤트 핸들러에서는 함수를 바로 호출하면 안된다. onClick={함수()} // 함수실행
  // 🍒 함수 전달하기 (클릭했을때, 함수실행)
  // onClick={함수명} || onClick={()=>{ 함수실행 }}

  // new Date(시간).toLocaleString() : date 객체 생성

  // props 를 객체로 전달하여 사용하는 법
  // (eledata : ListProps) => {} // (객체 : 타입)
  // 🍒 사용할때, eledata.id / eledata.author / eledata.content ..

  // 구조분해 할당
  // ({id, author, content} : ListProps)
  // 🍒 사용할때, id / author / content ...
};

export default React.memo(DiaryItem);
