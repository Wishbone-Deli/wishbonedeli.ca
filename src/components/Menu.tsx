import React, { FC, ReactElement } from 'react';
import moment from 'moment';

type MenuProps = Menu;

type Menu = {
  name: string;
  categories: Category[];
};

type Category = {
  name: string;
  description?: string;
  items: Item[];
  addOns?: AddOn[];
  promos?: Promo[];
};

type Item = {
  name: string;
  description?: string;
  price: number;
  extraPrice?: number;
  days?: number[];
};

type Promo = {
  description: string;
};

type AddOn = {
  name: string;
  price: number;
};

const Menu: FC<MenuProps> = ({ name, categories }: MenuProps) => {
  const buildItem = ({
    name,
    description,
    price,
    extraPrice,
    days,
  }: Item): ReactElement => (
    <div key={name} className="menu__item">
      <h4 className="menu__item-label menu__item-label--name">{name}</h4>
      {description && (
        <p className="menu__item-label menu__item-label--description">
          {description}
        </p>
      )}

      {extraPrice ? (
        <>
          <h4 className="menu__item-label menu__item-label--price">
            Small: {price.toFixed(2)}
          </h4>
          <h4 className="menu__item-label menu__item-label--price">
            Large: {(price + extraPrice).toFixed(2)}
          </h4>
        </>
      ) : (
        <h4 className="menu__item-label menu__item-label--price">
          {price.toFixed(2)}
        </h4>
      )}

      {days && (
        <p className="menu__item-label menu__item-label--description">
          Available on{' '}
          {days.map(
            day =>
              moment(day, 'e').format('dddd') +
              (days[days.length - 1] === day ? '.' : ', '),
          )}
        </p>
      )}

      {/* TODO: categorize by days for category that only have day-exclusive items */}
    </div>
  );

  const buildAddOn = ({ name, price }: AddOn): ReactElement => (
    <div key={name}>
      <h5 className="menu__item-label menu__item-label--name">{name}</h5>
      <h5 className="menu__item-label menu__item-label--price">
        {price.toFixed(2)}
      </h5>
    </div>
  );

  const buildPromo = ({ description }: Promo): ReactElement => (
    <h3
      key={description}
      className="menu__category-label menu__category-label--promo"
    >
      {description}
    </h3>
  );

  const buildCategory = ({
    name,
    description,
    items,
    addOns,
    promos,
  }: Category): ReactElement => (
    <section key={name} className="menu__category">
      <h3 className="menu__category-label menu__category-label--name">
        {name}
      </h3>

      {description && (
        <p className="menu__category-label menu__category-label--description">
          {description}
        </p>
      )}

      {items.map(buildItem)}

      {addOns && (
        <>
          <h3 className="menu__category-label menu__category-label--add-on">
            Add Ons
          </h3>
          {addOns.map(buildAddOn)}
        </>
      )}

      {promos && promos.map(buildPromo)}
    </section>
  );

  return (
    <section className="menu">
      <div className="container container--small">
        <h2 className="menu__title">{name}</h2>
        {categories.map(buildCategory)}
      </div>
    </section>
  );
};

export { Menu as default };
