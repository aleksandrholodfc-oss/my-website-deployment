import { render, screen } from '@testing-library/react';
import Home from '../app/page';

// Mock Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} src={props.src} alt={props.alt} />;
  },
}));

describe('Home Page', () => {
  it('renders without crashing', () => {
    render(<Home />);
    expect(document.body).toBeInTheDocument();
  });
});
