// src/api/handlers/loginuser.handler.js
const { supabase } = require('../../services/supabasebackend.js');

const loginUser = async (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    return res.status(400).json({ error: 'Email, password, and role are required' });
  }

  try {
    // Step 1: Auth check
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error || !data?.user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const user = data.user;

    // Step 2: Role check
    const { data: dbUser, error: roleError } = await supabase
      .from('users')
      .select('id, email, role')
      .eq('id', user.id)
      .single();

    if (roleError || !dbUser) {
      return res.status(403).json({ error: 'User role not found' });
    }

    if (dbUser.role !== role) {
      return res.status(403).json({ error: 'Unauthorized role' });
    }

    // Step 3: Return clean payload
    return res.status(200).json({
      message: 'Login successful',
      user: {
        id: dbUser.id,
        email: dbUser.email,
        role: dbUser.role,
      },
      session: data.session, // contains access_token & refresh_token
    });
  } catch (err) {
    console.error('[loginuser.handler] Error:', err);
    return res.status(500).json({ error: err.message || 'Login failed' });
  }
};

module.exports = { loginUser };
