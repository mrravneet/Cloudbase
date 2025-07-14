import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://cmiddnvmgakvwuuubxyc.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNtaWRkbnZtZ2Frdnd1dXVieHljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI0OTY2NzIsImV4cCI6MjA2ODA3MjY3Mn0.m-fSAfnukNp6z9c3ehm_6W8jJqoglnB5CimgMv4ELU4'

export const supabase = createClient(supabaseUrl, supabaseKey) 