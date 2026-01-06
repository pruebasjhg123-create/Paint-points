import { createClient } from '@supabase/supabase-js';

// Credenciales de Supabase desde variables de entorno
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

// Validación de seguridad
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    '⚠️ ERROR: Las credenciales de Supabase no están configuradas. ' +
    'Configura VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY en Vercel.'
  );
}

// Inicialización del cliente de Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Función de verificación
export const isSupabaseConfigured = () => {
  return supabaseUrl && supabaseAnonKey && !supabaseAnonKey.startsWith('sb_publishable');
};
