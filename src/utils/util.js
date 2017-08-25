import randomize from 'randomatic'

export function trim (str) {
  return str.length > 16
    ? str.slice(0, 16) + '...'
    : str
}

export function createUniquePostId() {
  return 'post-' + randomize('*', 10)
}
