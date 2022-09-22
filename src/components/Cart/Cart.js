import React from "react";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [didSubmit, setDidSubmit] = React.useState(false);
  const cartCtx = React.useContext(CartContext);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = id => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = item => {
    cartCtx.addItem({...item, amount: 1});
  };

  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map((item) => (
        <CartItem 
          key={item.id} 
          name={item.name} 
          amount={item.amount} 
          price={item.price} 
          onRemove={cartItemRemoveHandler.bind(null, item.id)} 
          onAdd={cartItemAddHandler.bind(null, item)} />
      ))}
    </ul>
  );

  const orderHandler = () => {
    setIsCheckout(true);
  }

  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);
    await fetch("https://food-order-app-b91d2-default-rtdb.europe-west1.firebasedatabase.app/orders.json", {
      method: 'POST',
      body: JSON.stringify({
        user: userData,
        orderedItems: cartCtx.items
      })
    });
    setIsSubmitting(false);
    setDidSubmit(true);
    cartCtx.clearCart();
  }

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
      {hasItems && <button className={classes.button} onClick={orderHandler}>Order</button>}
    </div>
  )

  const cartModalContent = (
    <>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && <Checkout onCancel={props.onClose} onConfirm={submitOrderHandler} />}
      {!isCheckout && modalActions}
    </>
  )

  const isSubmittindModalContent = (
    <p>Sending order daat...</p>
  )

  const didSubmitModalContent = (
    <>
      <p>Successfully sent the order!</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onClose}>Close</button>
      </div>
    </>
    
  )

  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittindModalContent}
      {!isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>
  );
};

export default Cart;
