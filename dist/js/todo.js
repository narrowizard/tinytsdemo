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
System.register("demo_extend", ["tinyts/core/tinyts", "tinyts/control/text"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var tinyts_1, text_1, BaseModel;
    return {
        setters: [
            function (tinyts_1_1) {
                tinyts_1 = tinyts_1_1;
            },
            function (text_1_1) {
                text_1 = text_1_1;
            }
        ],
        execute: function () {
            BaseModel = (function (_super) {
                __extends(BaseModel, _super);
                function BaseModel() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                BaseModel.prototype.AfterInject = function () {
                    this.mErrorWarning.SetValue("hhh");
                };
                __decorate([
                    tinyts_1.v(text_1.TextView),
                    __metadata("design:type", typeof (_a = typeof text_1.TextView !== "undefined" && text_1.TextView) === "function" && _a || Object)
                ], BaseModel.prototype, "mErrorWarning", void 0);
                return BaseModel;
                var _a;
            }(tinyts_1.AncView));
            exports_1("BaseModel", BaseModel);
        }
    };
});
System.register("demo", ["demo_extend", "tinyts/control/button", "tinyts/core/tinyts", "tinyts/control/input"], function (exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    var demo_extend_1, button_1, tinyts_2, input_1, DemoModel, aa;
    return {
        setters: [
            function (demo_extend_1_1) {
                demo_extend_1 = demo_extend_1_1;
            },
            function (button_1_1) {
                button_1 = button_1_1;
            },
            function (tinyts_2_1) {
                tinyts_2 = tinyts_2_1;
            },
            function (input_1_1) {
                input_1 = input_1_1;
            }
        ],
        execute: function () {
            DemoModel = (function (_super) {
                __extends(DemoModel, _super);
                function DemoModel() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                DemoModel.prototype.AfterInject = function () {
                    var _this = this;
                    _super.prototype.AfterInject.call(this);
                    this.model.Account = "account";
                    this.model.Password = "123456";
                    this.btn.OnClick(function () {
                        _this.model.Account = "accountChange";
                    });
                };
                __decorate([
                    tinyts_2.v(button_1.Button),
                    __metadata("design:type", typeof (_a = typeof button_1.Button !== "undefined" && button_1.Button) === "function" && _a || Object)
                ], DemoModel.prototype, "btn", void 0);
                __decorate([
                    tinyts_2.v(input_1.InputView),
                    __metadata("design:type", typeof (_b = typeof input_1.InputView !== "undefined" && input_1.InputView) === "function" && _b || Object)
                ], DemoModel.prototype, "mAccount", void 0);
                __decorate([
                    tinyts_2.v(input_1.InputView),
                    __metadata("design:type", typeof (_c = typeof input_1.InputView !== "undefined" && input_1.InputView) === "function" && _c || Object)
                ], DemoModel.prototype, "mPassword", void 0);
                return DemoModel;
                var _a, _b, _c;
            }(demo_extend_1.BaseModel));
            aa = new DemoModel();
        }
    };
});
System.register("todo", ["tinyts/core/tinyts", "tinyts/control/list", "tinyts/control/input"], function (exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    var tinyts_3, list_1, input_2, KeyCode, TodoData, TodoDemo, aa;
    return {
        setters: [
            function (tinyts_3_1) {
                tinyts_3 = tinyts_3_1;
            },
            function (list_1_1) {
                list_1 = list_1_1;
            },
            function (input_2_1) {
                input_2 = input_2_1;
            }
        ],
        execute: function () {
            (function (KeyCode) {
                KeyCode[KeyCode["ENTER"] = 13] = "ENTER";
            })(KeyCode || (KeyCode = {}));
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
                    var _this = this;
                    this.newItem.On("keydown", function (ev) {
                        if (ev.keyCode == KeyCode.ENTER) {
                            _this.data.push(new TodoData(_this.newItem.Value()));
                            _this.newItem.SetValue("");
                        }
                    });
                    this.list.SetEventHandler("li", function (obj) {
                        var text = $(obj.target).text();
                        for (var i = 0; i < _this.data.length; i++) {
                            if (_this.data[i].Name == text) {
                                _this.data.splice(i, 1);
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
                };
                __decorate([
                    tinyts_3.v(list_1.ListView),
                    __metadata("design:type", typeof (_a = typeof list_1.ListView !== "undefined" && list_1.ListView) === "function" && _a || Object)
                ], TodoDemo.prototype, "list", void 0);
                __decorate([
                    tinyts_3.v(input_2.InputView),
                    __metadata("design:type", typeof (_b = typeof input_2.InputView !== "undefined" && input_2.InputView) === "function" && _b || Object)
                ], TodoDemo.prototype, "newItem", void 0);
                return TodoDemo;
                var _a, _b;
            }(tinyts_3.AncView));
            aa = new TodoDemo();
        }
    };
});
