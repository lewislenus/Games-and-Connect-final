-- Migration to add payment_preference column to event_registrations table
ALTER TABLE event_registrations ADD COLUMN IF NOT EXISTS payment_preference TEXT DEFAULT 'pay_later';

-- Update any existing rows to have the default value
UPDATE event_registrations SET payment_preference = 'pay_later' WHERE payment_preference IS NULL;
