import { AncView, v } from 'tinyts/core/tinyts';
import { routerInstance, HttpUtils } from "tinyts/core/http";
import { View } from "tinyts/core/view";
import { Router } from "tinyts/core/router";
import { Button } from 'tinyts/control/button';
import { Router1Demo } from './router1';
import { Router2Demo } from './router2';

export class RouterDemo extends AncView {

    @v(View)
    container: View;

    @v(Button)
    r1: Button;

    @v(Button)
    r2: Button;

    RouterFactory(v: { new (...args: any[]): AncView }) {
        return (state: { url: string, data: any }) => {
            HttpUtils.Get(state.url).then((data) => {
                this.container.GetJQueryInstance().html(data.ResponseBody);
                var aa = new v();
            });
        };
    }

    AfterInject() {

        var r = new Router();

        r.AddRouter("/router1.html", this.RouterFactory(Router1Demo));

        r.AddRouter("/router2.html", this.RouterFactory(Router2Demo));

        this.r1.OnClick(() => {
            r.GoTo("/router1.html", "");
        });

        this.r2.OnClick(() => {
            r.GoTo("/router2.html", "");
        });

    }
}

