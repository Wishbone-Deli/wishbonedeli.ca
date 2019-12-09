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
    <div key={name}>
      <h4>{name}</h4>
      <h4>{price}</h4>
      {extraPrice && <h4>{price + extraPrice}</h4>}
      {description && <p>{description}</p>}
      {days && (
        <p>
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
      <h5>{name}</h5>
      <h5>{price}</h5>
    </div>
  );

  const buildPromo = ({ description }: Promo): ReactElement => (
    <div key={description}>
      <h3>{description}</h3>
    </div>
  );

  const buildCategory = ({
    name,
    description,
    items,
    addOns,
    promos,
  }: Category): ReactElement => (
    <div key={name}>
      <h3>{name}</h3>
      {promos && promos.map(buildPromo)}
      {description && <p>{description}</p>}
      {items.map(buildItem)}
      {addOns && addOns.map(buildAddOn)}
    </div>
  );

  return (
    <div>
      <h2>{name}</h2>
      {categories.map(buildCategory)}
    </div>
  );
};

export { Menu as default };
