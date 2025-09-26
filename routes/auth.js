const express = require('express')
const passport = require('passport')
const router = express.Router()

// Google OAuth routes
router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
)

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful authentication
    res.redirect('/')
  }
)

// Logout route
router.get('/logout', (req, res) => {
  req.logout(() => {
    res.redirect('/')
  })
})

// Check auth status
router.get('/status', (req, res) => {
  res.json({ 
    authenticated: req.isAuthenticated(),
    user: req.user 
  })
})

module.exports = router