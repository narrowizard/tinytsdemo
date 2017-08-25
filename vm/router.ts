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

    AfterInject() {

        var r = new Router();

        r.AddAncViewRoute("/router1.html", Router1Demo);

        r.AddAncViewRoute("/router2.html", Router2Demo);

        this.r1.OnClick(() => {
            r.GoTo("/router1.html", "");
        });

        this.r2.OnClick(() => {
            r.GoTo("/router2.html", "");
        });

        r.SetContext({
            OnRouteChange: (url, data) => {
                HttpUtils.Get(url).then((data) => {
                    this.container.GetJQueryInstance().html(data.ResponseBody);
                });
            },
            OnRoutePopState: (state) => {
                HttpUtils.Get(state.url).then((data) => {
                    this.container.GetJQueryInstance().html(data.ResponseBody);
                });
            }
        })
    }
}

