interface Props {
	title: string | undefined;
	year: number;
	prop: PropType;
}

type PropType = {
	name: string;
	color: string;
}
const MyComponent : React.FC<Props> = (props) => {
	// const MyComponent : React.FC<Props> = ({title, year}) => {
	const {title, year, prop} = props;
	const {name, color} = prop;
	return (
		<div>
			{title}{year}
			<p>{color}</p>
		</div>
	)
}

// undefined 로 전달된 props 의 기본값을 설정
MyComponent.defaultProps = {
	title: "기본prop",
}

export default MyComponent;