"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var type_graphql_1 = require("type-graphql");
var FormatType;
(function (FormatType) {
    FormatType["BluRay"] = "Blu-Ray";
    FormatType["DVD"] = "DVD";
    FormatType["Digital"] = "Digital";
    FormatType["UV"] = "UV";
    FormatType["UltraHD"] = "Ultra HD";
})(FormatType || (FormatType = {}));
type_graphql_1.registerEnumType(FormatType, {
    description: 'The format of the movie item',
    name: 'FormatType',
});
exports.default = FormatType;
//# sourceMappingURL=FormatType.js.map