import resolveConfig from 'tailwindcss/resolveConfig'
import defaultConfig from 'tailwindcss/defaultConfig'
import flattenColorPal from 'tailwindcss/defaultConfig'
import { map, fromPairs, toPairs, values, isPlainObject } from 'lodash-es'

const resolvedTheme = resolveConfig(defaultConfig).theme

const tailwindSystemUi = {
  fonts: fromPairs(map(toPairs(resolvedTheme.fontFamily), ([ name, fonts ]) => [name, fonts.join(', ')])),
  fontSizes: values(resolvedTheme.fontSize),
  fontWeights: values(resolvedTheme.fontWeight),
  colors: fromPairs(map(toPairs(resolvedTheme.colors), ([name, colors]) => {
    return [
      name,
      Array.isArray(colors) ? values(colors) : colors,
    ]
  })),
  space: values(resolvedTheme.spacing),
}

console.log(tailwindSystemUi)
export default tailwindSystemUi
