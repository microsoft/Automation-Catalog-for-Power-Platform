// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { useRoutes } from 'react-router-dom';
import { HomePage } from './homePage/HomePage';
import SearchPage from './searchPage/SearchPage';
import { ItemDetailsPage } from './itemDetailsPage/ItemDetailsPage';
import AboutPage from './aboutPage/AboutPage';
import Settings from './settings/Settings';
import { Suspense } from 'react';
import { CenteredSpinner } from './centeredSpinner/centeredSpinner';
import { MyProfilePage } from './myProfilePage/MyProfilePage';

export const AHRouter = () => {
  const GetComponentWithSuspense = (component: JSX.Element) => {
    return <Suspense fallback={<CenteredSpinner />}>{component}</Suspense>;
  }

  return useRoutes([
    {
      element: <HomePage />,
      path: '*',
      id: 'home',
      index: true,
    },
    {
      element: GetComponentWithSuspense(<SearchPage allCards={[]} />),
      path: '/Search',
      id: 'search',
    },
    {
      element: GetComponentWithSuspense(<ItemDetailsPage />),
      path: '/ItemDetails',
      id: 'itemDetails',
    },
    {
      element: GetComponentWithSuspense(<AboutPage />),
      path: '/About',
      id: 'about',
    },
    {
      element: GetComponentWithSuspense(<Settings />),
      path: '/Settings',
      id: 'settings',
    },
    {
      element: GetComponentWithSuspense(<MyProfilePage />),
      path: '/MyProfile',
      id: 'myProfile',
    }
  ]);
};

