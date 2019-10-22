import { useRouter } from 'next/router';
import Link, { LinkProps } from 'next/link';
import React, { Children, FC, ReactElement, cloneElement } from 'react';

export type ActiveLinkProps = LinkProps & {
  children: ReactElement;
  activeClassName: string;
};

/**
 * When next/router detects the component's link is the current route,
 * appends activeClassName to its child
 */
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

  return <Link {...props}>{cloneElement(child, { className })}</Link>;
};

export default ActiveLink;
