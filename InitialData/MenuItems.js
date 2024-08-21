const mongoose = require('mongoose');
const MenuItem = require('../models/MenuItem/MenuItem');
const MenuItemCategory = require('../models/MenuItem/MenuItemCategory');

const dbURL =
  'mongodb+srv://regevAvital:LGYTRduRJmsK6SqX@cluster0.wvw0vas.mongodb.net/test?retryWrites=true&w=majority';

// Array of categories to insert
const menuItems = [
  // Appetizers (order 1)
  {
    name: 'Shrimp Cocktail',
    price: 13.99,
    ingredients: [
      { name: 'Shrimp', canRemove: false },
      { name: 'Cocktail Sauce', canRemove: false },
      { name: 'Lemon Wedges', canRemove: true },
    ],
    category: 'Appetizers',
    imageUrl:
      'https://images.unsplash.com/photo-1601333245890-7b09fecbd8e9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8U2hyaW1wJTIwQ29ja3RhaWx8ZW58MHx8MHx8fDA%3D',
  },
  {
    name: 'Garlic Bread',
    price: 8.0,
    ingredients: [
      { name: 'Bread', canRemove: false },
      { name: 'Garlic', canRemove: false },
      { name: 'Butter', canRemove: false },
    ],
    category: 'Appetizers',
    imageUrl:
      'https://images.unsplash.com/photo-1573140401552-3fab0b24306f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8R2FybGljJTIwQnJlYWR8ZW58MHx8MHx8fDA%3D',
  },
  {
    name: 'Bruschetta',
    price: 10.0,
    ingredients: [
      { name: 'Bread', canRemove: false },
      { name: 'Garlic', canRemove: false },
      { name: 'Basil', canRemove: true },
      { name: 'Tomato', canRemove: false },
    ],
    category: 'Appetizers',
    imageUrl:
      'https://plus.unsplash.com/premium_photo-1668095398193-58a63a440464?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8QnJ1c2NoZXR0YXxlbnwwfHwwfHx8MA%3D%3D',
  },
  {
    name: 'Stuffed Mushrooms',
    price: 14.5,
    ingredients: [
      { name: 'Mushrooms', canRemove: false },
      { name: 'Cheese', canRemove: false },
      { name: 'Herbs', canRemove: true },
    ],
    category: 'Appetizers',
    imageUrl:
      'https://plus.unsplash.com/premium_photo-1661367926799-1daa093587ae?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8U3R1ZmZlZCUyME11c2hyb29tc3xlbnwwfHwwfHx8MA%3D%3D',
  },
  {
    name: 'Chicken Wings',
    price: 13.0,
    ingredients: [
      { name: 'Chicken', canRemove: false },
      { name: 'Hot Sauce', canRemove: true },
      { name: 'Ranch Dressing', canRemove: true },
    ],
    category: 'Appetizers',
    imageUrl:
      'https://plus.unsplash.com/premium_photo-1669742928112-19364a33b530?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Q2hpY2tlbiUyMFdpbmdzfGVufDB8fDB8fHww',
  },

  // Main Courses (order 2)
  {
    name: 'Spaghetti Bolognese',
    price: 18.5,
    ingredients: [
      { name: 'Pasta', canRemove: false },
      { name: 'Ground Beef', canRemove: false },
      { name: 'Tomato Sauce', canRemove: false },
    ],
    category: 'Main Courses',
    imageUrl:
      'https://images.unsplash.com/photo-1626844131082-256783844137?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8U3BhZ2hldHRpJTIwQm9sb2duZXNlfGVufDB8fDB8fHww',
  },
  {
    name: 'Grilled Salmon',
    price: 22.0,
    ingredients: [
      { name: 'Salmon', canRemove: false },
      { name: 'Lemon', canRemove: true },
      { name: 'Garlic Butter', canRemove: true },
    ],
    category: 'Main Courses',
    imageUrl:
      'https://images.unsplash.com/photo-1707576517985-a2e912cca325?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8R3JpbGxlZCUyMFNhbG1vbnxlbnwwfHwwfHx8MA%3D%3D',
  },
  {
    name: 'Filet Mignon',
    price: 30.0,
    ingredients: [
      { name: 'Beef', canRemove: false },
      { name: 'Mushrooms', canRemove: true },
      { name: 'Red Wine Sauce', canRemove: false },
    ],
    category: 'Main Courses',
    imageUrl:
      'https://images.unsplash.com/photo-1606419420761-4f2aa891ed19?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8RmlsZXQlMjBNaWdub258ZW58MHx8MHx8fDA%3D',
  },
  {
    name: 'Vegetable Stir Fry',
    price: 16.0,
    ingredients: [
      { name: 'Mixed Vegetables', canRemove: false },
      { name: 'Soy Sauce', canRemove: true },
      { name: 'Rice', canRemove: true },
    ],
    category: 'Main Courses',
    imageUrl:
      'https://images.unsplash.com/photo-1543826173-70651703c5a4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8VmVnZXRhYmxlJTIwU3RpciUyMEZyeXxlbnwwfHwwfHx8MA%3D%3D',
  },
  {
    name: 'Lasagna',
    price: 20.0,
    ingredients: [
      { name: 'Pasta', canRemove: false },
      { name: 'Beef', canRemove: true },
      { name: 'Cheese', canRemove: false },
      { name: 'Tomato Sauce', canRemove: false },
    ],
    category: 'Main Courses',
    imageUrl:
      'https://images.unsplash.com/photo-1709429790175-b02bb1b19207?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8TGFzYWduYXxlbnwwfHwwfHx8MA%3D%3D',
  },

  // Desserts (order 3)
  {
    name: 'Tiramisu',
    price: 9.5,
    ingredients: [
      { name: 'Ladyfingers', canRemove: false },
      { name: 'Mascarpone', canRemove: false },
      { name: 'Coffee', canRemove: false },
      { name: 'Cocoa', canRemove: false },
    ],
    category: 'Desserts',
    imageUrl:
      'https://images.unsplash.com/photo-1704743103071-42f0d84d8af7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fFRpcmFtaXN1fGVufDB8fDB8fHww',
  },
  {
    name: 'Chocolate Cake',
    price: 8.0,
    ingredients: [
      { name: 'Chocolate', canRemove: false },
      { name: 'Flour', canRemove: false },
      { name: 'Sugar', canRemove: false },
    ],
    category: 'Desserts',
    imageUrl:
      'https://images.unsplash.com/photo-1590080874810-8180c3eb1016?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Q2hvY29sYXRlJTIwQ2FrZXxlbnwwfHwwfHx8MA%3D%3D',
  },
  {
    name: 'Cheesecake',
    price: 10.0,
    ingredients: [
      { name: 'Cream Cheese', canRemove: false },
      { name: 'Graham Cracker Crust', canRemove: true },
    ],
    category: 'Desserts',
    imageUrl:
      'https://images.unsplash.com/photo-1702925614886-50ad13c88d3f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Q2hlZXNlY2FrZXxlbnwwfHwwfHx8MA%3D%3D',
  },
  {
    name: 'Apple Pie',
    price: 7.5,
    ingredients: [
      { name: 'Apples', canRemove: false },
      { name: 'Pastry Crust', canRemove: false },
      { name: 'Cinnamon', canRemove: true },
    ],
    category: 'Desserts',
    imageUrl:
      'https://plus.unsplash.com/premium_photo-1666353533935-17d7189d9074?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fEFwcGxlJTIwUGllfGVufDB8fDB8fHww',
  },
  {
    name: 'Panna Cotta',
    price: 9.0,
    ingredients: [
      { name: 'Cream', canRemove: false },
      { name: 'Gelatin', canRemove: false },
      { name: 'Vanilla', canRemove: false },
    ],
    category: 'Desserts',
    imageUrl:
      'https://images.unsplash.com/photo-1530968313155-63d6a989fc6d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8UGFubmElMjBDb3R0YXxlbnwwfHwwfHx8MA%3D%3D',
  },

  // Drinks (order 4)
  {
    name: 'Margarita',
    price: 10.0,
    ingredients: [
      { name: 'Tequila', canRemove: false },
      { name: 'Triple Sec', canRemove: true },
      { name: 'Lime Juice', canRemove: false },
    ],
    category: 'Drinks',
    imageUrl:
      'https://images.unsplash.com/photo-1586968186962-2602d20287e1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8TWFyZ2FyaXRhfGVufDB8fDB8fHww',
  },
  {
    name: 'Mojito',
    price: 9.0,
    ingredients: [
      { name: 'Rum', canRemove: false },
      { name: 'Mint', canRemove: true },
      { name: 'Lime', canRemove: false },
    ],
    category: 'Drinks',
    imageUrl:
      'https://images.unsplash.com/photo-1517620517090-ab7f8eacbfd8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8TW9qaXRvfGVufDB8fDB8fHww',
  },
  {
    name: 'Sangria',
    price: 11.0,
    ingredients: [
      { name: 'Red Wine', canRemove: false },
      { name: 'Brandy', canRemove: false },
      { name: 'Fruits', canRemove: true },
    ],
    category: 'Drinks',
    imageUrl:
      'https://plus.unsplash.com/premium_photo-1673457113019-87f15f5be0a0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8U2FuZ3JpYXxlbnwwfHwwfHx8MA%3D%3D',
  },
  {
    name: 'Espresso',
    price: 3.5,
    ingredients: [{ name: 'Coffee Beans', canRemove: false }],
    category: 'Drinks',
    imageUrl:
      'https://images.unsplash.com/photo-1610889556528-9a770e32642f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8RXNwcmVzc298ZW58MHx8MHx8fDA%3D',
  },
  {
    name: 'Smoothie',
    price: 7.0,
    ingredients: [
      { name: 'Mixed Fruits', canRemove: false },
      { name: 'Yogurt', canRemove: false },
      { name: 'Honey', canRemove: true },
    ],
    category: 'Drinks',
    imageUrl:
      'https://images.unsplash.com/photo-1494315153767-9c231f2dfe79?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8U21vb3RoaWV8ZW58MHx8MHx8fDA%3D',
  },

  // Salads (order 5)
  {
    name: 'Caesar Salad',
    price: 11.5,
    ingredients: [
      { name: 'Romaine Lettuce', canRemove: false },
      { name: 'Croutons', canRemove: true },
      { name: 'Caesar Dressing', canRemove: false },
    ],
    category: 'Salads',
    imageUrl:
      'https://images.unsplash.com/photo-1512852939750-1305098529bf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Q2Flc2FyJTIwU2FsYWR8ZW58MHx8MHx8fDA%3D',
  },
  {
    name: 'Greek Salad',
    price: 12.0,
    ingredients: [
      { name: 'Cucumbers', canRemove: false },
      { name: 'Tomatoes', canRemove: false },
      { name: 'Feta Cheese', canRemove: false },
    ],
    category: 'Salads',
    imageUrl:
      'https://plus.unsplash.com/premium_photo-1690561082636-06237f98bfab?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8R3JlZWslMjBTYWxhZHxlbnwwfHwwfHx8MA%3D%3D',
  },
  {
    name: 'Caprese Salad',
    price: 10.5,
    ingredients: [
      { name: 'Tomato', canRemove: false },
      { name: 'Mozzarella', canRemove: false },
      { name: 'Basil', canRemove: true },
    ],
    category: 'Salads',
    imageUrl:
      'https://plus.unsplash.com/premium_photo-1677619680730-b1d7311990f6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Q2FwcmVzZSUyMFNhbGFkfGVufDB8fDB8fHww',
  },
  {
    name: 'Spinach Salad',
    price: 10.0,
    ingredients: [
      { name: 'Spinach', canRemove: false },
      { name: 'Strawberries', canRemove: true },
      { name: 'Walnuts', canRemove: true },
    ],
    category: 'Salads',
    imageUrl:
      'https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8U3BpbmFjaCUyMFNhbGFkfGVufDB8fDB8fHww',
  },
  {
    name: 'Nicoise Salad',
    price: 13.0,
    ingredients: [
      { name: 'Tuna', canRemove: false },
      { name: 'Potatoes', canRemove: false },
      { name: 'Green Beans', canRemove: true },
    ],
    category: 'Salads',
    imageUrl:
      'https://images.unsplash.com/photo-1654171570628-e7a4602f56ad?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Tmljb2lzZSUyMFNhbGFkfGVufDB8fDB8fHww',
  },

  // Sandwiches (order 6)
  {
    name: 'BLT Sandwich',
    price: 9.0,
    ingredients: [
      { name: 'Bacon', canRemove: false },
      { name: 'Lettuce', canRemove: true },
      { name: 'Tomato', canRemove: true },
      { name: 'Mayonnaise', canRemove: true },
    ],
    category: 'Sandwiches',
    imageUrl:
      'https://images.unsplash.com/photo-1626920370508-cf4d8f916448?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8QkxUJTIwU2FuZHdpY2h8ZW58MHx8MHx8fDA%3D',
  },
  {
    name: 'Club Sandwich',
    price: 10.0,
    ingredients: [
      { name: 'Bacon', canRemove: false },
      { name: 'Lettuce', canRemove: true },
      { name: 'Tomato', canRemove: true },
      { name: 'Turkey', canRemove: false },
    ],
    category: 'Sandwiches',
    imageUrl:
      'https://plus.unsplash.com/premium_photo-1673809798692-494b974088a4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Q2x1YiUyMFNhbmR3aWNofGVufDB8fDB8fHww',
  },
  {
    name: 'Grilled Cheese Sandwich',
    price: 8.5,
    ingredients: [
      { name: 'Cheese', canRemove: false },
      { name: 'Bread', canRemove: false },
      { name: 'Butter', canRemove: false },
    ],
    category: 'Sandwiches',
    imageUrl:
      'https://images.unsplash.com/photo-1475090169767-40ed8d18f67d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fEdyaWxsZWQlMjBDaGVlc2UlMjBTYW5kd2ljaHxlbnwwfHwwfHx8MA%3D%3D',
  },
  {
    name: 'Chicken Wrap',
    price: 9.5,
    ingredients: [
      { name: 'Chicken', canRemove: false },
      { name: 'Lettuce', canRemove: true },
      { name: 'Tomato', canRemove: true },
      { name: 'Ranch Dressing', canRemove: true },
    ],
    category: 'Sandwiches',
    imageUrl:
      'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Q2hpY2tlbiUyMFdyYXB8ZW58MHx8MHx8fDA%3D',
  },
  {
    name: 'Vegetarian Sandwich',
    price: 9.0,
    ingredients: [
      { name: 'Hummus', canRemove: true },
      { name: 'Cucumbers', canRemove: true },
      { name: 'Sprouts', canRemove: true },
      { name: 'Whole Wheat Bread', canRemove: false },
    ],
    category: 'Sandwiches',
    imageUrl:
      'https://images.unsplash.com/photo-1509722747041-616f39b57569?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8VmVnZXRhcmlhbiUyMFNhbmR3aWNofGVufDB8fDB8fHww',
  },

  // Pizzas (order 7)
  {
    name: 'Margherita Pizza',
    price: 14.0,
    ingredients: [
      { name: 'Tomato Sauce', canRemove: false },
      { name: 'Mozzarella', canRemove: false },
      { name: 'Basil', canRemove: true },
    ],
    category: 'Pizzas',
    imageUrl:
      'https://images.unsplash.com/photo-1573821663912-6df460f9c684?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8TWFyZ2hlcml0YSUyMFBpenphfGVufDB8fDB8fHww',
  },
  {
    name: 'Pepperoni Pizza',
    price: 15.0,
    ingredients: [
      { name: 'Tomato Sauce', canRemove: false },
      { name: 'Mozzarella', canRemove: false },
      { name: 'Pepperoni', canRemove: true },
    ],
    category: 'Pizzas',
    imageUrl:
      'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8UGVwcGVyb25pJTIwUGl6emF8ZW58MHx8MHx8fDA%3D',
  },
  {
    name: 'Vegetarian Pizza',
    price: 13.5,
    ingredients: [
      { name: 'Bell Peppers', canRemove: true },
      { name: 'Olives', canRemove: true },
      { name: 'Onions', canRemove: true },
      { name: 'Mushrooms', canRemove: true },
    ],
    category: 'Pizzas',
    imageUrl:
      'https://plus.unsplash.com/premium_photo-1690056321981-dfe9e75e0247?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8VmVnZXRhcmlhbiUyMFBpenphfGVufDB8fDB8fHww',
  },
  {
    name: 'Hawaiian Pizza',
    price: 15.5,
    ingredients: [
      { name: 'Ham', canRemove: true },
      { name: 'Pineapple', canRemove: true },
      { name: 'Tomato Sauce', canRemove: false },
      { name: 'Mozzarella', canRemove: false },
    ],
    category: 'Pizzas',
    imageUrl:
      'https://images.unsplash.com/photo-1671572580758-fd91620a1c6d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8SGF3YWlpYW4lMjBQaXp6YXxlbnwwfHwwfHx8MA%3D%3D',
  },
  {
    name: 'BBQ Chicken Pizza',
    price: 16.0,
    ingredients: [
      { name: 'BBQ Sauce', canRemove: true },
      { name: 'Chicken', canRemove: true },
      { name: 'Red Onions', canRemove: true },
      { name: 'Mozzarella', canRemove: false },
    ],
    category: 'Pizzas',
    imageUrl:
      'https://plus.unsplash.com/premium_photo-1672498193372-2b91ef813252?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8QkJRJTIwQ2hpY2tlbiUyMFBpenphfGVufDB8fDB8fHww',
  },

  // Soups (order 8)
  {
    name: 'Tomato Soup',
    price: 8.0,
    ingredients: [
      { name: 'Tomatoes', canRemove: false },
      { name: 'Cream', canRemove: true },
      { name: 'Basil', canRemove: true },
    ],
    category: 'Soups',
    imageUrl:
      'https://plus.unsplash.com/premium_photo-1675727579542-ad785e1cee41?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8VG9tYXRvJTIwU291cHxlbnwwfHwwfHx8MA%3D%3D',
  },
  {
    name: 'Chicken Noodle Soup',
    price: 9.0,
    ingredients: [
      { name: 'Chicken', canRemove: false },
      { name: 'Noodles', canRemove: false },
      { name: 'Carrots', canRemove: true },
      { name: 'Celery', canRemove: true },
    ],
    category: 'Soups',
    imageUrl:
      'https://plus.unsplash.com/premium_photo-1664472752075-d5b2b3de0a88?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Q2hpY2tlbiUyME5vb2RsZSUyMFNvdXB8ZW58MHx8MHx8fDA%3D',
  },
  {
    name: 'Miso Soup',
    price: 7.5,
    ingredients: [
      { name: 'Miso Paste', canRemove: false },
      { name: 'Tofu', canRemove: true },
      { name: 'Seaweed', canRemove: true },
    ],
    category: 'Soups',
    imageUrl:
      'https://images.unsplash.com/photo-1436327266874-c2e4e1ac7a97?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8TWlzbyUyMFNvdXB8ZW58MHx8MHx8fDA%3D',
  },
  {
    name: 'Pumpkin Soup',
    price: 8.5,
    ingredients: [
      { name: 'Pumpkin', canRemove: false },
      { name: 'Cream', canRemove: true },
      { name: 'Nutmeg', canRemove: true },
    ],
    category: 'Soups',
    imageUrl:
      'https://images.unsplash.com/photo-1635146037526-a75e6905ad78?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8UHVtcGtpbiUyMFNvdXB8ZW58MHx8MHx8fDA%3D',
  },
  {
    name: 'Lentil Soup',
    price: 8.0,
    ingredients: [
      { name: 'Lentils', canRemove: false },
      { name: 'Carrots', canRemove: false },
      { name: 'Celery', canRemove: false },
      { name: 'Onions', canRemove: false },
    ],
    category: 'Soups',
    imageUrl:
      'https://images.unsplash.com/photo-1603355736640-34a2bee52da3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fExlbnRpbCUyMFNvdXB8ZW58MHx8MHx8fDA%3D',
  },

  // Side Dishes (order 9)
  {
    name: 'French Fries',
    price: 5.0,
    ingredients: [
      { name: 'Potatoes', canRemove: false },
      { name: 'Salt', canRemove: true },
    ],
    category: 'Side Dishes',
    imageUrl:
      'https://plus.unsplash.com/premium_photo-1672498329467-b27e2a97d29b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8RnJlbmNoJTIwRnJpZXN8ZW58MHx8MHx8fDA%3D',
  },
  {
    name: 'Onion Rings',
    price: 6.0,
    ingredients: [
      { name: 'Onions', canRemove: false },
      { name: 'Batter', canRemove: false },
      { name: 'Oil', canRemove: false },
    ],
    category: 'Side Dishes',
    imageUrl:
      'https://images.unsplash.com/photo-1645066803695-f0dbe2c33e42?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fE9uaW9uJTIwUmluZ3N8ZW58MHx8MHx8fDA%3D',
  },
  {
    name: 'Garlic Mashed Potatoes',
    price: 6.5,
    ingredients: [
      { name: 'Potatoes', canRemove: false },
      { name: 'Garlic', canRemove: false },
      { name: 'Butter', canRemove: false },
    ],
    category: 'Side Dishes',
    imageUrl:
      'https://images.unsplash.com/photo-1591299177061-2151e53fcaea?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8R2FybGljJTIwTWFzaGVkJTIwUG90YXRvZXN8ZW58MHx8MHx8fDA%3D',
  },
  {
    name: 'Coleslaw',
    price: 5.5,
    ingredients: [
      { name: 'Cabbage', canRemove: false },
      { name: 'Carrots', canRemove: false },
      { name: 'Mayonnaise', canRemove: false },
    ],
    category: 'Side Dishes',
    imageUrl:
      'https://plus.unsplash.com/premium_photo-1692781059226-cd75729787b6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Q29sZXNsYXd8ZW58MHx8MHx8fDA%3D',
  },
  {
    name: 'Steamed Vegetables',
    price: 7.0,
    ingredients: [
      { name: 'Broccoli', canRemove: true },
      { name: 'Carrots', canRemove: true },
      { name: 'Zucchini', canRemove: true },
    ],
    category: 'Side Dishes',
    imageUrl:
      'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fFN0ZWFtZWQlMjBWZWdldGFibGVzfGVufDB8fDB8fHww',
  },

  // Breakfast (order 10)
  {
    name: 'Pancakes',
    price: 9.0,
    ingredients: [
      { name: 'Flour', canRemove: false },
      { name: 'Eggs', canRemove: false },
      { name: 'Milk', canRemove: false },
      { name: 'Maple Syrup', canRemove: true },
    ],
    category: 'Breakfast',
    imageUrl:
      'https://images.unsplash.com/photo-1586985288123-2495f577c250?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8UGFuY2FrZXN8ZW58MHx8MHx8fDA%3D',
  },
  {
    name: 'Eggs Benedict',
    price: 11.0,
    ingredients: [
      { name: 'Poached Eggs', canRemove: false },
      { name: 'English Muffin', canRemove: false },
      { name: 'Ham', canRemove: true },
      { name: 'Hollandaise Sauce', canRemove: true },
    ],
    category: 'Breakfast',
    imageUrl:
      'https://images.unsplash.com/photo-1503442947665-4c7bb47d5daf?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZWdncyUyMGJlbmVkaWN0fGVufDB8fDB8fHww',
  },
  {
    name: 'Omelette',
    price: 10.0,
    ingredients: [
      { name: 'Eggs', canRemove: false },
      { name: 'Cheese', canRemove: true },
      { name: 'Vegetables', canRemove: true },
    ],
    category: 'Breakfast',
    imageUrl:
      'https://plus.unsplash.com/premium_photo-1667807521536-bc35c8d8b64b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8T21lbGV0dGV8ZW58MHx8MHx8fDA%3D',
  },
  {
    name: 'Avocado Toast',
    price: 9.5,
    ingredients: [
      { name: 'Avocado', canRemove: false },
      { name: 'Bread', canRemove: false },
      { name: 'Tomato', canRemove: true },
      { name: 'Egg', canRemove: true },
    ],
    category: 'Breakfast',
    imageUrl:
      'https://images.unsplash.com/photo-1704545229893-4f1bb5ef16a1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8QXZvY2FkbyUyMFRvYXN0fGVufDB8fDB8fHww',
  },
  {
    name: 'Breakfast Burrito',
    price: 10.5,
    ingredients: [
      { name: 'Eggs', canRemove: false },
      { name: 'Sausage', canRemove: true },
      { name: 'Peppers', canRemove: true },
      { name: 'Cheese', canRemove: true },
    ],
    category: 'Breakfast',
    imageUrl:
      'https://images.unsplash.com/photo-1711488735428-27c6757beb5c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8QnJlYWtmYXN0JTIwQnVycml0b3xlbnwwfHwwfHx8MA%3D%3D',
  },
];

module.exports = menuItems;

async function connectToDB() {
  try {
    await mongoose.connect(dbURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    // Drop MenuItem collection (if needed)
    await mongoose.connection.db.dropCollection('menu_items');

    console.log('Dropped MenuItem collection');

    for (let i = 0; i < menuItems.length; i++) {
      const menuItem = menuItems[i];

      // Find the corresponding MenuItemCategory by name
      const category = await MenuItemCategory.findOne({
        name: menuItem.category,
      });

      // If category is found, update menuItem's category to its _id
      if (category) {
        menuItem.category = category._id;
      } else {
        console.log(`Category '${menuItem.category}' not found.`);
        // You can handle this case based on your application's logic
        // For example, log an error, skip the item, or set a default category
      }
    }

    // Insert menu items into MongoDB
    await MenuItem.insertMany(menuItems);
    console.log('Menu items inserted successfully');

    // Disconnect after inserting data (optional)
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

// Call the function to connect and insert data
connectToDB();
