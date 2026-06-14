import fs from 'fs';
import path from 'path';
import { Redis } from '@upstash/redis';

import servicesDefault from '@/data/services.json';
import worksDefault from '@/data/works.json';
import pricingDefault from '@/data/pricing.json';
import jobsDefault from '@/data/jobs.json';
import settingsDefault from '@/data/settings.json';

/**
 * Content storage.
 *
 * - In production (Vercel) the filesystem is read-only, so content is stored in
 *   Upstash Redis (a.k.a. Vercel KV). Reads fall back to the JSON files bundled
 *   with the deploy, so the site never renders empty even before the first edit.
 * - In local development (no Redis credentials) we read/write the `data/*.json`
 *   files directly, keeping the original developer experience intact.
 */

const DATA_DIR = path.join(process.cwd(), 'data');

// Vercel KV and Upstash use slightly different env var names depending on how
// the store was provisioned; accept either.
const redisUrl = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const redisToken = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

const redis = redisUrl && redisToken ? new Redis({ url: redisUrl, token: redisToken }) : null;

// Bundled defaults, keyed by the filename callers already use.
const defaults: Record<string, unknown> = {
  'services.json': servicesDefault,
  'works.json': worksDefault,
  'pricing.json': pricingDefault,
  'jobs.json': jobsDefault,
  'settings.json': settingsDefault,
};

const keyOf = (fileName: string) => `ni:${fileName.replace(/\.json$/, '')}`;

export async function readData<T>(fileName: string): Promise<T> {
  if (redis) {
    const value = await redis.get<T>(keyOf(fileName));
    return (value ?? defaults[fileName]) as T;
  }

  const filePath = path.join(DATA_DIR, fileName);
  if (!fs.existsSync(filePath)) {
    return defaults[fileName] as T;
  }
  return JSON.parse(fs.readFileSync(filePath, 'utf-8')) as T;
}

export async function writeData<T>(fileName: string, data: T): Promise<void> {
  if (redis) {
    await redis.set(keyOf(fileName), data);
    return;
  }

  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  fs.writeFileSync(path.join(DATA_DIR, fileName), JSON.stringify(data, null, 2), 'utf-8');
}
