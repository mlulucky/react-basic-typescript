import { ReactNode } from "react"

// children 은 props 로 전달받은 컴포넌트
// React element 를 children 으로 받다.
// ReactNode 는 컴포넌트(JSX || TSX)의 타입
const Container = ({children} : {children: ReactNode}) => {
	const style = {
		margin: 20,
		padding: 20,
		border: "1px solid #333"
	}
	return (
		<div style={style}>
			{children}
		</div>
	)
}

export default Container;