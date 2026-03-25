import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  price: string;
  image: string;
  tag: string;
  type: 'individual' | 'team';
}

export interface Trend {
  id: string;
  title: string;
  location: string;
  price: string;
  image: string;
  category: 'Corridas' | 'Torneios' | 'Treinos';
}

export const FEATURED_EVENTS: Event[] = [
  {
    id: '1',
    title: 'Maratona Internacional da Cidade',
    date: '15 OUT • 07:00',
    location: 'A prova mais esperada do ano. Percurso plano e recordes garantidos na orla.',
    price: 'R$ 120',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBQ33S_MFZhtLCAJOCfCT68KYxCl5UdK-r0JZ4LQ7EElWlUc3OdAstSl8r31WPgisxE-YEQj0pnNgW1fZtohGK68LDkJyrtwhIRLS6PrEL9iSKlMIROUYtaJ4FpB2DJlDnKMXOd38JnQh6A3L3EG45DjdMiXmV5i00xxDltCRu-EYhOm1B0t22ZVjcJW9gfwDOOlbnXPjgfE8NlM4xW4ucsVbX98E0tIG_6kC9ZuHrX6KaD--AvPjYpXmOz_PmXGZSrLuEhdNhhGb8',
    tag: 'Corrida',
    type: 'individual'
  },
  {
    id: '2',
    title: 'Z5 CrossFit Championship 2024',
    date: '22 NOV • 08:00',
    location: 'Teste seu condicionamento físico no maior campeonato de elite da região.',
    price: 'R$ 250',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAGQVST90wcva2BeImNJHR8CeoQe6G8q3zNACzxXJiMbvZDUscCSXE0PomKxoixhJjPmTLyBdg8IRNQwd1IIZ0D-Qg1sbld57Kg8GB3phcFYeZin5-kuPPJ9UZaRVNd-G_115340C0LCNUCeJPSXz2tpPu_qkPvl02o9DiwRafjXSpYOvFP2TtfVeEuu7D7lonuhZdiO9mvtmVuwGf6C4eIuBstKKaUx25PFdRNWJkMkfX0x_OU0BKkObH73Lo0JQ3c4e7ymuhbUN4',
    tag: 'CrossFit',
    type: 'individual'
  },
  {
    id: '3',
    title: 'Copa Z5 de Futebol Society',
    date: '10 DEZ • 19:00',
    location: 'Monte seu time e venha disputar o troféu de campeão da temporada.',
    price: 'R$ 800',
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1000&auto=format&fit=crop',
    tag: 'Futebol',
    type: 'team'
  }
];

export const TRENDS: Trend[] = [
  {
    id: '1',
    title: 'Desafio MTB Serra Azul',
    location: 'São Paulo • R$ 90',
    price: '90',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBQ33S_MFZhtLCAJOCfCT68KYxCl5UdK-r0JZ4LQ7EElWlUc3OdAstSl8r31WPgisxE-YEQj0pnNgW1fZtohGK68LDkJyrtwhIRLS6PrEL9iSKlMIROUYtaJ4FpB2DJlDnKMXOd38JnQh6A3L3EG45DjdMiXmV5i00xxDltCRu-EYhOm1B0t22ZVjcJW9gfwDOOlbnXPjgfE8NlM4xW4ucsVbX98E0tIG_6kC9ZuHrX6KaD--AvPjYpXmOz_PmXGZSrLuEhdNhhGb8',
    category: 'Corridas'
  },
  {
    id: '2',
    title: 'Circuito Beach Tennis',
    location: 'Rio de Janeiro • R$ 150',
    price: '150',
    image: 'https://images.unsplash.com/photo-1628891890467-b79f2c8ba9dc?q=80&w=1000&auto=format&fit=crop',
    category: 'Torneios'
  },
  {
    id: '3',
    title: 'King of the Court 3x3',
    location: 'Curitiba • R$ 120',
    price: '120',
    image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=1000&auto=format&fit=crop',
    category: 'Torneios'
  },
  {
    id: '4',
    title: 'Night Run Urban',
    location: 'Belo Horizonte • R$ 85',
    price: '85',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDZzFx6og6WvZ8BRVMZ6FUZ4tTOlLqAYe3zSqN9wlxund3EyRGYTAOK_G9pPmVv5gIK5ZgGBvVFfGigOoCfq2HOS93ZUDM4AkKxFhVavB9TaUX0ZaaKq3ucjMkfL2m2vfw4HQI2ZiCk7BVAGgEC4UFRe5hoy_UviRWK8HcHGXaZySz7h6CpPKMhWVA0DHg_3CrYLQAHcqvcbH1hFvDqcFeoWbqJO0sqXixqAsv88CKoV88qOyQpLxvcYZWmYxa01HzJgPhRzcNe8zc',
    category: 'Corridas'
  },
  {
    id: '5',
    title: 'Travessia Aquática Z5',
    location: 'Florianópolis • R$ 110',
    price: '110',
    image: 'https://images.unsplash.com/photo-1438029071396-1e831a7fa6d8?q=80&w=1000&auto=format&fit=crop',
    category: 'Corridas'
  }
];
