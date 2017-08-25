import { AncView, v } from 'tinyts/core/tinyts';
import { routerInstance, HttpUtils } from "tinyts/core/http";
import { View } from "tinyts/core/view";
import { Button } from 'tinyts/control/button';

export class RouterDemo extends AncView {

    @v(View)
    container: View;

    @v(Button)
    r1: Button;

    @v(Button)
    r2: Button;

    AfterInject() {

        this.r1.OnClick(() => {
            routerInstance.GoTo("/router1.html", { r: 1 });
        });

        this.r2.OnClick(() => {
            routerInstance.GoTo("/router2.html", { r: 2 });
        });

        routerInstance.SetContext({
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

