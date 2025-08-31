export function seedData() {
  const users = [
    { id: 'u-admin', email: 'admin@goatlogic.dev', role: 'admin', name: 'Admin', status: 'active' },
    { id: 'u-client-1', email: 'brand+client@demo.com', role: 'client', name: 'Acme Brand', status: 'active' },
    { id: 'u-marketer-1', email: 'sarah+marketer@demo.com', role: 'marketer', name: 'Sarah K.', status: 'active' }
  ]

  const marketers = [
    {
      id: 'm-1',
      userId: 'u-marketer-1',
      name: 'Sarah K.',
      category: 'Content Marketing',
      bio: 'I help tech brands grow with high-converting content.',
      services: ['Blog strategy', 'SEO articles', 'Newsletter'],
      tags: ['B2B', 'SaaS', 'SEO'],
      portfolio: [
        { title: 'Case Study: 3x signups', link: 'https://example.com/case1' },
        { title: 'Sample SEO Article', link: 'https://example.com/article1' }
      ],
      rating: 4.7
    },
    {
      id: 'm-2',
      userId: null,
      name: 'Kwame A.',
      category: 'Social Media',
      bio: 'IG/TikTok growth for lifestyle brands.',
      services: ['IG Reels', 'Influencer outreach', 'Community mgmt'],
      tags: ['Lifestyle', 'UGC', 'Ghana'],
      portfolio: [
        { title: 'Reels Campaign', link: 'https://example.com/reels' }
      ],
      rating: 4.5
    },
    {
      id: 'm-3',
      userId: null,
      name: 'Aisha B.',
      category: 'Paid Ads',
      bio: 'Meta + Google Ads that actually profit.',
      services: ['Meta Ads', 'Google Search', 'Landing pages'],
      tags: ['E‑commerce', 'ROAS', 'Funnel'],
      portfolio: []
    }
  ]

  const reviews = [
    { id: 'r-1', marketerId: 'm-1', userId: 'u-client-1', userName: 'Acme Brand', rating: 5, comment: 'Great results and communication!', createdAt: new Date().toISOString() },
    { id: 'r-2', marketerId: 'm-2', userId: 'u-client-1', userName: 'Acme Brand', rating: 4, comment: 'Solid growth over 6 weeks.', createdAt: new Date().toISOString() }
  ]

  return { users, marketers, reviews }
}
