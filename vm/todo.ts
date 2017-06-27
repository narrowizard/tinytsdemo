import { AncView, v } from 'tinyts/core/tinyts';
import { ListView } from 'tinyts/control/list';
import { InputView } from "tinyts/control/input";

enum KeyCode {
    ENTER = 13
}

class TodoData {
    constructor(public Name: string) { }
}

class TodoDemo extends AncView {

    data: TodoData[];

    @v(ListView)
    list: ListView<TodoData>;

    @v(InputView)
    newItem: InputView;

    AfterInject() {
        this.newItem.On("keydown", (ev: JQueryKeyEventObject) => {
            if (ev.keyCode == KeyCode.ENTER) {
                this.data.push(new TodoData(this.newItem.Value()));
                this.newItem.SetValue("");
            }
        });


        this.list.SetEventHandler("li", (obj) => {
            var text = $(obj.target).text();
            for (var i = 0; i < this.data.length; i++) {
                if (this.data[i].Name == text) {
                    this.data.splice(i, 1);
                }
            }
        });

        this.data = [new TodoData("First"), new TodoData("Second")];
        // this.data.sort((a, b) => {
        //     var res = -1;
        //     if (a.Name < b.Name) {
        //         res = 1;
        //     }
        //     return res;
        // })
        // this.data.reverse();
        // console.log(this.data.splice(0, 1));
        // this.data.push(new TodoData("111"));
        // console.log(this.data.concat(new TodoData("111")));
        // this.data.pop();
        // this.data.shift();
        // this.data.unshift(new TodoData("111"));
    }

}

var aa = new TodoDemo();