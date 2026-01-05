
import { PainPoint } from './types';

export const INITIAL_PAIN_POINTS: PainPoint[] = [
  {
    id: '1',
    industry: 'Real Estate',
    title: 'Automated "Due Diligence" for Property Documents',
    intensity: 'Critical',
    // Property names updated to match types.ts
    description: 'Property managers and developers spend hundreds of hours manually verifying titles, liens, and zoning permits across multiple outdated government portals. The process is prone to human error, leading to million-dollar legal liabilities.',
    reasoning: 'High recurring cost for firms and zero specialized AI tools that aggregate fragmented municipal data. This is a "must-have" compliance spend rather than a "nice-to-have" utility.',
    statistic: '35% of property transaction delays are caused by manual document verification errors.',
    solution_idea: 'A centralized dashboard that uses OCR and API connectors to automate 80% of the property title search process.',
    swot: {
      strengths: ['Niche focus', 'High barrier to entry', 'Clear ROI'],
      weaknesses: ['Fragmented government data', 'Legal compliance hurdles'],
      opportunities: ['Expansion into insurance tech', 'B2B enterprise contracts'],
      threats: ['Government API updates', 'Large incumbent competitors']
    }
  },
  {
    id: '2',
    industry: 'Logistics',
    title: 'Smart Route Optimization for Small Maritime Fleets',
    intensity: 'High Margin',
    // Property names updated to match types.ts
    description: 'Small-scale boat operators and maritime delivery services in coastal regions (like Cadaqués) rely on manual radio communication and weather apps to plan routes. They lack real-time fuel-efficient routing tailored to small vessels.',
    reasoning: 'Current maritime software is designed for mega-freighters. Small operators are underserved and desperate for a cost-saving solution for rising fuel prices.',
    statistic: 'Small fleets lose up to 18% of their margin to inefficient fuel consumption and tidal delays.',
    solution_idea: 'A mobile-first maritime GPS that integrates local tide data and weather for coastal fleet optimization.',
    swot: {
      strengths: ['High user loyalty', 'Local data edge'],
      weaknesses: ['Limited market size per region', 'Connectivity at sea'],
      opportunities: ['Leasing to yacht clubs', 'Hardware integration'],
      threats: ['Global GPS players adding small boat modes']
    }
  },
  {
    id: '3',
    industry: 'Legal Tech',
    title: 'AI-Driven Contract Comparison for Freelancers',
    intensity: 'Systemic',
    // Property names updated to match types.ts
    description: 'Individual contractors and boutique agencies sign dozens of "Master Service Agreements" monthly without legal review. They often miss predatory indemnity clauses or unfavorable IP ownership terms.',
    reasoning: 'Lawyers are too expensive for 1-off contracts. A high-volume, low-cost automated "Red Flag" scanner creates massive value for the gig economy.',
    statistic: 'Over 60% of freelancers have signed contracts containing clauses they didn\'t fully understand.',
    solution_idea: 'A browser extension that instantly highlights high-risk legal terms in contracts and suggests fairer alternatives.',
    swot: {
      strengths: ['Low cost to serve', 'Scalable SaaS model'],
      weaknesses: ['Liability if AI misses a clause', 'User trust building'],
      opportunities: ['Partnership with Upwork/Fiverr', 'Template library'],
      threats: ['Free AI tools getting better at generic legal advice']
    }
  },
  {
    id: '4',
    industry: 'Healthcare',
    title: 'Automated Inventory Tracking for Private Clinics',
    intensity: 'Low Efficiency',
    // Property names updated to match types.ts
    description: 'Single-doctor practices and private clinics still use Excel or paper logs to track surgical supplies and high-value drugs. Stock-outs lead to canceled surgeries, while overstocking leads to expired waste.',
    reasoning: 'Healthcare systems are bloated; small clinics need lightweight, specialized tools that aren\'t part of complex, expensive ERP systems.',
    statistic: 'Average clinics waste $12k annually on expired medical supplies due to poor tracking.',
    solution_idea: 'A simple QR-code based mobile app that predicts reorder dates based on clinic schedule integration.',
    swot: {
      strengths: ['Essential utility', 'Recurring revenue'],
      weaknesses: ['Hardware dependency (QR/RFID)', 'HIPAA compliance'],
      opportunities: ['Integration with supply chain vendors', 'Multi-clinic management'],
      threats: ['Legacy EHR providers adding inventory modules']
    }
  },
  {
    id: '5',
    industry: 'E-commerce',
    title: 'Return-Policy Optimizer for Niche Boutiques',
    intensity: 'High Margin',
    // Property names updated to match types.ts
    description: 'Small Shopify boutiques struggle with the "Amazon Effect" where customers expect free returns, but the shipping costs eat 100% of the boutique\'s profit. They lack data on which products are "return-prone".',
    reasoning: 'Reducing return rates by even 5% can double the net profit of a small e-commerce brand.',
    statistic: 'Niche fashion boutiques see return rates as high as 40%, with shipping costs rising 12% YoY.',
    solution_idea: 'An analytics engine that identifies "serial returners" and high-risk products to dynamically adjust return offers.',
    swot: {
      strengths: ['Direct impact on bottom line', 'Easy Shopify integration'],
      weaknesses: ['Data privacy concerns', 'Platform dependency'],
      opportunities: ['Upsell to "Sustainable" returns', 'Retailer network'],
      threats: ['Shopify building native return analytics']
    }
  }
];
