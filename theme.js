import resolveConfig from 'tailwindcss/resolveConfig'
import defaultConfig from 'tailwindcss/defaultConfig'
import flattenColorPal from 'tailwindcss/defaultConfig'
import { map, fromPairs, toPairs, values, isPlainObject } from 'lodash-es'

const resolvedTheme = resolveConfig(defaultConfig).theme

const tailwindSystemUi = {
  fonts: fromPairs(map(toPairs(resolvedTheme.fontFamily), ([ name, fonts ]) => [name, fonts.join(', ')])),
  fontSizes: resolvedTheme.fontSize,
  fontWeights: resolvedTheme.fontWeight,
  colors: fromPairs(map(toPairs(resolvedTheme.colors), ([name, colors]) => {
    return [
      name,
      colors,
    ]
  })),
  space: resolvedTheme.spacing,
  sizes: resolvedTheme.spacing,
  shadows: resolvedTheme.boxShadow,
  radii: resolvedTheme.borderRadius,
}

console.log(tailwindSystemUi)
export default tailwindSystemUi
