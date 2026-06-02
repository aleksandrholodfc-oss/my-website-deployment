/** Image URLs for the website */
export const LOGO_SRC = '/images/logo.png';

export const UNSPLASH_IMAGES = {
  trade: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&q=80',
  industrial: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80',
  climate: 'https://images.unsplash.com/photo-1520699478448-3d1c8e4b2b0c?w=800&q=80',
  auto: 'https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=800&q=80',
  refrigerator: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=800&q=80',
  hero: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=1200&q=80',
};

export function placeholderImage(width: number, height: number): string {
  return `https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=${width}&h=${height}&fit=crop&q=80`;
}
