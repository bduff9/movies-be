"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var type_graphql_1 = require("type-graphql");
var StatusType;
(function (StatusType) {
    StatusType["Owned"] = "Owned";
    StatusType["Selling"] = "Selling";
    StatusType["Waiting"] = "Waiting";
    StatusType["Wanted"] = "Wanted";
})(StatusType || (StatusType = {}));
type_graphql_1.registerEnumType(StatusType, {
    description: 'The current status of the movie item',
    name: 'StatusType',
});
exports.default = StatusType;
//# sourceMappingURL=StatusType.js.map