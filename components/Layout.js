/** @jsx jsx */
import React from 'react'
import { jsx } from '@emotion/core'
import { Global} from '@emotion/core'
import { ThemeProvider } from 'theme-ui'
import theme from '../theme'

export default function Layout({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <Global
        styles={{
          'html': {
            boxSizing: 'border-box'
          },
          'body': {
            margin: 0,
          },
          '*': {
            boxSizing: 'inherit',
            '&::before': {
              boxSizing: 'inherit',
            },
            '&::after': {
              boxSizing: 'inherit',
            },
          },
        }}
      />
      {children}
    </ThemeProvider>
  )
}
