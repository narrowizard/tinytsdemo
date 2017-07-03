import { BaseModel } from './demo_extend';
import { Button } from 'tinyts/control/button';
import { v } from 'tinyts/core/tinyts';
import { InputView } from 'tinyts/control/input';

class DemoModel extends BaseModel {

    model: {
        Account: string;
        Password: string;
    };

    @v(Button)
    btn: Button;

    @v(InputView)
    mAccount: InputView;

    @v(InputView)
    mPassword: InputView;

    AfterInject() {
        super.AfterInject();

        this.model.Account = "account";
        this.model.Password = "123456";
        this.btn.OnClick(() => {
            this.model.Account = "accountChange";
        });
    }
}

var aa = new DemoModel();