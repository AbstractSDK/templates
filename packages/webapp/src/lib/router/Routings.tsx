/**
 * @note
 * for hook alternative of route element composition:
 * - https://reactrouter.com/docs/en/v6/upgrading/v5#use-useroutes-instead-of-react-router-config
 * - https://reactrouter.com/docs/en/v6/examples/route-objects
 *
 * might need to take notes on:
 * - https://reactrouter.com/docs/en/v6/upgrading/v5#note-on-link-to-values
 */

import React, { Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'

import RequireAuth from '~/lib/components/auth/RequireAuth'
import { AccountLayout } from '~/lib/layout/AccountLayout'
import Page404 from '~/lib/pages/404'

import { routes, privateRoutes, accountRoutes } from './routes'
import { useAbstractQueryClient } from '@abstract-money/abstract.js-react/lib/hooks'

const Routings = () => {
  const { data: test } = useAbstractQueryClient({ chainName: 'junotestnet' })

  console.log(test)
  return (
    <Suspense>
      <Routes>
        {routes.map((routeProps) => (
          <Route {...routeProps} key={routeProps.path as string} />
        ))}
        {privateRoutes.map(({ element, ...privateRouteProps }) => (
          <Route
            element={
              <RequireAuth
                redirectTo={`/login?redirectTo=${privateRouteProps.path}`}
              >
                {element}
              </RequireAuth>
            }
            {...privateRouteProps}
            key={`privateRoute-${privateRouteProps.path}`}
          />
        ))}
        <Route path="account/*" element={<AccountLayout />}>
          <Route
            path=":accountId/*"
            element={
              <Routes>
                {accountRoutes.map((routeProps) => (
                  <Route {...routeProps} key={routeProps.path as string} />
                ))}
              </Routes>
            }
          />
        </Route>
        <Route path="*" element={<Page404 />} />
      </Routes>
    </Suspense>
  )
}

export default Routings
