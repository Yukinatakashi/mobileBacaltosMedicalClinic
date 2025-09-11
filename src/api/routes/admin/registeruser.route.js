const express = require('express');
const router = express.Router();
const { supabase } = require('../../../services/supabasefrontend.js');

// POST /api/register
router.post('/', async (req, res) => {
  try {
    const { email, password, role = 'patient' } = req.body;

    // Validate inputs
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }
    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }
    if (role !== 'patient') {
      return res.status(400).json({ error: 'Only patient role is allowed for public registration' });
    }

    // Create user in Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({ email, password });
    if (authError || !authData?.user) {
      if (authError?.message.includes('User already registered')) {
        return res.status(400).json({ error: 'Email is already registered' });
      }
      return res.status(400).json({ error: authError?.message || 'Failed to register user' });
    }

    const userId = authData.user.id;

    // Insert into users table
    const { data: userData, error: dbError } = await supabase
      .from('users')
      .insert([{ id: userId, email, role }])
      .select('id, email, role')
      .single();

    if (dbError) {
      // Clean up Supabase auth user if DB insert fails
      await supabase.auth.admin.deleteUser(userId).catch((deleteErr) => {
        console.error('Failed to clean up auth user:', deleteErr.message);
      });
      return res.status(500).json({ error: 'Failed to save user profile' });
    }

    res.status(201).json({
      message: 'User registered successfully',
      user: userData,
    });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ error: 'Unexpected server error' });
  }
});

module.exports = router;