"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var type_graphql_1 = require("type-graphql");
var DigitalType;
(function (DigitalType) {
    DigitalType["DC"] = "DC";
    DigitalType["DCUV"] = "DC+UV";
    DigitalType["None"] = "None";
    DigitalType["UV"] = "UV";
})(DigitalType || (DigitalType = {}));
type_graphql_1.registerEnumType(DigitalType, {
    description: 'The digital movie format included, if any',
    name: 'DigitalType',
});
exports.default = DigitalType;
//# sourceMappingURL=DigitalType.js.map