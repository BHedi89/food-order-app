import React from "react";
import classes from "./HeaderCartButton.module.css";
import CartIcon from "../Cart/CartIcon";
import CartContext from "../../store/cart-context";

const HeaderCartButton = (props) => {
    const [btnIsHighlighted, setbtnHighlighted] = React.useState(false);
    const cartCtx = React.useContext(CartContext);
    const {items} = cartCtx;
    const numberOfCartItems = cartCtx.items.reduce((currNum, item) => {
        return currNum + item.amount;
    }, 0);
    
    const btnClasses = `${classes.button} ${btnIsHighlighted ? classes.bump: ''}`;

    React.useEffect(() => {
        if(cartCtx.items.length === 0){
            return;
        }
        setbtnHighlighted(true);

        const timer = setTimeout(() => {
            setbtnHighlighted(false);
        }, 300);

        return () => {
            clearTimeout(timer);
        };
    }, [items])

    return (
        <button className={btnClasses} onClick={props.onClick}>
            <span className={classes.icon}>
                <CartIcon />
            </span>
            <span>Your Cart</span>
            <span className={classes.badge}>
                {numberOfCartItems}
            </span>
        </button>
    )
}

export default HeaderCartButton;