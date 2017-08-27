import randomize from 'randomatic'
import serializeForm from 'form-serialize'

export function trim (str) {
  return str.length > 16
    ? str.slice(0, 16) + '...'
    : str
}

export function createUniquePostId() {
  return randomize('aA0', 20)
}

export function createUniqueKey() {
  return randomize('*', 10)
}

export function serialize(target) {
  return serializeForm(target, { hash: true })
}

export function createUniqueCommentId() {
  return randomize('aA0', 20)
}

export function filterDeletedPostComments(postId, comments) {
  return comments.filter(comment => comment.parentId === postId && !comment.deleted && !comment.parentDeleted)
}
