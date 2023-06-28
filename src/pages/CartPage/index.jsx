import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getCartItems } from './../../store/thunkFunctions';

//장바구니 페이지
const CartPage = () => {
  const dispatch = useDispatch()
  const userData = useSelector(state => {state.user?.userData})
  
  useEffect(()=> {
    let cartItemIds = []
    if(userData?.cart?.length > 0) { //카트안에 상품이 있는경우
      userData.cart.forEach(item => {
        cartItemIds.push(item.id)
      })
      console.log(cartItemIds, userData.cart)
      const body = {cartItemIds, userCart: userData.cart} //왜 이렇게 가져오는거지?

      dispatch(getCartItems(body))
    }
  }, [dispatch, userData])
  

  return (
    <div>CartPage</div>
  )
}

export default CartPage