/** @jsx jsx */
import React from 'react'
import { jsx, Flex, Box } from 'theme-ui'
import theme from '../theme'
import { range } from 'lodash-es'

function formatPrice(cents) {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  })

  return formatter.format(cents / 100)
}

function AspectRatio({ ratio, children, ...props }) {
  return (
    <div {...props} css={{
      position: 'relative',
      pb: `${1 / ratio * 100}%`,
      '> *': {
        position: 'absolute',
        top: 0, right: 0, bottom: 0, left: 0,
        height: '100%',
        width: '100%',
      }
    }}>
      { children }
    </div>
  )
}

function Badge({ color, children, ...props }) {
  return (
    <span {...props} css={{
      display: 'inline-block',
      px: 2,
      py: 1,
      lineHeight: 1,
      bg: `${color}.200`,
      color: `${color}.800`,
      borderRadius: 'full',
      fontWeight: 'semibold',
      textTransform: 'uppercase',
      letterSpacing: 'wide',
      fontSize: 'xs',
    }}>
      { children }
    </span>
  )
}

function Text({ children, tag = 'span', size, color, weight, uppercase, tracking, ...props }) {
  const Tag = tag
  return (
    <Tag {...props} css={{
      ...size !== undefined ? { fontSize: size } : {},
      ...color !== undefined ? { color: color } : {},
      ...weight !== undefined ? { fontWeight: weight } : {},
      ...uppercase ? { textTransform: 'uppercase'} : {},
      ...tracking !== undefined ? { letterSpacing: tracking } : {},
    }}>
      { children }
    </Tag>
  )
}

export default function PropertyCard({ property }) {
  const formattedPrice = formatPrice(property.price)

  return (
    <div>
      <AspectRatio ratio={6/5}>
        <img css={{
          borderRadius: 'lg',
          boxShadow: 'md',
          objectSize: 'cover',
          objectPosition: 'center',
        }} src={ property.imageUrl } alt=""/>
      </AspectRatio>
      <div css={{
        position: 'relative',
        px: 4,
        mt: `-${theme.space[16]}`
      }}
      >
        <div css={{
          bg: 'white',
          borderRadius: 'lg',
          px: 4,
          py: 4,
          boxShadow: 'lg',
        }}>
          <Flex alignItems="baseline">
            <Badge color="teal">Plus</Badge>
            <Text size="xs" color="gray.600" weight="semibold" tracking="wide" uppercase css={{ ml: 2 }}>
              { property.beds } { property.beds === 1 ? 'bed' : 'beds' } &bull; { property.baths } { property.baths === 1 ? 'bath' : 'baths' }
            </Text>
          </Flex>
          <h4 css={{
            mt: 1,
            color: 'gray.900',
            fontWeight: 'semibold',
            fontSize: 'lg',
          }}>{ property.title }</h4>
          <div css={{ mt: 1 }}>
            <span css={{ color: 'gray.900' }}>{ formattedPrice }</span>
            <span css={{
              ml: 1,
              fontSize: 'sm',
              color: 'gray.600',
            }}>/wk</span>
          </div>
          <Flex
            alignItems='center'
            css={{
              mt: 2,
              fontSize: 'sm',
              color: 'gray.600',
            }}
          >
            {
              range(1, 6).map(i => (
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                  key={i}
                  css={{
                    height: 4,
                    width: 4,
                    fill: 'currentColor',
                    color: property.rating >= i ? 'teal.500' : 'gray.400',
                  }}
                >
                  <path d="M8.128 19.825a1.586 1.586 0 0 1-1.643-.117 1.543 1.543 0 0 1-.53-.662 1.515 1.515 0 0 1-.096-.837l.736-4.247-3.13-3a1.514 1.514 0 0 1-.39-1.569c.09-.271.254-.513.475-.698.22-.185.49-.306.776-.35L8.66 7.73l1.925-3.862c.128-.26.328-.48.577-.633a1.584 1.584 0 0 1 1.662 0c.25.153.45.373.577.633l1.925 3.847 4.334.615c.29.042.562.162.785.348.224.186.39.43.48.704a1.514 1.514 0 0 1-.404 1.58l-3.13 3 .736 4.247c.047.282.014.572-.096.837-.111.265-.294.494-.53.662a1.582 1.582 0 0 1-1.643.117l-3.865-2-3.865 2z"/>
                </svg>
              ))
            }
            <span css={{ ml: 2 }}>{ property.reviewCount } reviews</span>
          </Flex>
        </div>
      </div>
    </div>
  )
}
