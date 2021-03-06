import { Localized } from 'fluent-react';
import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { isProduction } from '../../utility';
import URLS from '../../urls';

import './nav.css';

export default ({
  basePath,
  children,
  ...props
}: {
  basePath: string;
  [key: string]: any;
}) => (
  <nav {...props} className="nav-list">
    <Localized id="speak">
      <NavLink to={basePath + URLS.RECORD} exact />
    </Localized>
    <Localized id="datasets">
      <NavLink to={basePath + URLS.DATA} exact />
    </Localized>
    {!isProduction() && (
      <Localized id="languages">
        <NavLink to={basePath + URLS.LANGUAGES} exact />
      </Localized>
    )}
    <Localized id="profile">
      <NavLink to={basePath + URLS.PROFILE} exact />
    </Localized>
    {children}
  </nav>
);
