export interface Item {
    id: string;
    content: string;
}

export interface ColumnData {
    [key: string]: Item[];
}

export const initialData: ColumnData = {
    column1: Array.from({ length: 100 }, (_, index) => ({
        id: `item-${index + 1}-col1`,
        content: `Item ${index + 1} in Column 1`,
    })),
    column2: Array.from({ length: 100 }, (_, index) => ({
        id: `item-${index + 1}-col2`,
        content: `Item ${index + 1} in Column 2`,
    })),
    column3: Array.from({ length: 100 }, (_, index) => ({
        id: `item-${index + 1}-col3`,
        content: `Item ${index + 1} in Column 3`,
    })),
};
