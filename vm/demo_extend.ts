import { AncView, v } from 'tinyts/core/tinyts';
import { TextView } from 'tinyts/control/text';

export class BaseModel extends AncView {

    @v(TextView)
    mErrorWarning: TextView;

    AfterInject() {
        this.mErrorWarning.SetValue("hhh");
    }
}
