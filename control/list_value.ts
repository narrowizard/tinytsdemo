import { ListView } from 'tinyts/control/list';


export class ListValue<T> extends ListView<T>{

    onValueSet: (value) => void;

    LoadView(parent?: string | JQuery) {
        var succ = super.LoadView(parent);
        if (succ) {
            this.SetEventHandler("li", (obj) => {
                var id = $(obj.target).attr("data-id");
                this.SetValue(id);
            });
        }
        return succ;
    }

    Value(): any {
        return this.target.find(".active").attr("data-id");
    }

    SetValue(value) {
        this.target.find("li").removeClass("active");
        this.target.find(`li[data-id=${value}]`).addClass("active");
        this.Trigger("change");
        var v = mx(this.mData).where(it => it.Id == value).singleOrDefault();
        if (this.onValueSet) {
            this.onValueSet(v);
        }
    }

    SetData(data: T[]) {
        super.SetData(data);
        this.SetValue(data[0]["Id"]);
    }

}