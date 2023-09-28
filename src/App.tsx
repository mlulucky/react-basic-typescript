// import "./App.css";
import MyHeader from "./MyHeader";
import MyFooter from "./MyFooter";
import Counter from "./Counter";
import Container from './Container';

function App() {
	// 컴포넌트에 전달되는 데이터, props 가 많으면 => 객체로 묶어서 전달

	const counterProps = {
		a: 1,
		b: "b",
		c: "c",
		initialValue: 5
	}

  return (
		<Container>
			<div>
				<MyHeader />
				<Counter {...counterProps}/>
				{/* <Counter a={1} b={"b"} c={"c"} initialValue = {5}/> */}
				<MyFooter />
			</div>
		</Container>
  );
}

export default App;