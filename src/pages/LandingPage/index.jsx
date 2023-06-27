import { useState, useEffect } from 'react';
import CardItem from "./Sections/CardItem"
import CheckBox from "./Sections/CheckBox"
import RadioBox from "./Sections/RadioBox"
import SearchInput from "./Sections/SearchInput"
import axiosInstance from './../../utils/axios'
import { continents, prices } from '../../utils/filterData'


const LandingPage = () => {
  const [products, setProducts] = useState([])
  const [skip, setSkip] = useState(0) //어디서부터 데이터를 가져오는지에 대한 위치
  const limit = 4  
  //처음 데이터를 가져올때와 더보기버튼을 눌러서 가져올때, 얼마나 많은 데이터를 한번에 가져오는지
  const [hasMore, setHasMore] = useState(false)
  const [filters, setFilters] = useState({continents: [], price: []})
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchProducts({skip, limit}) 
  }, [])


  /* 
  예를들어서 체크박스의 Africa, Europe, Asia 세개를 체크했다면 fetchProducts()함수를 실행하게 되고
  axios로 
  http://localhost:4000/products?skip=0&limit=4&filters[continents][0]=1&filters[continents][1]=2
  &filters[continents][2]=3&searchTerm=
  이렇게
  */
  const fetchProducts = async ({skip, limit, loadMore=false, filters={}, searchTerm=''}) => {
    const params = {skip, limit, filters, searchTerm}

    try {
      const response = await axiosInstance.get('/products', {params})

      if(loadMore) {
        setProducts([...products, ...response.data.products]) //뭔가 잘 이해가 안됨 여기
        //원래 state에 있던 products에다가 추가로 새로response받아온 products도 들어온거임
      }else {
        setProducts(response.data.products)
      }
      setHasMore(response.data.hasMore)
      
    } catch(error) { 
      console.log(error)
    }
  }

  const handleLoadMore = () => {
    const body = {
      skip: skip + limit,
      limit,
      loadMore: true,
      filters,
      searchTerm
    }
    fetchProducts(body)
    setSkip(skip + limit)
  }

  const handleFilters = (newFilterdData, category) => {
    const newFilters = {...filters}
    newFilters[category] = newFilterdData
    if(category === 'price') {
      const priceValues = handlePrice(newFilterdData)
      newFilters[category] = priceValues
    }
    setFilters(newFilters)
    showFilteredResults(newFilters)
  }

  const showFilteredResults = (filters) => {
    const body = {
      skip: 0,
      limit,
      filters,
      searchTerm
    }
    fetchProducts(body)
    setSkip(0) //왜해줘야하지
  }

  const handlePrice = (value) => {
    let array = []
    for(let key in prices) {
      if(prices[key]._id === parseInt(value, 10)) {
        array = prices[key].array
      }
    }
    return array
  }

  const handleSearchTerm = (event) => {
    const body = {
      skip: 0,
      limit,
      filters,
      searchTerm: event.target.value
    }
    setSkip(0)
    setSearchTerm(event.target.value)
    fetchProducts(body)
  }

  return (
    <section>
      <div className='text-center m-7'>
        <h2 className='text-2xl'>여행 상품 사이트</h2>
      </div>
      <div>
        <div className='flex gap-3'>
          <div className='w-1/2'>
            <CheckBox continents={continents} checkedContinents={filters.continents}
              onFilters={filters => handleFilters(filters, 'continents')}/>
          </div>
          <div className='w-1/2'>
            <RadioBox prices={prices} checkedPrice={filters.price}
              onFilters={filters => handleFilters(filters, 'price')}/>
          </div>
        </div>

        <div className='flex justify-end mb-3'>
          <SearchInput searchTerm={searchTerm} onSearch={handleSearchTerm}/>
        </div>

        <div className='grid grid-cols-2 gap-4 sm:grid-cols-4'>
          {/* 기본은 2개, sm보다 크면 4개씩 */}
          {products?.map(product => (
            <CardItem product={product} key={product._id}/>
          ))}
        </div>

        {hasMore &&
        <div className='flex justify-center mt-5'>
          <button onClick={handleLoadMore} 
            className='px-4 py-2 mt-5 text-white bg-black rounded-md hover:bg-gray-500'>
            더보기
          </button>
        </div>}
      </div>

    </section>
  )
}

export default LandingPage