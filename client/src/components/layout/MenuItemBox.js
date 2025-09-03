import './MenuItemBox.css';

const MenuItemBox = ({ item, children }) => (
  <div key={item.name} className='delete-edit-menu-item-box'>
    <img
      className={item.close ? 'gray-scale' : ''}
      src={item.imageUrl}
      alt={item.name}
    />

    <div className='delete-edit-menu-item-box-content'>
      <h5>
        {item.name}
        <span> ${item.price}</span>
      </h5>
      <p>{item.ingredients.map((ingredient) => ingredient.name).join(', ')}</p>
    </div>

    {children}
  </div>
);

export default MenuItemBox;
