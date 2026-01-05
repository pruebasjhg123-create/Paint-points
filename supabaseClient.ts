
import { createClient } from '@supabase/supabase-js';

// Credenciales de Supabase
const supabaseUrl = 'https://pounvixeimxkzmundxbf.supabase.co';

/**
 * NOTA IMPORTANTE PARA EL DESARROLLADOR:
 * La clave que has proporcionado ('sb_publishable_...') es una clave de STRIPE, no de SUPABASE.
 * Esto causará que todas las peticiones a la base de datos fallen con error 401/403.
 * 
 * DEBES cambiar esta clave por la 'anon public' key que se encuentra en:
 * Supabase Dashboard -> Settings -> API -> Project API keys -> anon (public)
 */
const supabaseAnonKey = 'sb_publishable_seuiDao4XMXMRthe_X4NZg_qCInNUD8';

// Inicialización del cliente de Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Advertencia proactiva en consola para facilitar el depurado
if (supabaseAnonKey.startsWith('sb_publishable')) {
  console.error(
    "⚠️ ERROR CRÍTICO DE CONFIGURACIÓN en supabaseClient.ts:\n" +
    "Has configurado una clave de STRIPE ('sb_publishable...') en lugar de una clave de SUPABASE ('eyJ...').\n" +
    "La conexión a la base de datos fallará hasta que actualices la clave."
  );
}

export const isSupabaseConfigured = () => {
  return supabaseUrl && supabaseAnonKey && !supabaseAnonKey.startsWith('sb_publishable');
};
