var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
System.register("todo", ["tinyts/core/tinyts", "tinyts/control/list"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var tinyts_1, list_1, TodoData, TodoDemo, aa, _a;
    return {
        setters: [
            function (tinyts_1_1) {
                tinyts_1 = tinyts_1_1;
            },
            function (list_1_1) {
                list_1 = list_1_1;
            }
        ],
        execute: function () {
            TodoData = (function () {
                function TodoData(Name) {
                    this.Name = Name;
                }
                return TodoData;
            }());
            TodoDemo = (function (_super) {
                __extends(TodoDemo, _super);
                function TodoDemo() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                TodoDemo.prototype.AfterInject = function () {
                    this.data = [new TodoData("First"), new TodoData("Second")];
                };
                return TodoDemo;
            }(tinyts_1.AncView));
            __decorate([
                tinyts_1.v(list_1.ListView),
                __metadata("design:type", typeof (_a = typeof list_1.ListView !== "undefined" && list_1.ListView) === "function" && _a || Object)
            ], TodoDemo.prototype, "list", void 0);
            aa = new TodoDemo();
        }
    };
});
