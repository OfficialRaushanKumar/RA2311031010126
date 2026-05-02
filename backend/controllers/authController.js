const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const users = []
let nextId = 1

const isValidEmail = (email) => /^\S+@\S+\.\S+$/.test(email)

const createToken = (user) =>
  jwt.sign({ id: user.id, name: user.name, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: '1d'
  })

const sanitizeUser = (user) => ({
  id: user.id,
  name: user.name,
  email: user.email
})

const register = async (req, res) => {
  const { name, email, password } = req.body

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' })
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({ message: 'Enter a valid email address' })
  }

  if (password.length < 6) {
    return res.status(400).json({ message: 'Password must be at least 6 characters' })
  }

  const existingUser = users.find((user) => user.email === email.toLowerCase())
  if (existingUser) {
    return res.status(409).json({ message: 'User already exists' })
  }

  const hashedPassword = await bcrypt.hash(password, 10)
  const user = {
    id: nextId++,
    name: name.trim(),
    email: email.toLowerCase().trim(),
    password: hashedPassword
  }

  users.push(user)

  return res.status(201).json({
    message: 'User registered successfully',
    user: sanitizeUser(user)
  })
}

const login = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' })
  }

  const user = users.find((item) => item.email === email.toLowerCase().trim())
  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password' })
  }

  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) {
    return res.status(401).json({ message: 'Invalid email or password' })
  }

  const token = createToken(user)

  return res.status(200).json({
    message: 'Login successful',
    token,
    user: sanitizeUser(user)
  })
}

const profile = (req, res) => {
  return res.status(200).json({
    message: 'Profile loaded successfully',
    user: req.user
  })
}

module.exports = {
  register,
  login,
  profile,
  users
}