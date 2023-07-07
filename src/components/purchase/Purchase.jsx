import axios from 'axios';
import classes from './Purchase.module.scss'
import { useState } from 'react';

const Purchase = (props) => {

    // const increaseQuantity = props.increaseQuantity
    // const decreaseQuantity = props.decreaseQuantity

    console.log(props)
    const id = props.id
    const handleUpdateToCart = props.handleUpdateToCart  
    const handleDowndateToCart = props.handleDowndateToCart
    const onRemoveItem = props.removeItemFromBasket

    const handleRemoveItem = async () => {
      try {
        await axios.delete(`http://localhost:3000/basket/${id}`);
        onRemoveItem(id);
      } catch (error) {
        console.error(error);
      }
    };




    // const [basket, setBasket] = useState([]);

    const formatNumber = (number) => {
        const numberString = number.toString();
        const parts = [];
        
        for (let i = numberString.length - 1; i >= 0; i -= 3) {
          const part = numberString.slice(Math.max(i - 2, 0), i + 1);
          parts.unshift(part);
        }
        
        return parts.join(' ');
      };

      // console.log('ID', props)

    return(
        <div className={classes.container}>
            <div className={classes.cardImage}>
                <img className={classes.image} src={props.image} alt="" />
            </div>
            <div className={classes.cardInfo}>
                <h3>{props.title}</h3>
                <p>{props.description}</p>
                <span>{formatNumber(props.price)} руб.</span>
                <button onClick={handleRemoveItem}>УДалить</button>
            </div>
            <button onClick={handleRemoveItem}>delete</button>
            <button onClick={() => handleDowndateToCart(props)}>-</button>
            {/* <button onClick={() => increaseQuantity(props.id)}>+</button> */}
            {props.quantity}
          {/* <button onClick={() => decreaseQuantity(props.id)}>-</button> */}
          <button type='submit' onClick={() => handleUpdateToCart(props)}>+</button>
        </div>
    )
}

export default Purchase