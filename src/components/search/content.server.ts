import type { Block } from './types';

import * as fs from 'node:fs';
import * as path from 'node:path';

import {base} from '$app/paths';

const categories = [
    {
        slug: 'docs',
        label: null,
        href: (parts: Array<string>) =>
            parts.length > 1 ? `${base}/docs/components/${parts[0]}#${parts.slice(1).join('-')}` : `${base}/docs/components/${parts[0]}`
    },
];

function extractMeta(markdown: string) {
    const match = /---\r?\n([\s\S]+?)\r?\n---/.exec(markdown);
    const frontmatter = match?.[1];
    const body = markdown.slice(match?.[0].length);

    const metadata: Record<string, string> = {};
    frontmatter?.split('\n').forEach((pair) => {
        const i = pair.indexOf(':');
        metadata[pair.slice(0, i).trim()] = pair.slice(i + 1).trim();
    });

    return { metadata, body };
}

export function content() {
    const blocks: Array<Block> = [];

    for (const category of categories) {
        for (const file of fs.readdirSync('src/docs/02 - Components')) {
            const text = fs.readFileSync(path.join('src/docs/02 - Components', file), 'utf-8');
            const frontmatter = extractMeta(text);

            blocks.push({
                breadcrumbs: [file.replace('.md', '')],
                href: category.href([file.replace('.md', '')]),
                content: frontmatter.body.trim(),
                rank: parseInt(frontmatter.metadata.rank ?? '0')
            });
        }
    }

    return blocks;
}