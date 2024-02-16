import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel'

const ImageSlider = ({images}) => {
  return (
    <div>
      <Carousel autoPlay showThumbs={false} infiniteSpeed>
        {images.map(image => (
          <div key={image}>
            <img src={`${import.meta.env.VITE_BASE_URL}/${image}`} 
              alt={image} className='w-full max-h-[150px]'/>
          </div>
        ))}
        
      </Carousel>
    </div>
  )
}

export default ImageSlider