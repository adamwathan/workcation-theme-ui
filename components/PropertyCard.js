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

function Svg({ children, viewBox, size, height, width, fill, ...props }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" {...props} viewBox={viewBox} css={{
      height: size !== undefined ? size : height,
      width: size !== undefined ? size : width,
      fill: 'currentColor',
      color: fill,
    }}>
      { children }
    </svg>
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

function Heading({ level, ...props }) {
  return (
    <Text tag={`h${level}`} {...props}/>
  )
}

function Image({ objectSize, objectPosition, alt = "", ...props}) {
  return (
    <img {...props} alt={alt} css={{
      ...objectSize !== undefined ? { objectSize } : {},
      ...objectPosition !== undefined ? { objectPosition } : {},
    }}/>
  )
}

export default function PropertyCard({ property }) {
  const formattedPrice = formatPrice(property.price)

  return (
    <Box>
      <AspectRatio ratio={6/5}>
        <Image src={ property.imageUrl } objectSize="cover" objectPosition="center" css={{
          borderRadius: 'lg',
          boxShadow: 'md',
        }}/>
      </AspectRatio>
      <Box px={4} mt={`-${theme.space[16]}`} css={{ position: 'relative' }}>
        <Box bg="white" p={4} css={{ borderRadius: 'lg', boxShadow: 'lg' }}>
          <Flex alignItems="baseline">
            <Badge color="teal">Plus</Badge>
            <Text size="xs" color="gray.600" weight="semibold" tracking="wide" uppercase css={{ ml: 2 }}>
              { property.beds } { property.beds === 1 ? 'bed' : 'beds' } &bull; { property.baths } { property.baths === 1 ? 'bath' : 'baths' }
            </Text>
          </Flex>
          <Heading level="4" color="gray.900" weight="semibold" size="lg" css={{ mt: 1 }}>
            { property.title }
          </Heading>
          <Box mt={1}>
            <Text color="gray.900">{ formattedPrice }</Text>
            <Text css={{ ml: 1}} size="sm" color="gray.600">/wk</Text>
          </Box>
          <Flex alignItems='center' mt={2}>
            {
              range(1, 6).map(i => (
                <Svg key={i} viewBox="0 0 24 24" size={4} fill={ property.rating >= i ? 'teal.500' : 'gray.400' }>
                  <path d="M8.128 19.825a1.586 1.586 0 0 1-1.643-.117 1.543 1.543 0 0 1-.53-.662 1.515 1.515 0 0 1-.096-.837l.736-4.247-3.13-3a1.514 1.514 0 0 1-.39-1.569c.09-.271.254-.513.475-.698.22-.185.49-.306.776-.35L8.66 7.73l1.925-3.862c.128-.26.328-.48.577-.633a1.584 1.584 0 0 1 1.662 0c.25.153.45.373.577.633l1.925 3.847 4.334.615c.29.042.562.162.785.348.224.186.39.43.48.704a1.514 1.514 0 0 1-.404 1.58l-3.13 3 .736 4.247c.047.282.014.572-.096.837-.111.265-.294.494-.53.662a1.582 1.582 0 0 1-1.643.117l-3.865-2-3.865 2z"/>
                </Svg>
              ))
            }
            <Text size="sm" color="gray.600" css={{ ml: 2 }}>{ property.reviewCount } reviews</Text>
          </Flex>
        </Box>
      </Box>
    </Box>
  )
}


