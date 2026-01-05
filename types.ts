
export type IntensityLevel = 'Critical' | 'Systemic' | 'High Margin' | 'Low Efficiency' | 'Regulatory';

export interface SWOTAnalysis {
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
}

export interface PainPoint {
  id: string;
  industry: string;
  title: string;
  intensity: IntensityLevel;
  description: string;
  reasoning: string;
  statistic: string;
  solution_idea: string;
  swot?: SWOTAnalysis;
  created_at?: string;
}

export interface GenerationConfig {
  isLoading: boolean;
  isScanning: boolean;
}
