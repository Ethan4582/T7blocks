import { Metadata, ResolvingMetadata } from 'next'
 
export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://demo.t7blocks.xyz/sitemap.xml',
  }
}

export const dynamic = "force-static";
