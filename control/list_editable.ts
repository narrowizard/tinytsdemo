import { ListView } from 'tinyts/control/list';

export class ListEditable<T> extends ListView<T>{

    AppendItem(item: T) {
        this.mData.push(item);
    }

    ReplaceItem(index: number, item: T) {
        this.mData.splice(index, this.mData.length - index);
        this.mData.push(item);
    }
}