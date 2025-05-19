-- Create payments table if it doesn't exist
CREATE TABLE IF NOT EXISTS payments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    amount DECIMAL(10,2) NOT NULL,
    payment_id TEXT NOT NULL,
    status TEXT NOT NULL,
    payment_type TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create index on user_id for faster lookups
CREATE INDEX IF NOT EXISTS payments_user_id_idx ON payments(user_id);

-- Create index on payment_id for faster lookups
CREATE INDEX IF NOT EXISTS payments_payment_id_idx ON payments(payment_id);

-- Add RLS policies
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- Policy to allow users to view their own payments
CREATE POLICY "Users can view their own payments"
    ON payments
    FOR SELECT
    USING (auth.uid() = user_id);

-- Policy to allow users to insert their own payments
CREATE POLICY "Users can insert their own payments"
    ON payments
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Create trigger to update updated_at
CREATE TRIGGER update_payments_updated_at
    BEFORE UPDATE ON payments
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column(); 