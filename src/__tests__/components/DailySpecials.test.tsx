import React from 'react';
import { render } from '@testing-library/react';
import moment from 'moment';
import DailySpecials from '../../components/DailySpecials';

describe('DailySpecials', () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let momentSpy: jest.SpyInstance;
  let currentDay: 0 | 1 | 2 | 3 | 4 | 5 | 6;

  const menu = {
    1: ['a', 'b'],
    2: ['b', 'c'],
    3: ['c', 'd'],
    4: ['d', 'e'],
    5: ['c', 'f'],
  };

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('special', () => {
    it('displays correct items', () => {
      currentDay = 4;
      momentSpy = jest
        .spyOn(moment.prototype, 'day')
        .mockReturnValue(currentDay);

      const { getAllByRole } = render(
        <DailySpecials type="Specials" {...menu} />,
      );
      const imgs = getAllByRole('img') as HTMLImageElement[];
      expect(imgs).toHaveLength(menu[currentDay].length);
      for (let i = 0; i < menu[currentDay].length; i++) {
        expect(imgs[i]).toHaveAttribute(
          'src',
          `./specials/${menu[currentDay][i]}.jpg`,
        );
        expect(imgs[i]).toHaveAttribute('alt', `${menu[currentDay][i]}`);
      }
    });

    it('displays Monday items on Saturday', () => {
      currentDay = 6;
      momentSpy = jest
        .spyOn(moment.prototype, 'day')
        .mockReturnValue(currentDay);
      const { getAllByRole } = render(
        <DailySpecials type="Specials" {...menu} />,
      );
      const imgs = getAllByRole('img') as HTMLImageElement[];
      expect(imgs).toHaveLength(menu[1].length);
      for (let i = 0; i < menu[1].length; i++) {
        expect(imgs[i]).toHaveAttribute('src', `./specials/${menu[1][i]}.jpg`);
        expect(imgs[i]).toHaveAttribute('alt', `${menu[1][i]}`);
      }
    });

    it('displays Monday items on Sunday', () => {
      currentDay = 0;
      momentSpy = jest
        .spyOn(moment.prototype, 'day')
        .mockReturnValue(currentDay);
      const { getAllByRole } = render(
        <DailySpecials type="Specials" {...menu} />,
      );
      const imgs = getAllByRole('img') as HTMLImageElement[];
      expect(imgs).toHaveLength(menu[1].length);
      for (let i = 0; i < menu[1].length; i++) {
        expect(imgs[i]).toHaveAttribute('src', `./specials/${menu[1][i]}.jpg`);
        expect(imgs[i]).toHaveAttribute('alt', `${menu[1][i]}`);
      }
    });
  });

  describe('soups', () => {
    it('displays correct items', () => {
      currentDay = 2;
      momentSpy = jest
        .spyOn(moment.prototype, 'day')
        .mockReturnValue(currentDay);

      const { getAllByRole } = render(<DailySpecials type="Soups" {...menu} />);
      const imgs = getAllByRole('img') as HTMLImageElement[];
      expect(imgs).toHaveLength(menu[currentDay].length);
      for (let i = 0; i < menu[currentDay].length; i++) {
        expect(imgs[i]).toHaveAttribute(
          'src',
          `./soups/${menu[currentDay][i]}.jpg`,
        );
        expect(imgs[i]).toHaveAttribute('alt', `${menu[currentDay][i]}`);
      }
    });

    it('displays Monday items on Saturday', () => {
      currentDay = 6;
      momentSpy = jest
        .spyOn(moment.prototype, 'day')
        .mockReturnValue(currentDay);
      const { getAllByRole } = render(<DailySpecials type="Soups" {...menu} />);
      const imgs = getAllByRole('img') as HTMLImageElement[];
      expect(imgs).toHaveLength(menu[1].length);
      for (let i = 0; i < menu[1].length; i++) {
        expect(imgs[i]).toHaveAttribute('src', `./soups/${menu[1][i]}.jpg`);
        expect(imgs[i]).toHaveAttribute('alt', `${menu[1][i]}`);
      }
    });

    it('displays Monday items on Sunday', () => {
      currentDay = 0;
      momentSpy = jest
        .spyOn(moment.prototype, 'day')
        .mockReturnValue(currentDay);
      const { getAllByRole } = render(<DailySpecials type="Soups" {...menu} />);
      const imgs = getAllByRole('img') as HTMLImageElement[];
      expect(imgs).toHaveLength(menu[1].length);
      for (let i = 0; i < menu[1].length; i++) {
        expect(imgs[i]).toHaveAttribute('src', `./soups/${menu[1][i]}.jpg`);
        expect(imgs[i]).toHaveAttribute('alt', `${menu[1][i]}`);
      }
    });
  });
});
