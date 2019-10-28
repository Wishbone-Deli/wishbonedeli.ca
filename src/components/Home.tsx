import React, { FC } from 'react';
import ContactUs from './ContactUs';

const Home: FC = () => {
  return (
    <div>
      <header>
        <div>
          <div>
            <h1>Fresh, down to its bone</h1>
            <h2>Serving you a supreme local deli experience in Kingston</h2>
          </div>
        </div>
      </header>

      <section>
        <div>
          <h3>Sandwiches. Soups. The good stuff.</h3>
          <p>
            From a hearty omelette for a warm breakfast to a toasty sandwich to
            go, there is a variety of mouth-watering food to choose from.
          </p>
          <button>See our menu</button>
        </div>
        <div>
          <h3>Catering for all occasions.</h3>
          <p>
            Got mouths to feed? We got you covered with a huge assortment of
            freshly prepared trays for everyone.
            <button>Catering menu</button>
            <button>Request a quote</button>
          </p>
        </div>
      </section>

      <section>
        <div>
          <div>
            <h3>Daily Special</h3>
            <h2>THE SPECIAL</h2>
          </div>
          <div>PICTURE HERE</div>
        </div>
        <div>
          <div>
            <h3>Daily Soups</h3>
            <h2>THE SOUP NAME 1</h2>
            <h2>THE SOUP NAME 2</h2>
          </div>
          <div>SOUP PICTURE 1</div>
          <div>SOUP PICTURE 2</div>
        </div>
      </section>

      <section>GALLERY</section>

      <ContactUs />
    </div>
  );
};

export { Home as default };
