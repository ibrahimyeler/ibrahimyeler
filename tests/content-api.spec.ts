import { test, expect } from '@playwright/test';
import { loadProjects } from '../lib/projects';

test('published content is mapped; empty lists and outages never resurrect drafts', async () => {
  const original = global.fetch;
  try {
    global.fetch = async () => Response.json([{ slug: 'chessflutter', title: 'Chess from API', status: 'Published', image: '/images/chessflutter.webp', tags: ['Mobile', 'invalid'], features: ['Engine'] }, { title: 'Hidden', status: 'Draft' }]);
    const result = await loadProjects();
    expect(result.projects).toHaveLength(1);
    expect(result.projects[0]).toMatchObject({ name: 'Chess from API', tags: ['Mobile'], icon: 'chess' });
    global.fetch = async () => Response.json([]);
    expect(await loadProjects()).toEqual({ projects: [], unavailable: false });
    global.fetch = async () => { throw new Error('offline'); };
    expect(await loadProjects()).toEqual({ projects: [], unavailable: true });
  } finally { global.fetch = original; }
});

test('contact form sends to the API and reports success', async ({ page, baseURL }) => {
  test.skip(!baseURL || !['localhost', '127.0.0.1'].includes(new URL(baseURL).hostname), 'Message submission is only tested against the local fixture.');
  await page.goto('/');
  await page.getByRole('textbox', { name: 'Your name', exact: true }).fill('Local integration test');
  await page.getByRole('textbox', { name: 'Your email', exact: true }).fill('test@example.com');
  await page.locator('[name=message]').fill('Fixture message; never sent to the live service.');
  await page.getByRole('button', { name: 'Send', exact: true }).click();
  await expect(page.locator('.contact-note')).toContainText('Your message has been sent');
});
