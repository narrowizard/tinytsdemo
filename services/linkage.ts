export class LinkageService {
    GradeData() {
        return new Promise((resolve, reject) => {
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
    }

    SubjectData(param) {
        return new Promise((resolve, reject) => {
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
    }


}