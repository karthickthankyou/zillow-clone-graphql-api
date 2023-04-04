export const creds = [
  {
    uid: 'ZD2QcNtOF8gaJbHRYBYXrrp6rjK2',
    email: 'admin@email.com',
    name: 'The admin',
    password: '123456',
    returnSecureToken: true,
  },
  {
    uid: '7hNbxSbKEaZ9DiaVRpjytnSXwTp2',
    email: 'agent@email.com',
    name: 'Agent',
    password: '123456',
    returnSecureToken: true,
  },
  {
    uid: 'bR7DwzZbwfeYKqnc7GA54d5M7SV2',
    email: 'seller@email.com',
    name: 'Seller',
    password: '123456',
    returnSecureToken: true,
  },
  {
    uid: 'v9GqDGmZGChgW87JkGJtSFA3kDe2',
    email: 'buyer@email.com',
    name: 'Buyer',
    password: '123456',
    returnSecureToken: true,
  },
] as const

export const admins = creds.filter((cred) => cred.email.includes('admin'))
export const agents = creds.filter((cred) => cred.email.includes('agent'))
export const buyers = creds.filter((cred) => cred.email.includes('buyer'))
export const sellers = creds.filter((cred) => cred.email.includes('seller'))
