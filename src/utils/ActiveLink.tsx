import { useRouter } from 'next/router';
import Link, { LinkProps } from 'next/link';
import React, { Children, FC, ReactElement } from 'react';

type ActiveLinkProps = LinkProps & {
  children: ReactElement;
  activeClassName: string;
};

const ActiveLink: FC<ActiveLinkProps> = ({
  children,
  activeClassName,
  ...props
}: ActiveLinkProps) => {
  const { pathname } = useRouter();
  const child = Children.only(children);

  const className =
    pathname === props.href
      ? `${child.props.className} ${activeClassName}`
      : child.props.className;

  return <Link {...props}>{React.cloneElement(child, { className })}</Link>;
};

export default ActiveLink;
