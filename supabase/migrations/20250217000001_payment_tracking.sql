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

-- Create a single table for payment tracking
CREATE TABLE IF NOT EXISTS payment_tracking (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    initial_payment_paid BOOLEAN DEFAULT FALSE,
    total_amount DECIMAL(10,2) DEFAULT 0.00,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(user_id)
);

-- Drop existing triggers if they exist
DROP TRIGGER IF EXISTS update_payment_tracking_updated_at ON payment_tracking;
DROP TRIGGER IF EXISTS update_payments_updated_at ON payments;
DROP TRIGGER IF EXISTS update_payment_tracking ON payments;

-- Drop existing functions if they exist
DROP FUNCTION IF EXISTS update_updated_at_column();
DROP FUNCTION IF EXISTS handle_payment_update();

-- Create a trigger to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for both tables
CREATE TRIGGER update_payment_tracking_updated_at
    BEFORE UPDATE ON payment_tracking
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_payments_updated_at
    BEFORE UPDATE ON payments
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Create a function to handle payment updates
CREATE OR REPLACE FUNCTION handle_payment_update()
RETURNS TRIGGER AS $$
BEGIN
    -- If this is an initial payment ($29.99)
    IF NEW.amount = 29.99 AND NEW.payment_type = 'initial_commitment' THEN
        INSERT INTO payment_tracking (user_id, initial_payment_paid, total_amount)
        VALUES (NEW.user_id, TRUE, NEW.amount)
        ON CONFLICT (user_id) 
        DO UPDATE SET 
            initial_payment_paid = TRUE,
            total_amount = payment_tracking.total_amount + NEW.amount;
    -- If this is an additional payment
    ELSIF NEW.payment_type = 'additional_payment' THEN
        INSERT INTO payment_tracking (user_id, total_amount)
        VALUES (NEW.user_id, NEW.amount)
        ON CONFLICT (user_id) 
        DO UPDATE SET 
            total_amount = payment_tracking.total_amount + NEW.amount;
    END IF;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create a trigger to automatically update payment tracking
CREATE TRIGGER update_payment_tracking
    AFTER INSERT ON payments
    FOR EACH ROW
    EXECUTE FUNCTION handle_payment_update();

-- Add RLS policies for payments table
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view their own payments" ON payments;
DROP POLICY IF EXISTS "Users can insert their own payments" ON payments;
DROP POLICY IF EXISTS "Users can view their own payment tracking" ON payment_tracking;
DROP POLICY IF EXISTS "Users can update their own payment tracking" ON payment_tracking;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON payment_tracking;
DROP POLICY IF EXISTS "Enable update for authenticated users only" ON payment_tracking;

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

-- Add RLS policies for payment_tracking table
ALTER TABLE payment_tracking ENABLE ROW LEVEL SECURITY;

-- Policy to allow users to view their own payment tracking
CREATE POLICY "Users can view their own payment tracking"
    ON payment_tracking
    FOR SELECT
    USING (auth.uid() = user_id);

-- Policy to allow users to update their own payment tracking
CREATE POLICY "Users can update their own payment tracking"
    ON payment_tracking
    FOR UPDATE
    USING (auth.uid() = user_id);

-- Policy to allow users to insert their own payment tracking
CREATE POLICY "Users can insert their own payment tracking"
    ON payment_tracking
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Grant necessary permissions to the authenticated role
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT ALL ON payments TO authenticated;
GRANT ALL ON payment_tracking TO authenticated;

-- Grant necessary permissions to the service_role
GRANT USAGE ON SCHEMA public TO service_role;
GRANT ALL ON payments TO service_role;
GRANT ALL ON payment_tracking TO service_role; 