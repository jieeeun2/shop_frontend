const SearchInput = ({searchTerm, onSearch}) => {
  return (
    <input type='text'
      className='p-2 border border-gray-300 rounded-md' 
      placeholder='검색하세요'
      onChange={onSearch}
      value={searchTerm}/>
  )
}

export default SearchInput