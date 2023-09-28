const OddEvenResult = ({count} : {count : number}) => {
	console.log("OddEvenResult count",count);
	return <>{count % 2 === 0 ? '짝수' : '홀수'}</>
}

export default OddEvenResult;