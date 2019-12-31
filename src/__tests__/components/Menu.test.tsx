import React from 'react';
import { render } from '@testing-library/react';
import Menu from '../../components/Menu';
import moment from 'moment';

describe('Menu', () => {
  const itemBase = { name: 'base item', price: 5 };
  const itemWithDescription = {
    name: 'description item',
    price: 10,
    description: 'I have a description',
  };
  const itemWithExtraPrice = {
    name: 'price tier item',
    price: 15,
    extraPrice: 5,
  };
  const itemWithDays = { name: 'special day item', price: 20, days: [2, 5] };
  const items = [
    itemBase,
    itemWithDescription,
    itemWithExtraPrice,
    itemWithDays,
  ];

  const categoryBase = {
    name: 'base category',
    items: [...items],
  };
  const categoryWithDescription = {
    name: 'descriptive category',
    description: 'my description',
    items: [...items],
  };
  const categoryWithAddOns = {
    name: 'add-on category',
    items: [...items],
    addOns: [
      { name: 'add on foo', price: 2 },
      { name: 'add on bar', price: 4 },
    ],
  };
  const categoryWithPromos = {
    name: 'discount category',
    items: [...items],
    promos: [
      {
        description: 'take off some amount',
      },
      {
        description: 'take off another amount',
      },
    ],
  };
  const categories = [
    categoryBase,
    categoryWithDescription,
    categoryWithAddOns,
    categoryWithPromos,
  ];

  const menuBase = {
    name: 'My Menu',
    categories: [...categories],
  };

  describe('menu', () => {
    it('displays its name', () => {
      const { getByText } = render(<Menu {...menuBase} />);
      expect(getByText(menuBase.name)).toBeDefined();
    });

    it('displays the correct amount of categories', () => {
      const { getByText } = render(<Menu {...menuBase} />);
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      expect(getByText(menuBase.name).parentNode!.childNodes).toHaveLength(
        menuBase.categories.length + 1,
      );
    });
  });

  describe('category', () => {
    it('displays its name', () => {
      const { getByText } = render(<Menu {...menuBase} />);
      expect(getByText(categoryBase.name)).toBeDefined();
    });

    it('displays its description', () => {
      const { getByText } = render(<Menu {...menuBase} />);
      expect(getByText(categoryWithDescription.description)).toBeDefined();
    });

    it('displays the correct amount of items', () => {
      const { getByText } = render(
        <Menu {...{ ...menuBase, categories: [categoryBase] }} />,
      );
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      expect(getByText(categoryBase.name).parentNode!.childNodes).toHaveLength(
        menuBase.categories[0].items.length + 1,
      );
    });

    it('displays the add ons', () => {
      const { getByText } = render(<Menu {...menuBase} />);
      categoryWithAddOns.addOns.forEach(addOn => {
        expect(getByText(addOn.name)).toBeDefined();
        expect(getByText(addOn.price.toFixed(2))).toBeDefined();
      });
    });

    it('displays the promos', () => {
      const { getByText } = render(<Menu {...menuBase} />);
      categoryWithPromos.promos.forEach(promo => {
        expect(getByText(promo.description)).toBeDefined();
      });
    });
  });

  describe('item', () => {
    it('displays its name', () => {
      const { getByText } = render(
        <Menu
          {...{
            ...menuBase,
            categories: [categoryBase],
          }}
        />,
      );
      expect(getByText(itemBase.name)).toBeDefined();
    });

    it('displays its description', () => {
      const { getByText } = render(
        <Menu
          {...{
            ...menuBase,
            categories: [{ ...categoryBase, items: [itemWithDescription] }],
          }}
        />,
      );
      expect(getByText(itemWithDescription.description)).toBeDefined();
    });

    it('displays its price', () => {
      const { getByText } = render(
        <Menu
          {...{
            ...menuBase,
            categories: [categoryBase],
          }}
        />,
      );
      expect(getByText(itemBase.price.toFixed(2))).toBeDefined();
    });

    it('displays the plus-size price', () => {
      const { getByText } = render(
        <Menu
          {...{
            ...menuBase,
            categories: [{ ...categoryBase, items: [itemWithExtraPrice] }],
          }}
        />,
      );
      expect(
        getByText(
          RegExp(
            (itemWithExtraPrice.price + itemWithExtraPrice.extraPrice).toFixed(
              2,
            ),
          ),
        ),
      ).toBeDefined();
    });

    it('displays the specialty days', () => {
      const { getByText } = render(
        <Menu
          {...{
            ...menuBase,
            categories: [{ ...categoryBase, items: [itemWithDays] }],
          }}
        />,
      );
      itemWithDays.days.forEach(day => {
        expect(
          getByText(RegExp(moment(day, 'e').format('dddd'))),
        ).toBeDefined();
      });
    });
  });
});
