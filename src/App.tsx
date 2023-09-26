// import "./App.css";
import MyHeader from "./MyHeader";
import MyFooter from "./MyFooter";

function App() {
	// 인라인 스타일 (객체타입으로)
	const style =  {
		App: {
			backgroundColor: 'black'
		},
		h2: {
			color: '#fff'
		},
		bold_text : {
			color: 'green'
		}
	}

  let name = "은정";
	let number = 5;
	// { } 중괄호 안에 값은 문자열, 숫자만 렌더된다. (boolean 타입, [] 배열은 렌더 안됨)
  return (
    <div style={style.App}>
    {/* </div><div className="App"> */}
      <MyHeader />
        <h2 style={style.h2}>안녕 리액트 {name}</h2>
				<b style={style.bold_text} id="bold_text">
					안녕 타입스크립트 <br/>
					조건부 렌더링 {number}는 : {number % 2 === 0 ? '짝수' : '홀수'}
				</b>
      <MyFooter />
    </div>
  );
}

export default App;

// 최상위 태그 규칙
// 최상위 태그 하나로 감싸줘야 한다.
// <></>
// == <React.Fragment></React.Fragment>
// React 기능을 import 하지 않는 컴포넌트의 경우는 굳이 React 를 import 하지 않아도 된다.

// 닫힘 태그 <br/> <Image/>

// 조건부 렌더링 : 삼항연산자를 이용해서, 조건이 참, 거짓에 따라서 렌더링 할 수 있다.
// {조건식 ? 참 : 거짓} 