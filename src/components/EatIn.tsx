import React, { FC } from 'react';
import Menu from './Menu';

const eatInMenu = {
  name: 'Eat-In Menu',
  categories: [
    {
      name: 'Deli Sandwiches',
      description:
        'Choose from the following selection of breads: white, whole wheat, marbled rye, or Kaiser bun.',
      items: [
        {
          name: 'Black Forest Ham and Cheese',
          price: 6.99,
        },
        {
          name: 'Smoked Turkey Breast',
          price: 6.99,
        },
        {
          name: 'Montreal-style Smoked Meat',
          price: 6.99,
        },
        {
          name: 'Chicken Salad',
          price: 6.49,
        },
        {
          name: 'Tuna Salad',
          price: 6.49,
        },
        {
          name: 'Egg Salad',
          price: 5.39,
        },
        {
          name: 'Veggie and Cheese',
          price: 5.69,
        },
      ],
      addOns: [
        {
          name: 'Cheese',
          price: 0.5,
        },
      ],
      promos: [
        {
          description:
            'Get a bowl of small soup for $1 off ($2.49) when you buy a sandwich or a special!',
        },
        {
          description: 'Get half a sandwich for $1 less.',
        },
      ],
    },
    {
      name: 'Hot Sandwiches',
      description:
        'Choose from the following selection of breads: white, whole wheat, marbled rye, or Kaiser bun.',
      items: [
        {
          name: 'Schnitzel on a Kaiser',
          price: 7.49,
        },
        {
          name: 'Reuben',
          price: 7.49,
        },
        {
          name: 'Melt Sandwiches',
          price: 9.49,
        },
        {
          name: 'Grilled Cheese',
          price: 4.49,
        },
        {
          name: 'Turkey Club',
          price: 9.49,
        },
        {
          name: 'BLT',
          price: 6.79,
        },
        {
          name: 'Roast Beef on a Kaiser',
          price: 7.99,
          days: [2, 3, 4],
        },
      ],
      promos: [
        {
          description:
            'Get a bowl of small soup for $1 off ($2.49) when you buy a sandwich or a special!',
        },
        {
          description: 'Get half a sandwich for $1 less.',
        },
      ],
    },
    {
      name: 'Drinks',
      items: [
        { name: 'Soft Drinks', price: 1.2 },
        { name: 'Milk', price: 1.59, extraPrice: 1 },
        { name: 'Coffee', price: 1.65 },
        { name: 'Tea', price: 1.65 },
        { name: 'Juice', price: 1.59, extraPrice: 1 },
      ],
    },
    {
      name: 'Homemade Soups',
      description:
        'Choose from a rotating selections of creamy or brothy soups. Comes with a roll or crackers',
      items: [
        {
          name: 'Beef Barley',
          price: 3.49,
          extraPrice: 1,
          days: [1],
        },
        {
          name: 'Corn Chowder',
          price: 3.49,
          extraPrice: 1,
          days: [1],
        },
        {
          name: 'Minestrone',
          price: 3.49,
          extraPrice: 1,
          days: [1, 3, 5],
        },
        {
          name: 'Chicken Noodle',
          price: 3.49,
          extraPrice: 1,
          days: [2],
        },
        {
          name: 'Cream of Mushroom',
          price: 3.49,
          extraPrice: 1,
          days: [2],
        },
        {
          name: 'Beef Noodle',
          price: 3.49,
          extraPrice: 1,
          days: [3],
        },
        {
          name: 'Cream of Potato',
          price: 3.49,
          extraPrice: 1,
          days: [3],
        },
        {
          name: 'Lemon Chicken Rice',
          price: 3.49,
          extraPrice: 1,
          days: [4],
        },
        {
          name: 'Cream of Broccoli',
          price: 3.49,
          extraPrice: 1,
          days: [4],
        },
        {
          name: 'Pea and Ham',
          price: 3.49,
          extraPrice: 1,
          days: [5],
        },
      ],
    },
    {
      name: 'Goodies',
      items: [
        {
          name: 'Chips',
          price: 1.5,
        },
        {
          name: 'Squares',
          price: 2.25,
        },
        { name: 'Banana Bread', price: 1.5 },
        { name: 'Cookie', price: 2 },
      ],
    },
    {
      name: 'Breakfast',
      description: 'Served daily from 7:30 AM to 10:30 AM',
      items: [
        {
          name: 'Breakfast Special',
          description: 'Includes 2 eggs, bacon or ham, homefries, and toast',
          price: 6.49,
        },
        {
          name: '2 Eggs with Toast',
          price: 3.99,
        },
        {
          name: 'Breakfast Bun',
          description: 'English muffin with egg, cheese, and bacon or ham',
          price: 3.99,
        },
        {
          name: 'Western Sandwich',
          price: 5.49,
        },
        {
          name: 'Bacon Sandwich',
          price: 6.79,
        },
        {
          name: 'Toast and Jam',
          price: 2.29,
        },
        {
          name: 'Side Order of Home Fries',
          price: 3.29,
        },
        {
          name: 'Side Order of Bacon',
          price: 2.8,
        },
      ],
      promos: [
        {
          description: 'FREE coffee with the purchase of a breakfast item!',
        },
      ],
    },
    {
      name: 'Salads',
      description:
        'Choose from the following selection of dressings: French, Ranch, Thousand Island, Italian & Raspberry, or Balsamic Vinaigrette',
      items: [
        { name: 'Tossed Salad', price: 3 },
        { name: 'Caesar Salad', price: 4.99, extraPrice: 1 },
        // TODO: I don't think these prices are up-to-date
        { name: 'Potato Salad', price: 3.49, extraPrice: 2 },
        { name: 'Pasta Salad', price: 3.49, extraPrice: 2 },
        { name: 'Fruit Salad', price: 3.49, extraPrice: 2 },
        { name: 'Julienne Salad', price: 7.49 },
        {
          name: 'Salad Plate',
          description:
            'Includes your choice of slice deli meat or chicken, tuna or egg salad, cheese, pickle, bun and a choice of potato or pasta salad',
          price: 9.49,
        },
      ],
    },
    {
      name: 'Daily Specials',
      description: 'Available from 11:00 AM',
      items: [
        {
          name: "Shepherd's Pie",
          price: 8.99,
          days: [1],
        },
        {
          name: 'Sweet Sour Chicken',
          price: 8.99,
          days: [2],
        },
        {
          name: 'Quiche',
          price: 8.99,
          days: [3],
        },
        {
          name: 'Lasagna',
          price: 8.99,
          days: [4],
        },
        {
          name: 'Spicy Pork',
          price: 8.99,
          days: [5],
        },
      ],
      promos: [
        {
          description:
            'Get a bowl of small soup for $1 off ($2.49) when you buy a sandwich or a special!',
        },
      ],
    },
  ],
};

const EatIn: FC = () => <Menu {...eatInMenu} />;

export { EatIn as default };
