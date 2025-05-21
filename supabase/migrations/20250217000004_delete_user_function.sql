-- Create a function to delete a user
CREATE OR REPLACE FUNCTION delete_user(user_id UUID)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Delete the user from auth.users
  DELETE FROM auth.users WHERE id = user_id;
END;
$$;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION delete_user TO authenticated; 