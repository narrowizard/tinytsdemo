import { ListView } from 'tinyts/control/list';

/**
 * DataAgent 数据代理类,负责管理所有数据的获取
 */
export class DataAgent {

    protected delayValue;

    /**
     * 当前未完成的请求个数
     */
    protected isPending: number;

    constructor(protected view: ListView<any>, protected dataGetter: (param?: any) => Promise<any[]>) {
        this.isPending = 0;
    }

    IsValueSet(): boolean {
        return this.delayValue != null;
    }

    SetValue(value): DataAgent {
        if (isNaN(+value)) {
            return;
        }

        this.delayValue = value;
        if (this.isPending == 0) {
            this.view.SetValue(value);
        }
        return this;
    }

    Value(): any {
        return this.view.Value();
    }

    GetData(param, next: DataAgent[]) {
        var me = this;
        me.isPending++;
        me.dataGetter(param).then((data) => {
            // 设置自己的数据
            me.view.SetData(data);
            me.isPending--;
            if (me.delayValue && me.isPending == 0) {
                me.view.SetValue(me.delayValue);
                me.delayValue = null;
                // SetValue会导致触发本级的change事件,故不再调用下一级的获取数据方法
                return;
            }
            if (next && next[0]) {
                // 如果存在下一级,将本级的value作为参数获取下一级的Data
                next[0].GetData(me.view.Value(), next.slice(1));
            }
        });
    }

    GetView() {
        return this.view;
    }

}

/**
 * LinkAge 多级联动
 */
export class LinkAge {

    protected LinkedView: DataAgent[];

    constructor() {
        this.LinkedView = [];
    }

    GetItem(index: number): DataAgent {
        if (index < 0 || index > this.LinkedView.length - 1) {
            return null;
        }
        return this.LinkedView[index];
    }

    /**
     * ClearAll 清除index及以后层级的所有数据
     */
    ClearAll(index: number) {
        if (index < 0 || index > this.LinkedView.length - 1) {
            return;
        }
        for (var i = index; i < this.LinkedView.length; i++) {
            this.LinkedView[i].GetView().SetData([]);
        }
    }

    /**
     * PushItem 添加多级联动元素
     */
    PushItem(item: DataAgent) {
        this.LinkedView.push(item);
    }

    /**
     * Run 启动多级联动,请在设置了每一级的数据之后再调用
     * 否则Run会自动设置每一级为默认第一个元素
     */
    Run() {
        var me = this;

        if (this.LinkedView.length == 0) {
            console.error("LinkAge:items undefined!");
            return;
        }

        var item = this.LinkedView[0];
        // 获取第一级元素的值
        // if (item.IsValueSet()) {
        item.GetData(null, this.LinkedView.slice(1));
        // }

        // 注册事件
        for (var i = 0; i < me.LinkedView.length - 1; i++) {
            me.LinkedView[i].GetView().GetJQueryInstance().attr("linkage_bundle_id", i);
            me.LinkedView[i].GetView().On("change", (obj: JQueryEventObject) => {
                // 清空下面层级的所有数据
                var t = +$(obj.target).attr("linkage_bundle_id");
                // me.ClearAll(t + 1);
                var p = me.LinkedView[t].Value();
                if (!p) {
                    return;
                }
                me.LinkedView[t + 1].GetData(p, me.LinkedView.slice(t + 2));
            });
        }

    }

}