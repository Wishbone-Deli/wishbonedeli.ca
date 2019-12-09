import React, { FC } from 'react';
import Menu from './Menu';

const cateringMenu = {
  name: 'Catering Menu',
  categories: [
    {
      name: 'Trays',
      description:
        'All of our trays are proudly made with freshly prepared ingredients.',
      items: [
        {
          name: 'Breakfast Tray',
          description: 'Banana bread and muffin served with assorted pastries.',
          price: 2.5,
        },
        {
          name: 'Fruit Tray',
          description:
            'Seasonal fresh fruit (honeydew, cantaloupe, pineapple, strawberries, and red & green grapes).',
          price: 3.49,
        },
        {
          name: 'Cheese and Fruit Tray',
          description:
            'Seasonal fresh fruit served with a selection of 5 Wilton cheese.',
          price: 4.39,
        },
        {
          name: 'Cheese and Cracker Tray',
          description:
            'Includes selection of 5 Wilton cheese, and decorated with red & green apples and red & green grapes.',
          price: 3.19,
        },
        {
          name: 'Cheese and Pickle Tray',
          description:
            'Selection of 5 Wilton cheese, complimented with green olives and sweet/dill mixed pickles.',
          price: 3.49,
        },
        {
          name: 'Vegetable and Dip Tray',
          description:
            'Garden crips broccoli, cauliflower, celery, carrots, and red & green peepers served with our tangy dip.',
          price: 2.89,
        },
        {
          name: 'Sandwich Tray',
          description:
            'Selection of lean roast beef, black forest ham, smoked turkey, Montreal-style smoke meat, egg salad, tuna salad, chicken salad, and veggie & cheese. Prepared with white/whole-wheat/marbled-rye bread.',
          price: 6.49,
        },
        {
          name: 'Soup',
          description:
            'Soup of the day served in a pot (requires a minimum order of 10 people).',
          price: 3.69,
        },
        {
          name: 'Dessert Tray',
          description:
            'Fudge/tiger browny, lemon, date, macaroon, and butter tart squares.',
          price: 2.09,
        },
        {
          name: 'Meat Tray',
          description:
            'Black forest ham, smoked tureky, lean roast beef, and Montreal-style smoked meat.',
          price: 4.49,
        },
        {
          name: 'Cold Buffet',
          description:
            'Includes the Meat Tray, the Cheese and Pickle Tray, the Dessert Tray, choices of 3 salads, and buttered rolls.',
          price: 16.49,
        },
      ],
    },
    {
      name: 'Salads',
      description: 'Our wide variety of freshly made salads.',
      items: [
        {
          name: 'Tossed Salad',
          price: 4.49,
        },
        {
          name: 'Fruit Salad',
          price: 3.99,
        },
        {
          name: 'Potato Salad',
          price: 3.99,
        },
        {
          name: 'Caesar Salad',
          price: 4.99,
        },
        {
          name: 'Pasta Salad',
          price: 3.99,
        },
      ],
    },
    {
      name: 'Drinks',
      description: 'Selection of wonderfully complementary drinks',
      items: [
        {
          name: 'Coffee and Tea',
          price: 1.65,
        },
        {
          name: 'Assorted Juice, Soft Drinks, and Water',
          price: 1.29,
        },
      ],
    },
  ],
};

const Catering: FC = () => <Menu {...cateringMenu} />;

export { Catering as default };
