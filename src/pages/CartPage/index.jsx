import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getCartItems, payProducts, removeCartItem } from './../../store/thunkFunctions';
import CartTable from "./Sections/CartTable";

//장바구니 페이지
const CartPage = () => {
  const dispatch = useDispatch()
  const userData = useSelector(state => state.user?.userData)
  const cartDetail = useSelector(state => state.user?.cartDetail)
  const [total, setTotal] = useState(0)
  
  useEffect(()=> {
    let cartItemIds = []
    if(userData?.cart?.length > 0) { //카트안에 상품이 있는경우
      userData.cart.forEach(item => {
        cartItemIds.push(item.id)
      })
      const body = {cartItemIds, userCart: userData.cart} 

      /* Product collection에서 해당 Product document를 가져오기 위한 cartItemIds와
      quantity속성을 가져오기 위한 userCart를 body에 담아 보냄 */
      dispatch(getCartItems(body))
    }
  }, [dispatch, userData])
  
  useEffect(() => {
    console.log('cartDetail: ', cartDetail)
    calculateTotal(cartDetail)
  }, [cartDetail])
  /* cartDetail이 변경되었을때 실행되는건데,
  왜 계속 state에 cartDetail들어가기 전일때 이게 실행이 되는거지????? */

  const calculateTotal = (cartItems) => {
    let total = 0;
    cartItems.map(item => total += item.price * item.quantity)
    setTotal(total)
  }

  const handleRemoveCartItem = (productId) => {
    dispatch(removeCartItem(productId))
  }
  
  const handlePaymentClick = () => {
    dispatch(payProducts({cartDetail}))
  }

  return (
    <section>
      <div className='text-center m-7'>
        <h2 className='text-2xl'>나의 장바구니</h2>
      </div>
      {cartDetail?.length > 0 ?
        <>
          <CartTable products={cartDetail} onRemoveItem={handleRemoveCartItem}/>
          <div className='mt-10'>
            <p><span className='font-bold'>합계: </span>{total}원</p>
            <button className='text-white bg-black rounded-md hover:bg-gray-500 px-4 py-2 mt-5'
              onClick={handlePaymentClick}>
              결제하기
            </button>
          </div>
        </>
        :
        <p>장바구니가 비었습니다.</p>
      }
    </section>
  )
}

export default CartPage