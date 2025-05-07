import React from 'react';

const Link = ({ children, href, ...props }) => {
  return React.cloneElement(React.Children.only(children), { 
    href, 
    ...props
  });
};

Link.displayName = 'Link';
export default Link;
