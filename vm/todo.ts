import { AncView, v } from 'tinyts/core/tinyts';
import { ListView } from 'tinyts/control/list';

class TodoData {
    constructor(public Name: string) { }
}

class TodoDemo extends AncView {

    data: TodoData[];

    @v(ListView)
    list: ListView<TodoData>;

    AfterInject() {
        this.data = [new TodoData("First"), new TodoData("Second")];
    }

}

var aa = new TodoDemo();