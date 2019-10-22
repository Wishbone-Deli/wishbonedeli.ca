import React, { FC } from 'react';

const Footer: FC = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer>
      <div className="footer">
        Wishbone Delicatessen &copy; {currentYear}, All Rights Reserved
      </div>
    </footer>
  );
};

export default Footer;
