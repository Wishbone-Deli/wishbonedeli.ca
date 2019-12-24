import React, { FC } from 'react';
import DailySpecials from './DailySpecials';
import ContactUs from './ContactUs';

const Home: FC = () => {
  const dailySpecials = {
    1: ['shepherds-pie'],
    2: ['sweet-sour-chicken'],
    3: ['quiche'],
    4: ['lasagna'],
    5: ['spicy-pork'],
  };
  const dailySoups = {
    1: ['beef-barley', 'corn-chowder', 'minestrone'],
    2: ['chicken-noodle', 'cream-of-mushroom'],
    3: ['beef-noodle', 'minestrone', 'cream-of-potato'],
    4: ['lemon-chicken-rice', 'cream-of-broccoli'],
    5: ['pea-and-ham', 'minestrone'],
  };

  return (
    <div>
      <header className="header">
        <div className="container">
          <div className="header__content">
            <h1 className="header__content-title">Fresh, down to its bone</h1>
            <h2 className="header__content-description">
              Serving you a supreme local deli experience in Kingston
            </h2>
          </div>
        </div>
      </header>

      <section className="section section--eat-in-overlay">
        <div className="section__flex container">
          <div>
            <h3 className="section__label section__label--subtitle">
              Sandwiches. Soups. The good stuff.
            </h3>
            <p className="section__label section__label--description section__label--over-overlay">
              From a hearty omelette for a warm breakfast to a toasty sandwich
              to go, there is a variety of mouth-watering food to choose from.
            </p>
          </div>
          <a
            href="./eat-in"
            className="btn btn--primary-color btn--flex-expand"
          >
            See our menu
          </a>
        </div>
      </section>
      <section className="section section--catering-overlay">
        <div className="section__flex container">
          <div>
            <h3 className="section__label section__label--subtitle">
              Catering for all occasions.
            </h3>
            <p className="section__label section__label--description section__label--over-overlay">
              Got mouths to feed? We got you covered with a huge assortment of
              freshly prepared trays for everyone.
            </p>
          </div>
          <a
            href="./catering"
            className="btn btn--primary-color btn--flex-expand"
          >
            Catering menu
          </a>
          <a
            href="#contact-us"
            className="btn btn--primary-color btn--flex-expand"
          >
            Request a quote
          </a>
        </div>
      </section>

      <section>
        <div className="container">
          <DailySpecials type="Specials" {...dailySpecials} />
          <DailySpecials type="Soups" {...dailySoups} />
        </div>
      </section>

      {/* TODO: gallery */}

      <ContactUs />
    </div>
  );
};

export { Home as default };
