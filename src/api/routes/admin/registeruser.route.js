const express = require('express');
const router = express.Router();
const { supabase } = require('../../../services/supabasefrontend.js');

// POST /register
router.post('/', async (req, res) => {
  try {
    const { email, password, role = 'patient' } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // 1. Create user in Supabase Auth (anon key is enough)
    const { data: authData, error: authError } = await supabase.auth.signUp({ email, password });
    if (authError || !authData?.user) {
      return res.status(400).json({ error: authError?.message || 'Failed to register user' });
    }

    const userId = authData.user.id;

    // 2. Insert into your custom users table
    const { data: userData, error: dbError } = await supabase
      .from('users')
      .insert([{ id: userId, email, role }])
      .select('id, email, role')
      .single();

    if (dbError) {
      return res.status(500).json({ error: 'Failed to save user profile' });
    }

    res.status(201).json({
      message: 'User registered successfully',
      user: userData,
    });

  } catch (err) {
    res.status(500).json({ error: err.message || 'Unexpected error' });
  }
});

module.exports = router;
