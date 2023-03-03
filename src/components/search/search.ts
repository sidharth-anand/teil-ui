import type { Index } from 'flexsearch';

import type { Block, MapBlock, Tree } from './types';

import flexsearch from 'flexsearch';

export let initialized = false;

const map: Map<string, MapBlock> = new Map();
const hrefs: Map<string, string> = new Map();

let indices: Array<Index<string>> = [];

function tree(breadcrumbs: Array<string>, blocks: Array<Block>): Tree {
    const depth = breadcrumbs.length;

    const node = blocks.find(block => {
        if (block.breadcrumbs.length !== depth) return false;
        return breadcrumbs.every((breadcrumb, i) => block.breadcrumbs[i] === breadcrumb);
    });

    const descendants = blocks.filter(block => {
        if (block.breadcrumbs.length <= depth) return false;
        return breadcrumbs.every((breadcrumb, i) => block.breadcrumbs[i] === breadcrumb);
    });

    const children: Array<string | undefined> = Array.from(new Set(descendants.map(block => block.breadcrumbs[depth])));

    return {
        breadcrumbs,
        href: hrefs.get(breadcrumbs.join('::')) ?? '',
        node: node as unknown as Block,
        children: children.map(part => tree([...breadcrumbs, part ?? ''], descendants))
    }
}

export function lookup(href: string): MapBlock | undefined {
    return map.get(href);
}

export function initialize(blocks: Array<Block>): void {
    if (initialized)
        return;

    const maxRank = Math.max(...blocks.map(block => block.rank ?? 0));
    // @ts-expect-error
    indices = Array.from({ length: maxRank + 1 }, () => new flexsearch({
        tokenize: 'forward'
    }));

    for (const block of blocks) {
        const title = block.breadcrumbs[block.breadcrumbs.length - 1];
        map.set(block.href, {
            title: title ?? '',
            href: block.href,
            breadcrumbs: block.breadcrumbs,
            content: block.content
        });

        indices[block.rank ?? 0]?.add(block.href, `${title} ${block.content}`);

        hrefs.set(block.breadcrumbs.join('::'), block.href);
    }
}

export function search(query: string): Array<Tree> {
    const escaped = query.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
    const regex = new RegExp(`(^|\\b)${escaped}`, 'i');

    const blocks = indices
        .map((index) => index.search(query))
        .flat()
        .map(lookup)
        .map((block, rank) => ({ block, rank }))
        .sort((a, b) => {
            const a_title_matches = regex.test(a.block?.title ?? '');
            const b_title_matches = regex.test(b.block?.title ?? '');

            // massage the order a bit, so that title matches
            // are given higher priority
            if (a_title_matches !== b_title_matches) {
                return a_title_matches ? -1 : 1;
            }

            return (a.block?.breadcrumbs.length ?? 0) - (b.block?.breadcrumbs.length ?? 0) || (a?.rank ?? 0) - (b?.rank ?? 0);
        })
        .map(({ block }) => block);

    return tree([], blocks as unknown as Block[]).children;
}