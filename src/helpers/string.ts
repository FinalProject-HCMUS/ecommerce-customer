import { InputNumberProps } from 'antd/es/input-number'
import { isNumber } from 'lodash'

const NUMBER_THOUSAND_SEPARATOR_REGEX = /[^0-9,-]/g
// eslint-disable-next-line no-control-regex
const CONTROL_CHARACTERS_REGEX = /[\x01-\x1F]+/g

// refer this: https://stackoverflow.com/questions/2254185/regular-expression-for-formatting-numbers-in-javascript
const formatNumber = (value?: string | number | null) => {
  const strValue = String(value)
  const [integerPart, decimalPart = ''] = strValue.split('.')
  return integerPart.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.') + (strValue.includes('.') ? `,${decimalPart}` : '')
}

const formatPrice = (price: number | string | null | undefined, defaultValue: string = '') => {
  return formatNumber(isNumber(price) ? price : defaultValue)
}

const formatPriceFull = (price: number | string | null | undefined, defaultValue: string = '') => {
  return `${formatPrice(price, defaultValue)} ₫`
}

const parseNumber: InputNumberProps['parser'] = (value) => {
  return `${value}`.replace(/\.$/, ',').replace(NUMBER_THOUSAND_SEPARATOR_REGEX, '').replace(',', '.')
}

const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLocaleLowerCase()
}

const capitalJoin = (...args: Array<string>) => {
  return capitalize(args.join(' '))
}

const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

const removeSpecialCharacters = (str: string) => {
  return str.replace(/[^\w]/gi, '')
}

const removeNonPrintableCharacters = (str: string) => {
  return str.replace(CONTROL_CHARACTERS_REGEX, '')
}

export default {
  formatPrice,
  formatPriceFull,
  formatNumber,
  parseNumber,
  capitalJoin,
  capitalizeFirstLetter,
  removeSpecialCharacters,
  removeNonPrintableCharacters,
}
