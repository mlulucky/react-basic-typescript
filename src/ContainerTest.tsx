type ContinerProps = {
	title : string;
	children : React.ReactNode;
}

const ContainerTest = (props : ContinerProps) => {
// const ContainerTest = ({Hello} : {Hello : string}) => {
	const { title, children } = props;
	const style = {
		padding: "50px"
	}

	return (
		<div style={style}>
			<h2>ContainerTest</h2>
			<b>{title}</b>
			<b>안녕</b>
			<div>{children}</div>
		</div>
	)
}

export default ContainerTest;