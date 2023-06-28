import { useState, useEffect } from 'react'
import { useParams } from "react-router-dom"
import axiosInstance from "../../utils/axios"
import ProductImage from './Sections/ProductImage'
import ProductInfo from './Sections/ProductInfo'

//상세 상품 페이지
const DetailProductPage = () => {
  const { productId } = useParams() //useParams()는 객체를 반환
  //App.jsx에서 라우트 path를 /products/:productId 이렇게 해줬기 때문에 요렇게 갖다쓰면됨
  const [product, setProduct] = useState(null)

  useEffect(() => {
    //console.log('뭐가 찍힐까나 3', product)
    const fetchProduct = async () => {
      try {
        const response = await axiosInstance.get(`/products/${productId}?type=single`)
        setProduct(response.data[0])
      }catch(error) {
        console.log(error)
      }
    }
    fetchProduct()
  }, [productId])

  //console.log('뭐가 찍힐까나 1', product)
  if(!product) return null

  return (
    <section className='w-full p-4'>
      <div className='text-center'>
        <h1 className='p-4 text-2xl'>{product.title}</h1>
      </div>
      {/* {console.log('뭐가 찍힐까나 2', product)} */}
      <div className='flex gap-2'>
        <div className='w-1/2'>
          <ProductImage product={product} />
        </div>
        <div className='w-1/2'>
          <ProductInfo product={product} />
        </div>
      </div>
    </section>
  )
}

export default DetailProductPage