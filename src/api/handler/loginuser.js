// src/api/handlers/loginuser.handler.js
const { supabase } = require('../../services/supabasebackend.js');

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    // Step 1: Auth check
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.toLowerCase().trim(),
      password: password.trim(),
    });

    if (error || !data?.user) {
      console.error('[loginuser.handler] Auth error:', error?.message || 'Unknown auth error');
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const user = data.user;

    // Step 2: Fetch user details from DB
    const { data: dbUser, error: roleError } = await supabase
      .from('users')
      .select('id, email, role')
      .eq('id', user.id)
      .single();

    if (roleError || !dbUser) {
      console.error('[loginuser.handler] DB fetch error:', roleError?.message || 'User not found in DB');
      // Don't reveal if it's a DB issue or auth issue for security
      return res.status(401).json({ error: 'Invalid email or password' });
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
    console.error('[loginuser.handler] Unexpected error:', err);
    return res.status(500).json({ error: 'Login failed' });
  }
};

module.exports = { loginUser };