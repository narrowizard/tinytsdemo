import { AncView, v } from 'tinyts/core/tinyts';
import { routerInstance } from "tinyts/core/http";
import { View } from "tinyts/core/view";

export class Router2Demo extends AncView {

    AfterInject() {
        console.log("router2 loaded!");
    }
}
