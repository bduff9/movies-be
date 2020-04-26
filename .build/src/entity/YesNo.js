"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var type_graphql_1 = require("type-graphql");
var YesNo;
(function (YesNo) {
    YesNo["N"] = "N";
    YesNo["Y"] = "Y";
})(YesNo || (YesNo = {}));
type_graphql_1.registerEnumType(YesNo, {
    description: 'Yes or No flag',
    name: 'YesNo',
});
exports.default = YesNo;
//# sourceMappingURL=YesNo.js.map