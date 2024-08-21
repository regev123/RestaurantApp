import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

import { OpenNewReservation } from '../../../../actions/reservation';

import './NewReservation.css';

const NewReservation = ({
  menuItemToReservation,
  setMenuItemToReservation,
  OpenNewReservation,
}) => {
  const [menuItems, setMenuItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [categoriesExist, setCategoriesExist] = useState([]);

  const { tableId } = useParams();

  useEffect(() => {
    if (menuItemToReservation !== null) {
      setMenuItems([...menuItems, menuItemToReservation]);
      increasePrice(menuItemToReservation.price);
      const isCategoryInMenuItems = categoriesExist.some(
        (category) => category.name === menuItemToReservation.category.name
      );
      if (!isCategoryInMenuItems)
        setCategoriesExist([
          ...categoriesExist,
          { ...menuItemToReservation.category, hold: false },
        ]);
      setMenuItemToReservation(null);
    }
  }, [menuItemToReservation]);

  const increasePrice = (amount) => {
    setTotalPrice((prevPrice) => prevPrice + amount);
  };

  const decreasePrice = (amount) => {
    setTotalPrice((prevPrice) => prevPrice - amount);
  };

  const removeIngredient = (indexSent, menuItemId, ingredientName) => {
    setMenuItems(
      menuItems.map((item, index) => {
        if (item.id === menuItemId && index === indexSent) {
          const updatedIngredients = item.ingredients.filter(
            (ingredient) => ingredient.name !== ingredientName
          );

          const updatedRemovedIngredients = item.removedIngredients
            ? [...item.removedIngredients, ingredientName]
            : [ingredientName];

          return {
            ...item,
            ingredients: updatedIngredients,
            removedIngredients: updatedRemovedIngredients,
          };
        }
        return item;
      })
    );
  };

  const deleteItemFromReservation = (index, price) => {
    decreasePrice(price);

    let itemRemovedCategory;

    setMenuItems((prevItems) => {
      const newItems = prevItems.filter((item, i) => {
        if (i === index) itemRemovedCategory = item;
        return i !== index;
      });

      const hasMoreItemsFromCategory = newItems.some(
        (item) => item.category.name === itemRemovedCategory.category.name
      );

      if (!hasMoreItemsFromCategory) {
        const updatedCategories = categoriesExist.filter(
          (category) => category.name !== itemRemovedCategory.category.name
        );
        setCategoriesExist(updatedCategories);
      }

      return newItems;
    });
  };

  const holdItem = (index) => {
    setMenuItems((prevItems) =>
      prevItems.map((item, i) =>
        i === index ? { ...item, hold: !item.hold } : item
      )
    );
  };

  const holdCategory = (categoryName, holdCategory) => {
    setCategoriesExist((prevCategories) =>
      prevCategories.map((category) =>
        category.name === categoryName
          ? { ...category, hold: !holdCategory }
          : category
      )
    );

    setMenuItems((prevItems) =>
      prevItems.map((item) =>
        item.category.name === categoryName
          ? { ...item, hold: !holdCategory }
          : item
      )
    );
  };

  const handleSubmit = () => {
    OpenNewReservation(menuItems, tableId);
    setMenuItems([]);
    setTotalPrice(0);
    setCategoriesExist([]);
  };

  return (
    <div className='new-reservation-page-container'>
      <h2>New Reservation</h2>
      <div className='new-reservation-page-menu-item-list'>
        {categoriesExist.map((category) => (
          <div className='new-reservation-page-menu-item-list-by-category-container'>
            <div className='new-reservation-page-menu-item-list-by-category-title'>
              <h6>
                {category.name}
                <button
                  className={
                    category.hold
                      ? 'new-reservation-page-menu-item-list-by-category-actions-btn-hold'
                      : 'new-reservation-page-menu-item-list-by-category-actions-btn'
                  }
                  onClick={() => holdCategory(category.name, category.hold)}
                >
                  <i class='bx bxs-hand'></i>
                </button>
              </h6>
            </div>

            <div className='new-reservation-page-menu-item-list-by-category-items'>
              {menuItems.map((item, index) => (
                <Fragment>
                  {item.category.name === category.name && (
                    <div
                      key={item.id}
                      className='new-reservation-page-menu-item'
                    >
                      <div className='new-reservation-page-menu-item-content'>
                        <div className='new-reservation-page-menu-item-content-name-price'>
                          <h3>
                            {item.name} <span>${item.price.toFixed(2)}</span>
                          </h3>
                        </div>
                        <div className='new-reservation-page-menu-item-actions'>
                          <button
                            className='new-reservation-page-menu-item-actions-btn'
                            onClick={() =>
                              deleteItemFromReservation(index, item.price)
                            }
                          >
                            <i class='bx bx-trash'></i>
                          </button>
                          <button
                            className={
                              item.hold
                                ? 'new-reservation-page-menu-item-actions-btn-hold'
                                : 'new-reservation-page-menu-item-actions-btn'
                            }
                            onClick={() => holdItem(index)}
                          >
                            <i class='bx bxs-hand'></i>
                          </button>
                        </div>
                      </div>
                      <div className='new-reservation-page-menu-item-ingridients'>
                        {item.ingredients.map((ingredient) => (
                          <h3>
                            {ingredient.name}
                            {ingredient.canRemove && (
                              <button
                                className='new-reservation-page-menu-item-ingridient-remove'
                                onClick={() =>
                                  removeIngredient(
                                    index,
                                    item.id,
                                    ingredient.name
                                  )
                                }
                              >
                                <i class='bx bx-message-rounded-x'></i>
                              </button>
                            )}
                          </h3>
                        ))}
                        {item.removedIngredients &&
                          item.removedIngredients.map((ingredient) => (
                            <h3 style={{ color: 'red' }}>
                              Without {ingredient}
                            </h3>
                          ))}
                      </div>
                    </div>
                  )}
                </Fragment>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className='new-reservation-page-reservation-summary'>
        <p>Subtotal: ${totalPrice.toFixed(2)}</p>
        <button onClick={handleSubmit}>Submit Reservation</button>
      </div>
    </div>
  );
};

NewReservation.propTypes = {
  OpenNewReservation: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { OpenNewReservation })(NewReservation);
