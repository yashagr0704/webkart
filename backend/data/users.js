import bcrypt from 'bcryptjs'
const users = [
  {
    name: 'Admin User',
    email: 'admin@bunny.com',
    password: bcrypt.hashSync('12345678', 10),
    isAdmin: true,
  }, {
    name: 'Roshan Gupta',
    email: 'roshan@bunny.com',
    password: bcrypt.hashSync('12345678', 10),
  }, {
    name: 'Shreyas Lingareddy',
    email: 'shreyas@bunny.com',
    password: bcrypt.hashSync('12345678', 10),
  },
]

export default users