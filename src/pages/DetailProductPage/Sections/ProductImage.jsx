import { useEffect, useState } from 'react'
import ImageGallery from 'react-image-gallery'

const ProductImage = ({product}) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    // console.log('어떤거부터 찍히는걸까 2')
    if(product?.images?.length > 0) {
      let images = []
      product.images.map(imageName => {
        return images.push({
          original: `${import.meta.env.VITE_BASE_URL}/${imageName}`,
          thumbnail: `${import.meta.env.VITE_BASE_URL}/${imageName}`
        })
      })
      setImages(images)
    }
  }, [product])

  return (
    // <div>{console.log('어떤거부터 찍히는걸까 1', images)}
    <ImageGallery items={images} />
    // </div>
  )
}

export default ProductImage