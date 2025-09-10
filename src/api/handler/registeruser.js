const { supabase } = require('../../services/supabasefrontend.js');

const verifyAdmin = async (token) => {
  if (!token) throw new Error('No token provided');
  const { data: { user }, error } = await supabase.auth.getUser(token);
  if (error || !user) throw new Error('Invalid token');
  const { data: userData, error: roleError } = await supabase
    .from('users')
    .select('role')
    .eq('id', user.id)
    .single();
  if (roleError || userData?.role !== 'admin') {
    throw new Error('Forbidden: Admin access required');
  }
  return user;
};

const getCurrentUser = async (token) => {
  if (!token) throw new Error('No token provided');
  const { data: { user }, error } = await supabase.auth.getUser(token);
  if (error || !user) throw new Error('Invalid token');
  const { data, error: dbError } = await supabase
    .from('users')
    .select('id, email, role')
    .eq('id', user.id)
    .single();
  if (dbError || !data) throw new Error('Failed to fetch user details');
  return { id: data.id, email: data.email, role: data.role };
};

const listUsers = async (token, roleFilter = null) => {
  await verifyAdmin(token);
  let query = supabase.from('users').select('id, email, role, created_at');
  if (roleFilter) query = query.eq('role', roleFilter);
  const { data, error } = await query.order('created_at', { ascending: false });
  if (error) throw new Error('Failed to fetch users');
  return data;
};

const createUser = async (token, email, password, role) => {
  await verifyAdmin(token);
  if (!email || !password || !role) throw new Error('Email, password, and role are required');

  const validRoles = ['admin', 'doctor', 'receptionist'];
  if (!validRoles.includes(role)) throw new Error('Invalid role');

  // Step 1: Create user in Supabase Auth
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { role }, // store role in Auth metadata too
    },
  });

  if (authError || !authData?.user) {
    throw new Error(authError?.message || 'Failed to create user in authentication');
  }

  const userId = authData.user.id;

  try {
    // Step 2: Insert user into "users" table
    const { data, error } = await supabase
      .from('users')
      .insert([{ id: userId, email, role }])
      .select('id, email, role')
      .single();

    if (error) throw error;

    return { message: 'User created successfully', user: data };

  } catch (dbError) {
    // Step 3: Rollback Auth user if DB insert fails
    await supabase.auth.admin.deleteUser(userId);
    throw new Error(dbError.message || 'Failed to create user in database');
  }
};


const updateUser = async (token, userId, updates) => {
  await verifyAdmin(token);
  const updatePayload = {};
  if (updates.email) updatePayload.email = updates.email;
  if (updates.role) updatePayload.role = updates.role;
  if (Object.keys(updatePayload).length === 0) {
    throw new Error('No valid fields to update');
  }
  const { data, error } = await supabase
    .from('users')
    .update(updatePayload)
    .eq('id', userId)
    .select();
  if (error) throw new Error('Failed to update user');
  if (!data || data.length === 0) throw new Error('No user found to update');
  return data[0];
};

const deleteUser = async (token, userId) => {
  await verifyAdmin(token);

  // Step 1: Delete from DB first
  const { error: dbError } = await supabase
    .from('users')
    .delete()
    .eq('id', userId);

  if (dbError) throw new Error(dbError.message || 'Failed to delete user record');

  // Step 2: Delete from Auth
  const { error: authError } = await supabase.auth.admin.deleteUser(userId);
  if (authError) {
    throw new Error(authError.message || 'Failed to delete user from authentication');
  }

  return { message: 'User deleted successfully' };
};


module.exports = {
  verifyAdmin,
  getCurrentUser,
  listUsers,
  createUser,
  updateUser,
  deleteUser,
};


