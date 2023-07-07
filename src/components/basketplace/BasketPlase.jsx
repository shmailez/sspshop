import Order from "../../components/order/Order"
import Purchase from "../purchase/Purchase"
import classes from './BasketPlase.module.scss'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

const BasketPlase = () => {

    const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/basket');
        setProducts(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
 

  const makeEmptyCart = () => {
    fetch('http://localhost:3000/basket', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([]),
    })
      .then(response => {
        console.log(response)
        if (response.ok) {
          console.log('Empty cart created successfully');
          // Дополнительные действия при успешном создании пустой корзины
        } else {
          console.log('Failed to create empty cart');
          // Дополнительные действия при ошибке создания пустой корзины
        }
      })
      .catch(error => {
        console.log('An error occurred:', error);
        // Дополнительные действия при ошибке запроса
      });
    }

    ///////////////////////////////

    const [basketItems, setBasketItems] = useState([]);

    console.log(products.findIndex((data) => data.id === 1))


  // Функция для удаления товара из корзины
  const removeItemFromBasket = (itemId) => {
    setBasketItems(basketItems.filter(item => item.id !== itemId));
  };

  // Получение данных о товарах в корзине из эндпоинта при монтировании компонента
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/basket');
        setBasketItems(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

    // const increaseQuantity = async (id) => {
    //   try {
    //     const response = await axios.put(`http://localhost:3000/basket/${id}`);
    //     const updatedBasket = products.map(item => {
    //       console.log('item', item)
    //       if (item.id === id) {
    //         return {
    //           ...item,
    //           quantity: response.data.quantity
    //         };
    //       }
    //       return item;
    //     });
    //     console.log(updatedBasket)
    //     setBasket(updatedBasket);
    //   } catch (error) {
    //     console.error(error);
    //   }
    // };
  
    // const decreaseQuantity = async (id) => {
    //   try {
    //     const response = await axios.put(`http://localhost:3000/basket/${id}`, {});
    //     const updatedBasket = basket.map(item => {
    //       if (item.id === id) {
    //         return {
    //           ...item,
    //           quantity: response.data.quantity
    //         };
    //       }
    //       return item;
    //     });
    //     setBasket(updatedBasket);
    //   } catch (error) {
    //     console.error(error);
    //   }
    // };

const downdateToCart = (data) => {
   const id = data.id
   const title = data.title
   const description = data.description
   const image = data.image
   const price = data.price
   const quantity = data.quantity-1
  fetch(`http://localhost:3000/basket/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ 
      id,
      title,
      description,
      price,
      image,
      quantity
    }),
  })
    .then(response =>  
      response.json())
    .then(data => {
      // Обработка успешного добавления товара в корзину
      console.log('Товар успешно обновлён -', data);
    })
    .catch(error => {
      // Обработка ошибок
      console.error('Ошибка при обновлении товара в корзину', error);
    });
}


///////////////////////

const updateToCart = (
  data
  ) => {
   const id = data.id
   const title = data.title
   const description = data.description
   const image = data.image
   const price = data.price+data.price
   const quantity = data.quantity+1
  fetch(`http://localhost:3000/basket/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ 
      id,
      title,
      description,
      price,
      image,
      quantity
    }),
  })
    .then(response =>  
      response.json())
    .then(data => {
      // Обработка успешного добавления товара в корзину
      console.log('Товар успешно обновлён +', data);
    })
    .catch(error => {
      // Обработка ошибок
      console.error('Ошибка при обновлении товара в корзину', error);
    });
};


const handleUpdateToCart = (data) => {
  updateToCart(data);  
  document.location.reload()
};

const handleDowndateToCart = (data) => {
  downdateToCart(data)
  document.location.reload()
}


const total = products
        .map(x => (x.price))
        .reduce((a, b) => {
            return a + b;
        }, 0);

    return(
        <>
            <div className={classes.basketPlace}>
              <div className={classes.purchaseSide}>
              <div className={classes.purchaseTitle}>
                  <span>Товар</span>
                  <span>К-во</span>
              </div>

                {
                  products.map(x => (<Purchase 
                      key={x.id}
                      id={x.id}
                      title={x.title}
                      price={x.price}
                      description={x.description}
                      image={x.image}
                      quantity={x.quantity}
                      handleUpdateToCart={handleUpdateToCart}
                      handleDowndateToCart={handleDowndateToCart}
                      onRemoveItem={removeItemFromBasket} 
                    />))
                }

                <button  className={classes.catalogLink}><Link className={classes.catalogLink} to="/">Продолжить покупки</Link></button>
                
                <button  className={classes.emptyBasket}  onClick={makeEmptyCart}> DELETE </button>
              </div>
              <div  className={classes.orderSide}>
                <Order total={total}/>
              </div>  
            </div>
        </>
    )
}

export default BasketPlase