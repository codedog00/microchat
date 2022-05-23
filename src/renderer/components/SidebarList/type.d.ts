
interface itemData {
    key: string,
}

interface groupListItem {
    count: number;
    name: string;
    itemList: Array<itemData>
}

interface ListData {
    [index: number] : itemData | groupListItem;
}

