const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
  const header = req.headers.authorization

  if (!header?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authorization token is missing' })
  }

  const token = header.split(' ')[1]

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    next()
  } catch (error) {
    console.error('Auth middleware error:', error.message)
    return res.status(401).json({ message: 'Invalid or expired token' })
  }
}

module.exports = auth