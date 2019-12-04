import React, { FC } from 'react';
import moment from 'moment';

export type DailySpecialsProps = DailyMenu & {
  type: 'Specials' | 'Soups';
};

export type DailyMenu = {
  [index in '1' | '2' | '3' | '4' | '5']: Array<string>;
};

const DailySpecials: FC<DailySpecialsProps> = (props: DailySpecialsProps) => {
  const dayOfWeek = moment().day() as 0 | 1 | 2 | 3 | 4 | 5 | 6;
  // on saturday or sunday, set menu to monday's menu
  const menuToday =
    dayOfWeek !== 0 && dayOfWeek !== 6 ? props[dayOfWeek] : props[1];
  const subdir = props.type === 'Specials' ? 'specials' : 'soups';

  const titularize = (str: string): string =>
    str.replace(/-/g, ' ').toUpperCase();

  return (
    <div className="daily-specials">
      <h2 className="daily-specials__content daily-specials__content--title">
        Daily {props.type}
      </h2>
      {menuToday.map((item: string) => (
        <div
          key={item}
          className="daily-specials__content daily-specials__content--img-container"
        >
          <h3 className="daily-specials__content daily-specials__content--img-label">
            {titularize(item)}
          </h3>
          <img
            src={`./${subdir}/${item}.jpg`}
            alt={item}
            className="daily-specials__content daily-specials__content--img"
          />
        </div>
      ))}
    </div>
  );
};

export default DailySpecials;
