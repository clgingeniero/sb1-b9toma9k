/*
  # Fix RLS policies for students and grades tables

  1. Changes
    - Drop existing restrictive policies
    - Create new policies that allow public access for testing
    
  2. Security Note
    - These policies are for development/testing
    - In production, you should restrict access based on user authentication
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Enable read access for authenticated users" ON students;
DROP POLICY IF EXISTS "Enable insert access for authenticated users" ON students;
DROP POLICY IF EXISTS "Enable update access for authenticated users" ON students;
DROP POLICY IF EXISTS "Enable delete access for authenticated users" ON students;

DROP POLICY IF EXISTS "Enable read access for authenticated users" ON grades;
DROP POLICY IF EXISTS "Enable insert access for authenticated users" ON grades;
DROP POLICY IF EXISTS "Enable update access for authenticated users" ON grades;
DROP POLICY IF EXISTS "Enable delete access for authenticated users" ON grades;

-- Create new policies for students table
CREATE POLICY "Enable access for all users" ON students
  FOR ALL
  TO public
  USING (true)
  WITH CHECK (true);

-- Create new policies for grades table
CREATE POLICY "Enable access for all users" ON grades
  FOR ALL
  TO public
  USING (true)
  WITH CHECK (true);