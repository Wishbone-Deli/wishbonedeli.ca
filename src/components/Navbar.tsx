import React, { FC, useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { config } from '@fortawesome/fontawesome-svg-core';
import ActiveLink from '../utils/ActiveLink';
import '../styles/style.scss';

config.autoAddCss = false;

const Navbar: FC = () => {
  const [burger, setBurger] = useState(false);

  const burgerToggle = (): void => {
    setBurger(!burger);
  };

  return (
    <nav>
      <div className="navbar">
        <div className="navbar__elements container">
          <Link href="/">
            <a className="navbar__link navbar__title">Wishbone Deli</a>
          </Link>
          <div className="navbar__hamburger" onClick={burgerToggle}>
            <FontAwesomeIcon icon={faBars} />
            {/* might need to use icon instead */}
          </div>
          <ul
            className={
              'navbar__links' + (burger ? ' navbar__hamburger-show' : '')
            }
          >
            <li>
              <ActiveLink activeClassName="navbar__link--active" href="/">
                <a className="navbar__link">Home</a>
              </ActiveLink>
            </li>
            <li>
              <ActiveLink
                activeClassName="navbar__link--active"
                href="/catering"
              >
                <a className="navbar__link">Catering Menu</a>
              </ActiveLink>
            </li>
            <li>
              <ActiveLink activeClassName="navbar__link--active" href="/eat-in">
                <a className="navbar__link">Eat-in Menu</a>
              </ActiveLink>
            </li>
            <li>
              <ActiveLink
                activeClassName="navbar__link--active"
                href="/contact-us"
              >
                <a className="navbar__link">Contact Us</a>
              </ActiveLink>
            </li>
          </ul>
        </div>
      </div>
      <div className="navbar__push"></div>
    </nav>
  );
};

export default Navbar;
