
import { supabase } from '../supabaseClient';
import { PainPoint } from '../types';

/**
 * Obtiene oportunidades de la base de datos de Supabase.
 * Si industry es undefined, trae una selección aleatoria global.
 */
export const fetchRandomOpportunities = async (industry?: string): Promise<PainPoint[]> => {
  if (!supabase) {
    throw new Error("Supabase client not initialized.");
  }

  try {
    // Selección de columnas exactas según el esquema SQL
    let query = supabase
      .from('pain_points')
      .select('id, industry, title, intensity, description, reasoning, statistic, solution_idea, swot, created_at');

    // Filtrado inteligente por sector o nicho
    if (industry && industry !== 'All') {
      const firstWord = industry.split(' ')[0];
      // Usamos el formato de filtro .or() de PostgREST
      query = query.or(`industry.ilike.%${industry}%,industry.ilike.%${firstWord}%`);
    }
    
    // Pool de registros para aleatoriedad
    const { data, error, status, statusText } = await query.limit(40);

    if (error) {
      // Logueamos el error detallado para que el usuario pueda verlo en la consola de forma legible
      console.error("Supabase Error Details:", {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code,
        status,
        statusText
      });
      // Devolvemos un array vacío para permitir que el sistema use el motor de IA como fallback
      return []; 
    }

    if (!data || data.length === 0) {
      return [];
    }
    
    // Barajamos y devolvemos el top 5 para mantener frescura visual
    return data
      .sort(() => Math.random() - 0.5)
      .slice(0, 5)
      .map((item: any) => ({
        ...item,
        id: String(item.id),
        intensity: item.intensity || 'High Margin',
        reasoning: item.reasoning || 'Identified workflow friction.',
        statistic: item.statistic || 'Significant market gap observed.',
        solution_idea: item.solution_idea || 'Develop a targeted automation solution.',
        swot: item.swot || {
          strengths: ['Early Mover Advantage'],
          weaknesses: ['Integration Costs'],
          opportunities: ['Market Expansion'],
          threats: ['Incumbent Response']
        }
      })) as PainPoint[];
  } catch (err: any) {
    console.error("fetchRandomOpportunities exception:", err);
    return []; // Fallback total en caso de excepción de red
  }
};
