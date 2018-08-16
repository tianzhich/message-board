import md5 from 'md5'

export const getGravatar = (emailStr) => {
  return md5(emailStr.trim().toLowerCase());
}