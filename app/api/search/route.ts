import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q') || '';

  if (!query) {
    return NextResponse.json({ results: [] });
  }

  try {
    // Read content data
    const contentPath = path.join(process.cwd(), 'data', 'content.json');
    const contentData = await fs.readFile(contentPath, 'utf-8');
    const content = JSON.parse(contentData);

    const results: any[] = [];
    const lowerQuery = query.toLowerCase();

    // Search in services
    if (content.services) {
      content.services.forEach((service: any) => {
        if (
          service.category?.toLowerCase().includes(lowerQuery) ||
          service.description?.toLowerCase().includes(lowerQuery) ||
          service.items?.some((item: string) => item.toLowerCase().includes(lowerQuery))
        ) {
          results.push({
            type: 'service',
            title: service.category,
            description: service.description || '',
            url: `/services`,
            relevance: calculateRelevance(service.category, service.description, service.items, lowerQuery)
          });
        }
      });
    }

    // Search in hero section
    if (content.hero) {
      if (
        content.hero.title?.toLowerCase().includes(lowerQuery) ||
        content.hero.subtitle?.toLowerCase().includes(lowerQuery) ||
        content.hero.description?.toLowerCase().includes(lowerQuery)
      ) {
        results.push({
          type: 'page',
          title: 'Главная',
          description: content.hero.title || '',
          url: '/',
          relevance: calculateRelevance(content.hero.title, content.hero.description, [], lowerQuery)
        });
      }
    }

    // Search in about section
    if (content.about) {
      if (
        content.about.history?.toLowerCase().includes(lowerQuery) ||
        content.about.mission?.toLowerCase().includes(lowerQuery) ||
        content.about.serviceArea?.toLowerCase().includes(lowerQuery)
      ) {
        results.push({
          type: 'page',
          title: 'О компании',
          description: content.about.history || '',
          url: '/about',
          relevance: calculateRelevance(content.about.history, content.about.mission, [], lowerQuery)
        });
      }
    }

    // Search in advantages
    if (content.advantages) {
      content.advantages.forEach((adv: any) => {
        if (
          adv.title?.toLowerCase().includes(lowerQuery) ||
          adv.description?.toLowerCase().includes(lowerQuery)
        ) {
          results.push({
            type: 'advantage',
            title: adv.title,
            description: adv.description || '',
            url: '/',
            relevance: calculateRelevance(adv.title, adv.description, [], lowerQuery)
          });
        }
      });
    }

    // Search in FAQ
    if (content.faq) {
      content.faq.forEach((faq: any) => {
        if (
          faq.question?.toLowerCase().includes(lowerQuery) ||
          faq.answer?.toLowerCase().includes(lowerQuery)
        ) {
          results.push({
            type: 'faq',
            title: faq.question,
            description: faq.answer || '',
            url: '/',
            relevance: calculateRelevance(faq.question, faq.answer, [], lowerQuery)
          });
        }
      });
    }

    // Sort by relevance and return top results
    results.sort((a, b) => b.relevance - a.relevance);

    return NextResponse.json({ results: results.slice(0, 20) });
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json({ results: [] });
  }
}

function calculateRelevance(title: string, description: string, items: string[], query: string): number {
  let score = 0;
  const lowerTitle = title?.toLowerCase() || '';
  const lowerDescription = description?.toLowerCase() || '';
  const lowerItems = items?.map((i) => i.toLowerCase()) || [];

  // Title match gets highest score
  if (lowerTitle.includes(query)) score += 10;
  if (lowerTitle === query) score += 5;

  // Description match
  if (lowerDescription.includes(query)) score += 5;

  // Items match
  lowerItems.forEach((item) => {
    if (item.includes(query)) score += 3;
  });

  return score;
}
