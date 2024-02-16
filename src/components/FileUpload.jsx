import Dropzone from 'react-dropzone'
import axiosInstance from '../utils/axios'

const FileUpload = ({onImageChange, images}) => {

  const handleDrop = async (files) => {
    let formData = new FormData()
    const config = {
      header: {'content-type': 'multipart/form-data'} 
      // fetch할때 headers부분에는 Content-Type 이렇게 했는데 대소문자 무슨차이임?????
    }
    formData.append('file', files[0])
    //files[0]에는 파일에대한 정보들이 들어있음(path, lastModified, lastModifiedDate, name, size, type, ...)
    
    try{
      const response = await axiosInstance.post('/products/image', formData, config)
      onImageChange([...images, response.data.fileName])
    }catch(error) {
      console.log(error)
    }
  }

  //상품업로드페이지에서 이미지 다시 누르면 지워지도록
  const handleDelete = (image) => {
    const currentIndex = images.indexOf(image)
    let newImages = [...images]
    newImages.splice(currentIndex, 1)
    onImageChange(newImages)
  }

  return (
    <div className='flex gap-4'> 
      <Dropzone onDrop={handleDrop}>
        {({getRootProps, getInputProps}) => (
          <section className='min-w-[300px] h-[300px] border flex items-center justify-center'>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <p className='text-3xl'>+</p>
            </div>
          </section>
        )}
      </Dropzone>

      <div className='flex-grow h-[300px] border flex items-center justify-center 
        overflow-x-scroll overflow-y-hidden'>
        {images.map(image => (
          <div key={image} onClick={() => handleDelete(image)}>
            <img className='min-w-[300px] h-[300px]' 
              src={`${import.meta.env.VITE_BASE_URL}/${image}`} alt={image}/>
              {/* 백엔드서버의 url을 넣는거. frontend/.env 파일 생성해서 환경변수로 지정해놓기 */}
          </div>
        ))}
      </div>
    </div>
  )
}

export default FileUpload