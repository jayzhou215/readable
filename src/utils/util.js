import randomize from 'randomatic'
import serializeForm from 'form-serialize'

export function trim (str) {
  return str.length > 16
    ? str.slice(0, 16) + '...'
    : str
}

export function createUniquePostId() {
  return 'post-' + randomize('*', 10)
}

export function createUniqueKey() {
  return randomize('*', 10)
}

export function serialize(target) {
  return serializeForm(target, { hash: true })
}
