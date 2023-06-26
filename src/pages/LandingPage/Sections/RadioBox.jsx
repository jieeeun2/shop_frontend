
const RadioBox = ({prices, checkedPrice, onFilters}) => {
  return (
    <div className='p-2 mb-3 bg-gray-100 rounded-md'>
      {prices?.map(price => (
        <div key={price._id}>
          <input type='radio' 
            checked={checkedPrice === price.array}
            /* 여기서 checked는 false밖에 나올수가 없는거 아닌가????? 
            그리고 이속성 지우면 체크박스가 여러개 누를수있거나
            아예 안눌리거나 왜 둘중하나인건데
            type='radio' 있잖아 뭐가문제지*/
            onChange={e => onFilters(e.target.value)} 
            id={price._id}
            value={price._id} 
          />{' '}
          <label /* htmlFor={price._id} */>{price.name}</label>
        </div>
      ))}
    </div>
  )
}

export default RadioBox