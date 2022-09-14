import React from "react";
import classes from "./MealItemForm.module.css";
import Input from "../../UI/Input";

const MealItemForm = (props) => {
    const amountInputRef = React.useRef();
    const [amountIsValid, setAmountIsValid] = React.useState(true);

    const submitHandler = event => {
        event.preventDefault();

        const enteredAmount = amountInputRef.current.value;
        const enterdAmountNum = +enteredAmount;

        if(enteredAmount.trim().length === 0 || enterdAmountNum < 1 || enterdAmountNum > 5) {
            setAmountIsValid(false);
            return; 
        }

        props.onAddToCart(enterdAmountNum);
    }

    return (
        <form className={classes.form} onSubmit={submitHandler}>
            <Input 
                ref={amountInputRef}
                label="Amount" 
                input={{
                    id: 'amount_' + props.id,
                    type: 'number',
                    min: '1',
                    max: '5',
                    step: '1',
                    defaultValue: '1'
                }} />
            <button>+ Add</button>
            {!amountIsValid && <p>Please enter a valid amount (1-5).</p>}
        </form>
    )
}

export default MealItemForm;