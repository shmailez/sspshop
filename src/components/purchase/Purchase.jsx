import axios from 'axios';
import classes from './Purchase.module.scss'


const Purchase = (props) => {

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
      document.location.reload()
    };



    const formatNumber = (number) => {
        const numberString = number.toString();
        const parts = [];
        
        for (let i = numberString.length - 1; i >= 0; i -= 3) {
          const part = numberString.slice(Math.max(i - 2, 0), i + 1);
          parts.unshift(part);
        }
        
        return parts.join(' ');
      };

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
            <div className={classes.current}>
            <span>{props.quantity}</span>
            <span>
            <button onClick={() => handleDowndateToCart(props)}>-</button>
            <button type='submit' onClick={() => handleUpdateToCart(props)}>+</button>
            </span>
            
            </div>
            
        </div>
    )
}

export default Purchase