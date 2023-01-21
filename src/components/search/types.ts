export interface MapBlock {
    title: string;
    breadcrumbs: Array<string>;
	href: string;
	content: string;
}

export interface Block {
	breadcrumbs: Array<string>;
	href: string;
	content: string;
	rank: number;
}

export interface Tree {
	breadcrumbs: Array<string>;
	href: string;
	node: Block;
	children: Array<Tree>;
}