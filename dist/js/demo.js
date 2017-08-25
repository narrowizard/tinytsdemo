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
System.register("vm/demo_extend", ["tinyts/core/tinyts", "tinyts/control/text"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var tinyts_1, text_1, BaseModel, _a;
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
                return BaseModel;
            }(tinyts_1.AncView));
            __decorate([
                tinyts_1.v(text_1.TextView),
                __metadata("design:type", typeof (_a = typeof text_1.TextView !== "undefined" && text_1.TextView) === "function" && _a || Object)
            ], BaseModel.prototype, "mErrorWarning", void 0);
            exports_1("BaseModel", BaseModel);
        }
    };
});
System.register("vm/demo", ["vm/demo_extend", "tinyts/control/button", "tinyts/core/tinyts", "tinyts/control/input"], function (exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    var demo_extend_1, button_1, tinyts_2, input_1, DemoModel, aa, _a, _b, _c;
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
                return DemoModel;
            }(demo_extend_1.BaseModel));
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
            aa = new DemoModel();
        }
    };
});
System.register("utils/link_age", [], function (exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    var DataAgent, LinkAge;
    return {
        setters: [],
        execute: function () {
            /**
             * DataAgent 数据代理类,负责管理所有数据的获取
             */
            DataAgent = (function () {
                function DataAgent(view, dataGetter) {
                    this.view = view;
                    this.dataGetter = dataGetter;
                    this.isPending = 0;
                }
                DataAgent.prototype.IsValueSet = function () {
                    return this.delayValue != null;
                };
                DataAgent.prototype.SetValue = function (value) {
                    if (isNaN(+value)) {
                        return;
                    }
                    this.delayValue = value;
                    if (this.isPending == 0) {
                        this.view.SetValue(value);
                    }
                    return this;
                };
                DataAgent.prototype.Value = function () {
                    return this.view.Value();
                };
                DataAgent.prototype.GetData = function (param, next) {
                    var me = this;
                    me.isPending++;
                    me.dataGetter(param).then(function (data) {
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
                };
                DataAgent.prototype.GetView = function () {
                    return this.view;
                };
                return DataAgent;
            }());
            exports_3("DataAgent", DataAgent);
            /**
             * LinkAge 多级联动
             */
            LinkAge = (function () {
                function LinkAge() {
                    this.LinkedView = [];
                }
                LinkAge.prototype.GetItem = function (index) {
                    if (index < 0 || index > this.LinkedView.length - 1) {
                        return null;
                    }
                    return this.LinkedView[index];
                };
                /**
                 * ClearAll 清除index及以后层级的所有数据
                 */
                LinkAge.prototype.ClearAll = function (index) {
                    if (index < 0 || index > this.LinkedView.length - 1) {
                        return;
                    }
                    for (var i = index; i < this.LinkedView.length; i++) {
                        this.LinkedView[i].GetView().SetData([]);
                    }
                };
                /**
                 * PushItem 添加多级联动元素
                 */
                LinkAge.prototype.PushItem = function (item) {
                    this.LinkedView.push(item);
                };
                /**
                 * Run 启动多级联动,请在设置了每一级的数据之后再调用
                 * 否则Run会自动设置每一级为默认第一个元素
                 */
                LinkAge.prototype.Run = function () {
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
                        me.LinkedView[i].GetView().On("change", function (obj) {
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
                };
                return LinkAge;
            }());
            exports_3("LinkAge", LinkAge);
        }
    };
});
System.register("control/list_editable", ["tinyts/control/list"], function (exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    var list_1, ListEditable;
    return {
        setters: [
            function (list_1_1) {
                list_1 = list_1_1;
            }
        ],
        execute: function () {
            ListEditable = (function (_super) {
                __extends(ListEditable, _super);
                function ListEditable() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                ListEditable.prototype.AppendItem = function (item) {
                    this.mData.push(item);
                };
                ListEditable.prototype.ReplaceItem = function (index, item) {
                    this.mData.splice(index, this.mData.length - index);
                    this.mData.push(item);
                };
                return ListEditable;
            }(list_1.ListView));
            exports_4("ListEditable", ListEditable);
        }
    };
});
System.register("control/list_value", ["tinyts/control/list"], function (exports_5, context_5) {
    "use strict";
    var __moduleName = context_5 && context_5.id;
    var list_2, ListValue;
    return {
        setters: [
            function (list_2_1) {
                list_2 = list_2_1;
            }
        ],
        execute: function () {
            ListValue = (function (_super) {
                __extends(ListValue, _super);
                function ListValue() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                ListValue.prototype.LoadView = function (parent) {
                    var _this = this;
                    var succ = _super.prototype.LoadView.call(this, parent);
                    if (succ) {
                        this.SetEventHandler("li", function (obj) {
                            var id = $(obj.target).attr("data-id");
                            _this.SetValue(id);
                        });
                    }
                    return succ;
                };
                ListValue.prototype.Value = function () {
                    return this.target.find(".active").attr("data-id");
                };
                ListValue.prototype.SetValue = function (value) {
                    this.target.find("li").removeClass("active");
                    this.target.find("li[data-id=" + value + "]").addClass("active");
                    this.Trigger("change");
                    var v = mx(this.mData).where(function (it) { return it.Id == value; }).singleOrDefault();
                    if (this.onValueSet) {
                        this.onValueSet(v);
                    }
                };
                ListValue.prototype.SetData = function (data) {
                    _super.prototype.SetData.call(this, data);
                    this.SetValue(data[0]["Id"]);
                };
                return ListValue;
            }(list_2.ListView));
            exports_5("ListValue", ListValue);
        }
    };
});
System.register("services/linkage", [], function (exports_6, context_6) {
    "use strict";
    var __moduleName = context_6 && context_6.id;
    var LinkageService;
    return {
        setters: [],
        execute: function () {
            LinkageService = (function () {
                function LinkageService() {
                }
                LinkageService.prototype.GradeData = function () {
                    return new Promise(function (resolve, reject) {
                        var data = [{
                                Name: "初一",
                                Id: 1
                            }, {
                                Name: "初二",
                                Id: 2
                            }, {
                                Name: "初三",
                                Id: 3
                            }, {
                                Name: "高一",
                                Id: 4
                            }, {
                                Name: "高二",
                                Id: 5
                            }, {
                                Name: "高三",
                                Id: 6
                            }];
                        resolve(data);
                    });
                };
                LinkageService.prototype.SubjectData = function (param) {
                    return new Promise(function (resolve, reject) {
                        var data = [{
                                Name: "数学",
                                Id: 1
                            }, {
                                Name: "物理",
                                Id: 2
                            }, {
                                Name: "化学",
                                Id: 3
                            }];
                        resolve(data);
                    });
                };
                return LinkageService;
            }());
            exports_6("LinkageService", LinkageService);
        }
    };
});
System.register("vm/linkage", ["tinyts/core/tinyts", "utils/link_age", "control/list_editable", "control/list_value", "services/linkage"], function (exports_7, context_7) {
    "use strict";
    var __moduleName = context_7 && context_7.id;
    var tinyts_3, link_age_1, list_editable_1, list_value_1, linkage_1, PosData, CommonData, LinkAgeModel, aa;
    return {
        setters: [
            function (tinyts_3_1) {
                tinyts_3 = tinyts_3_1;
            },
            function (link_age_1_1) {
                link_age_1 = link_age_1_1;
            },
            function (list_editable_1_1) {
                list_editable_1 = list_editable_1_1;
            },
            function (list_value_1_1) {
                list_value_1 = list_value_1_1;
            },
            function (linkage_1_1) {
                linkage_1 = linkage_1_1;
            }
        ],
        execute: function () {
            PosData = (function () {
                function PosData() {
                }
                return PosData;
            }());
            CommonData = (function () {
                function CommonData() {
                }
                return CommonData;
            }());
            LinkAgeModel = (function (_super) {
                __extends(LinkAgeModel, _super);
                function LinkAgeModel() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                LinkAgeModel.prototype.AfterInject = function () {
                    var _this = this;
                    this.mGradeInfo.onValueSet = function (value) {
                        _this.mCurPos.ReplaceItem(0, value);
                    };
                    this.mSubjectInfo.onValueSet = function (value) {
                        _this.mCurPos.ReplaceItem(1, value);
                    };
                    this.mCurPos.SetData([]);
                    this.mCurPos.AppendItem({ Name: "zhangsan" });
                    this.mCurPos.AppendItem({ Name: "lisi" });
                    this.mCurPos.AppendItem({ Name: "wangwu" });
                    this.mCurPos.ReplaceItem(3, { Name: "zhaoliu" });
                    this.linkAge = new link_age_1.LinkAge();
                    this.linkAge.PushItem(new link_age_1.DataAgent(this.mGradeInfo, function () {
                        return _this.service.GradeData();
                    }));
                    this.linkAge.PushItem(new link_age_1.DataAgent(this.mSubjectInfo, function (param) {
                        return _this.service.SubjectData(param);
                    }));
                    this.linkAge.Run();
                };
                return LinkAgeModel;
            }(tinyts_3.AncView));
            __decorate([
                tinyts_3.v(list_editable_1.ListEditable),
                __metadata("design:type", list_editable_1.ListEditable)
            ], LinkAgeModel.prototype, "mCurPos", void 0);
            __decorate([
                tinyts_3.v(list_value_1.ListValue),
                __metadata("design:type", list_value_1.ListValue)
            ], LinkAgeModel.prototype, "mGradeInfo", void 0);
            __decorate([
                tinyts_3.v(list_value_1.ListValue),
                __metadata("design:type", list_value_1.ListValue)
            ], LinkAgeModel.prototype, "mSubjectInfo", void 0);
            __decorate([
                tinyts_3.s(linkage_1.LinkageService),
                __metadata("design:type", linkage_1.LinkageService)
            ], LinkAgeModel.prototype, "service", void 0);
            aa = new LinkAgeModel();
        }
    };
});
System.register("vm/router1", ["tinyts/core/tinyts"], function (exports_8, context_8) {
    "use strict";
    var __moduleName = context_8 && context_8.id;
    var tinyts_4, Router1Demo;
    return {
        setters: [
            function (tinyts_4_1) {
                tinyts_4 = tinyts_4_1;
            }
        ],
        execute: function () {
            Router1Demo = (function (_super) {
                __extends(Router1Demo, _super);
                function Router1Demo() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                Router1Demo.prototype.AfterInject = function () {
                    console.log("router1 loaded!");
                };
                return Router1Demo;
            }(tinyts_4.AncView));
            exports_8("Router1Demo", Router1Demo);
        }
    };
});
System.register("vm/router2", ["tinyts/core/tinyts"], function (exports_9, context_9) {
    "use strict";
    var __moduleName = context_9 && context_9.id;
    var tinyts_5, Router2Demo;
    return {
        setters: [
            function (tinyts_5_1) {
                tinyts_5 = tinyts_5_1;
            }
        ],
        execute: function () {
            Router2Demo = (function (_super) {
                __extends(Router2Demo, _super);
                function Router2Demo() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                Router2Demo.prototype.AfterInject = function () {
                    console.log("router2 loaded!");
                };
                return Router2Demo;
            }(tinyts_5.AncView));
            exports_9("Router2Demo", Router2Demo);
        }
    };
});
System.register("vm/router", ["tinyts/core/tinyts", "tinyts/core/http", "tinyts/core/view", "tinyts/core/router", "tinyts/control/button", "vm/router1", "vm/router2"], function (exports_10, context_10) {
    "use strict";
    var __moduleName = context_10 && context_10.id;
    var tinyts_6, http_1, view_1, router_1, button_2, router1_1, router2_1, RouterDemo, _a, _b, _c;
    return {
        setters: [
            function (tinyts_6_1) {
                tinyts_6 = tinyts_6_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (view_1_1) {
                view_1 = view_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (button_2_1) {
                button_2 = button_2_1;
            },
            function (router1_1_1) {
                router1_1 = router1_1_1;
            },
            function (router2_1_1) {
                router2_1 = router2_1_1;
            }
        ],
        execute: function () {
            RouterDemo = (function (_super) {
                __extends(RouterDemo, _super);
                function RouterDemo() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                RouterDemo.prototype.AfterInject = function () {
                    var _this = this;
                    var r = new router_1.Router();
                    r.AddAncViewRoute("/router1.html", router1_1.Router1Demo);
                    r.AddAncViewRoute("/router2.html", router2_1.Router2Demo);
                    this.r1.OnClick(function () {
                        r.GoTo("/router1.html", "");
                    });
                    this.r2.OnClick(function () {
                        r.GoTo("/router2.html", "");
                    });
                    r.SetContext({
                        OnRouteChange: function (url, data) {
                            http_1.HttpUtils.Get(url).then(function (data) {
                                _this.container.GetJQueryInstance().html(data.ResponseBody);
                            });
                        },
                        OnRoutePopState: function (state) {
                            http_1.HttpUtils.Get(state.url).then(function (data) {
                                _this.container.GetJQueryInstance().html(data.ResponseBody);
                            });
                        }
                    });
                };
                return RouterDemo;
            }(tinyts_6.AncView));
            __decorate([
                tinyts_6.v(view_1.View),
                __metadata("design:type", typeof (_a = typeof view_1.View !== "undefined" && view_1.View) === "function" && _a || Object)
            ], RouterDemo.prototype, "container", void 0);
            __decorate([
                tinyts_6.v(button_2.Button),
                __metadata("design:type", typeof (_b = typeof button_2.Button !== "undefined" && button_2.Button) === "function" && _b || Object)
            ], RouterDemo.prototype, "r1", void 0);
            __decorate([
                tinyts_6.v(button_2.Button),
                __metadata("design:type", typeof (_c = typeof button_2.Button !== "undefined" && button_2.Button) === "function" && _c || Object)
            ], RouterDemo.prototype, "r2", void 0);
            exports_10("RouterDemo", RouterDemo);
        }
    };
});
System.register("vm/todo", ["tinyts/core/tinyts", "tinyts/control/list", "tinyts/control/input"], function (exports_11, context_11) {
    "use strict";
    var __moduleName = context_11 && context_11.id;
    var tinyts_7, list_3, input_2, KeyCode, TodoData, TodoDemo, aa, _a, _b;
    return {
        setters: [
            function (tinyts_7_1) {
                tinyts_7 = tinyts_7_1;
            },
            function (list_3_1) {
                list_3 = list_3_1;
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
                return TodoDemo;
            }(tinyts_7.AncView));
            __decorate([
                tinyts_7.v(list_3.ListView),
                __metadata("design:type", typeof (_a = typeof list_3.ListView !== "undefined" && list_3.ListView) === "function" && _a || Object)
            ], TodoDemo.prototype, "list", void 0);
            __decorate([
                tinyts_7.v(input_2.InputView),
                __metadata("design:type", typeof (_b = typeof input_2.InputView !== "undefined" && input_2.InputView) === "function" && _b || Object)
            ], TodoDemo.prototype, "newItem", void 0);
            aa = new TodoDemo();
        }
    };
});
