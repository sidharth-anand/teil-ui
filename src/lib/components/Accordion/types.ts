export type AccordionType = 'single' | 'multiple';

export type AccordionStoreType = {
    open: Array<any>;
    type: AccordionType;
    disabled: boolean;
}

export type AccordionItemStoreType = {
    value: any;
    open: boolean;
    disabled: boolean;
    id: string;
}