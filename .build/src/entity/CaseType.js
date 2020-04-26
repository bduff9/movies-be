"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var type_graphql_1 = require("type-graphql");
var CaseType;
(function (CaseType) {
    CaseType["Box"] = "Box";
    CaseType["Digibook"] = "Digibook";
    CaseType["Plain"] = "Plain";
    CaseType["Slipcover"] = "Slipcover";
    CaseType["Steelbook"] = "Steelbook";
})(CaseType || (CaseType = {}));
type_graphql_1.registerEnumType(CaseType, {
    description: 'The type of case the movie item is in',
    name: 'CaseType',
});
exports.default = CaseType;
//# sourceMappingURL=CaseType.js.map