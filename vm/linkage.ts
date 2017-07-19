import { AncView, v, s } from 'tinyts/core/tinyts';
import { LinkAge, DataAgent } from '../utils/link_age';
import { ListEditable } from '../control/list_editable';
import { ListView } from 'tinyts/control/list';
import { ListValue } from '../control/list_value';
import { LinkageService } from '../services/linkage';

class PosData {
    Name: string;
}

class CommonData {
    Name: string;
    Id: number;
}

class LinkAgeModel extends AncView {

    @v(ListEditable)
    mCurPos: ListEditable<PosData>;

    @v(ListValue)
    mGradeInfo: ListValue<CommonData>;

    @v(ListValue)
    mSubjectInfo: ListValue<CommonData>;

    @s(LinkageService)
    service: LinkageService;

    linkAge: LinkAge;

    AfterInject() {
        this.mGradeInfo.onValueSet = (value) => {
            this.mCurPos.ReplaceItem(0, value)
        };

        this.mSubjectInfo.onValueSet = (value) => {
            this.mCurPos.ReplaceItem(1, value)
        };

        this.mCurPos.SetData([]);
        this.mCurPos.AppendItem({ Name: "zhangsan" });
        this.mCurPos.AppendItem({ Name: "lisi" });
        this.mCurPos.AppendItem({ Name: "wangwu" });

        this.mCurPos.ReplaceItem(3, { Name: "zhaoliu" });

        this.linkAge = new LinkAge();
        this.linkAge.PushItem(new DataAgent(this.mGradeInfo, () => {
            return this.service.GradeData();
        }));
        this.linkAge.PushItem(new DataAgent(this.mSubjectInfo, (param) => {
            return this.service.SubjectData(param);
        }));
        this.linkAge.Run();
    }
}

var aa = new LinkAgeModel();