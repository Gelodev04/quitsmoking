-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can delete their own payment tracking" ON payment_tracking;
DROP POLICY IF EXISTS "Users can delete their own auth data" ON auth.users;

-- Add delete policy for payment_tracking table
CREATE POLICY "Users can delete their own payment tracking"
    ON payment_tracking
    FOR DELETE
    USING (auth.uid() = user_id);

-- Add delete policy for auth.users table
CREATE POLICY "Users can delete their own auth data"
    ON auth.users
    FOR DELETE
    USING (auth.uid() = id);

-- Grant delete permissions to authenticated users
GRANT DELETE ON payment_tracking TO authenticated;
GRANT DELETE ON auth.users TO authenticated; 