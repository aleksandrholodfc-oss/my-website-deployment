import { render, screen } from '@testing-library/react';
import HomeClient from '../components/HomeClient';

// Mock Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} src={props.src} alt={props.alt} />;
  },
}));

// Mock content data
const mockContent = {
  hero: {
    title: 'Профессиональный ремонт холодильного оборудования',
    subtitle: 'Выезд мастера 24/7 в Иркутске и области',
    cta: 'Оставить заявку',
    phone: '+7 (914) 8866774',
    email: 'test@example.com',
  },
  contacts: {
    phone: '+7 (914) 8866774',
    email: 'test@example.com',
    address: 'Иркутск',
  },
  advantages: [],
  services: [],
  stats: [],
  testimonials: [],
  promotions: [],
  partners: [],
  guarantees: [],
  faq: [],
  blog: [],
  priceList: [],
};

describe('Home Page', () => {
  it('renders without crashing', () => {
    render(<HomeClient content={mockContent} />);
    expect(document.body).toBeInTheDocument();
  });
});
