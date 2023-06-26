const CheckBox = ({continents, checkedContinents, onFilters}) => {

  //새롭게 체크한 애들을 onFilters함수에 넣어서 호출
  const handleToggle = (continentId) => {
    const currentIndex = checkedContinents.indexOf(continentId) 
    const newChecked = [...checkedContinents]
    if(currentIndex === -1) { //체크 안되어있었던거 그니깐 새로 체크한거
      newChecked.push(continentId)
    }else { 
      newChecked.splice(currentIndex, 1)
    }
    onFilters(newChecked)
  }

  return (
    <div className='p-2 mb-3 bg-gray-100 rounded-md'>
      {continents?.map(continent => (
        <div key={continent._id}>
          <input type='checkbox' 
            onChange={() => handleToggle(continent._id)}
            checked={checkedContinents.indexOf(continent._id) === -1 ? false : true}/>{' '}
          <label>{continent.name}</label>
        </div>
      ))}
    </div>
  )
}

export default CheckBox