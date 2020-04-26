"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var class_validator_1 = require("class-validator");
var type_graphql_1 = require("type-graphql");
var typeorm_1 = require("typeorm");
var CaseType_1 = __importDefault(require("../entity/CaseType"));
var DigitalType_1 = __importDefault(require("../entity/DigitalType"));
var FormatType_1 = __importDefault(require("../entity/FormatType"));
var MovieItem_1 = require("../entity/MovieItem");
var StatusType_1 = __importDefault(require("../entity/StatusType"));
var YesNo_1 = __importDefault(require("../entity/YesNo"));
var CountMovieItems = /** @class */ (function () {
    function CountMovieItems() {
    }
    __decorate([
        type_graphql_1.Field({ nullable: true }),
        __metadata("design:type", String)
    ], CountMovieItems.prototype, "itemName", void 0);
    __decorate([
        type_graphql_1.Field(function () { return CaseType_1.default; }, { nullable: true }),
        __metadata("design:type", String)
    ], CountMovieItems.prototype, "caseType", void 0);
    __decorate([
        type_graphql_1.Field(function () { return DigitalType_1.default; }, { nullable: true }),
        __metadata("design:type", String)
    ], CountMovieItems.prototype, "digitalType", void 0);
    __decorate([
        type_graphql_1.Field(function () { return YesNo_1.default; }, { nullable: true }),
        __metadata("design:type", String)
    ], CountMovieItems.prototype, "is3D", void 0);
    __decorate([
        type_graphql_1.Field(function () { return YesNo_1.default; }, { nullable: true }),
        __metadata("design:type", String)
    ], CountMovieItems.prototype, "isWatched", void 0);
    __decorate([
        type_graphql_1.Field(function () { return FormatType_1.default; }, { nullable: true }),
        __metadata("design:type", String)
    ], CountMovieItems.prototype, "formatType", void 0);
    __decorate([
        type_graphql_1.Field(function () { return StatusType_1.default; }, { nullable: true }),
        __metadata("design:type", String)
    ], CountMovieItems.prototype, "itemStatus", void 0);
    __decorate([
        type_graphql_1.Field(function () { return Date; }, { nullable: true }),
        __metadata("design:type", Date)
    ], CountMovieItems.prototype, "releaseDate", void 0);
    CountMovieItems = __decorate([
        type_graphql_1.ArgsType()
    ], CountMovieItems);
    return CountMovieItems;
}());
var GetMovieItemsArgs = /** @class */ (function (_super) {
    __extends(GetMovieItemsArgs, _super);
    function GetMovieItemsArgs() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.limit = 25;
        _this.skip = 0;
        return _this;
    }
    __decorate([
        type_graphql_1.Field(function () { return type_graphql_1.Int; }, { defaultValue: 25 }),
        class_validator_1.Min(1),
        class_validator_1.Max(100),
        __metadata("design:type", Object)
    ], GetMovieItemsArgs.prototype, "limit", void 0);
    __decorate([
        type_graphql_1.Field(function () { return type_graphql_1.Int; }, { defaultValue: 0 }),
        class_validator_1.Min(0),
        __metadata("design:type", Object)
    ], GetMovieItemsArgs.prototype, "skip", void 0);
    __decorate([
        type_graphql_1.Field(function () { return [String, String]; }, { nullable: true }),
        __metadata("design:type", Array)
    ], GetMovieItemsArgs.prototype, "order", void 0);
    GetMovieItemsArgs = __decorate([
        type_graphql_1.ArgsType()
    ], GetMovieItemsArgs);
    return GetMovieItemsArgs;
}(CountMovieItems));
var AddMovieItemInput = /** @class */ (function () {
    function AddMovieItemInput() {
    }
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", String)
    ], AddMovieItemInput.prototype, "itemName", void 0);
    __decorate([
        type_graphql_1.Field(function () { return CaseType_1.default; }, { nullable: true }),
        __metadata("design:type", String)
    ], AddMovieItemInput.prototype, "caseType", void 0);
    __decorate([
        type_graphql_1.Field(function () { return DigitalType_1.default; }, { nullable: true }),
        __metadata("design:type", String)
    ], AddMovieItemInput.prototype, "digitalType", void 0);
    __decorate([
        type_graphql_1.Field(function () { return YesNo_1.default; }, { nullable: true }),
        __metadata("design:type", String)
    ], AddMovieItemInput.prototype, "is3D", void 0);
    __decorate([
        type_graphql_1.Field(function () { return YesNo_1.default; }, { nullable: true }),
        __metadata("design:type", String)
    ], AddMovieItemInput.prototype, "isWatched", void 0);
    __decorate([
        type_graphql_1.Field(function () { return FormatType_1.default; }, { nullable: true }),
        __metadata("design:type", String)
    ], AddMovieItemInput.prototype, "formatType", void 0);
    __decorate([
        type_graphql_1.Field(function () { return StatusType_1.default; }, { nullable: true }),
        __metadata("design:type", String)
    ], AddMovieItemInput.prototype, "itemStatus", void 0);
    __decorate([
        type_graphql_1.Field(function () { return Date; }),
        __metadata("design:type", Date)
    ], AddMovieItemInput.prototype, "releaseDate", void 0);
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", String)
    ], AddMovieItemInput.prototype, "itemURL", void 0);
    __decorate([
        type_graphql_1.Field({ nullable: true }),
        __metadata("design:type", String)
    ], AddMovieItemInput.prototype, "itemNotes", void 0);
    AddMovieItemInput = __decorate([
        type_graphql_1.ArgsType()
    ], AddMovieItemInput);
    return AddMovieItemInput;
}());
var UpdateMovieItemInput = /** @class */ (function () {
    function UpdateMovieItemInput() {
    }
    __decorate([
        type_graphql_1.Field({ nullable: true }),
        __metadata("design:type", String)
    ], UpdateMovieItemInput.prototype, "itemName", void 0);
    __decorate([
        type_graphql_1.Field(function () { return CaseType_1.default; }, { nullable: true }),
        __metadata("design:type", String)
    ], UpdateMovieItemInput.prototype, "caseType", void 0);
    __decorate([
        type_graphql_1.Field(function () { return DigitalType_1.default; }, { nullable: true }),
        __metadata("design:type", String)
    ], UpdateMovieItemInput.prototype, "digitalType", void 0);
    __decorate([
        type_graphql_1.Field(function () { return YesNo_1.default; }, { nullable: true }),
        __metadata("design:type", String)
    ], UpdateMovieItemInput.prototype, "is3D", void 0);
    __decorate([
        type_graphql_1.Field(function () { return YesNo_1.default; }, { nullable: true }),
        __metadata("design:type", String)
    ], UpdateMovieItemInput.prototype, "isWatched", void 0);
    __decorate([
        type_graphql_1.Field(function () { return FormatType_1.default; }, { nullable: true }),
        __metadata("design:type", String)
    ], UpdateMovieItemInput.prototype, "formatType", void 0);
    __decorate([
        type_graphql_1.Field(function () { return StatusType_1.default; }, { nullable: true }),
        __metadata("design:type", String)
    ], UpdateMovieItemInput.prototype, "itemStatus", void 0);
    __decorate([
        type_graphql_1.Field(function () { return Date; }, { nullable: true }),
        __metadata("design:type", Date)
    ], UpdateMovieItemInput.prototype, "releaseDate", void 0);
    __decorate([
        type_graphql_1.Field({ nullable: true }),
        __metadata("design:type", String)
    ], UpdateMovieItemInput.prototype, "itemURL", void 0);
    __decorate([
        type_graphql_1.Field({ nullable: true }),
        __metadata("design:type", String)
    ], UpdateMovieItemInput.prototype, "itemNotes", void 0);
    UpdateMovieItemInput = __decorate([
        type_graphql_1.ArgsType()
    ], UpdateMovieItemInput);
    return UpdateMovieItemInput;
}());
var MovieItemResolver = /** @class */ (function () {
    function MovieItemResolver() {
    }
    MovieItemResolver.prototype.countMovieItems = function (filters) {
        return __awaiter(this, void 0, void 0, function () {
            var movieItemRepository;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        movieItemRepository = typeorm_1.getRepository(MovieItem_1.MovieItem);
                        return [4 /*yield*/, movieItemRepository.count({
                                where: filters,
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    MovieItemResolver.prototype.movieItem = function (itemID) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, MovieItem_1.MovieItem.findOne({ itemID: itemID })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    MovieItemResolver.prototype.movieItems = function (_a) {
        var limit = _a.limit, skip = _a.skip, order = _a.order, filters = __rest(_a, ["limit", "skip", "order"]);
        return __awaiter(this, void 0, void 0, function () {
            var movieItemRepository, orderCol, orderDir, ordered;
            var _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        movieItemRepository = typeorm_1.getRepository(MovieItem_1.MovieItem);
                        orderCol = order ? order[0] : 'itemID';
                        orderDir = order ? order[1] : 'ASC';
                        ordered = (_b = {}, _b[orderCol] = orderDir, _b);
                        return [4 /*yield*/, movieItemRepository.find({
                                order: ordered,
                                skip: skip,
                                take: limit,
                                where: filters,
                            })];
                    case 1: return [2 /*return*/, _c.sent()];
                }
            });
        });
    };
    MovieItemResolver.prototype.addMovieItem = function (newMovieItem) {
        return __awaiter(this, void 0, void 0, function () {
            var movieItem;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        movieItem = MovieItem_1.MovieItem.create(newMovieItem);
                        return [4 /*yield*/, movieItem.save()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, movieItem];
                }
            });
        });
    };
    MovieItemResolver.prototype.markMovieWatched = function (id, isWatched) {
        return __awaiter(this, void 0, void 0, function () {
            var movieItem;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, MovieItem_1.MovieItem.findOne(id)];
                    case 1:
                        movieItem = _a.sent();
                        if (!movieItem)
                            throw new Error('Movie Item not found!');
                        movieItem.isWatched = isWatched;
                        return [4 /*yield*/, movieItem.save()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, movieItem];
                }
            });
        });
    };
    MovieItemResolver.prototype.updateMovieItem = function (id, data) {
        return __awaiter(this, void 0, void 0, function () {
            var movieItem;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, MovieItem_1.MovieItem.findOne(id)];
                    case 1:
                        movieItem = _a.sent();
                        if (!movieItem)
                            throw new Error('Movie Item not found!');
                        Object.assign(movieItem, data);
                        return [4 /*yield*/, movieItem.save()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, movieItem];
                }
            });
        });
    };
    __decorate([
        type_graphql_1.Query(function () { return type_graphql_1.Int; }),
        __param(0, type_graphql_1.Args()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [CountMovieItems]),
        __metadata("design:returntype", Promise)
    ], MovieItemResolver.prototype, "countMovieItems", null);
    __decorate([
        type_graphql_1.Query(function () { return MovieItem_1.MovieItem; }),
        __param(0, type_graphql_1.Arg('itemID', function () { return type_graphql_1.Int; })),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number]),
        __metadata("design:returntype", Promise)
    ], MovieItemResolver.prototype, "movieItem", null);
    __decorate([
        type_graphql_1.Query(function () { return [MovieItem_1.MovieItem]; }),
        __param(0, type_graphql_1.Args()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [GetMovieItemsArgs]),
        __metadata("design:returntype", Promise)
    ], MovieItemResolver.prototype, "movieItems", null);
    __decorate([
        type_graphql_1.Mutation(function () { return MovieItem_1.MovieItem; }),
        __param(0, type_graphql_1.Args()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [AddMovieItemInput]),
        __metadata("design:returntype", Promise)
    ], MovieItemResolver.prototype, "addMovieItem", null);
    __decorate([
        type_graphql_1.Mutation(function () { return MovieItem_1.MovieItem; }),
        __param(0, type_graphql_1.Arg('id', function () { return type_graphql_1.Int; })),
        __param(1, type_graphql_1.Arg('isWatched', function () { return YesNo_1.default; })),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number, String]),
        __metadata("design:returntype", Promise)
    ], MovieItemResolver.prototype, "markMovieWatched", null);
    __decorate([
        type_graphql_1.Mutation(function () { return MovieItem_1.MovieItem; }),
        __param(0, type_graphql_1.Arg('id', function () { return type_graphql_1.Int; })),
        __param(1, type_graphql_1.Args()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number, UpdateMovieItemInput]),
        __metadata("design:returntype", Promise)
    ], MovieItemResolver.prototype, "updateMovieItem", null);
    MovieItemResolver = __decorate([
        type_graphql_1.Resolver(MovieItem_1.MovieItem)
    ], MovieItemResolver);
    return MovieItemResolver;
}());
exports.MovieItemResolver = MovieItemResolver;
//# sourceMappingURL=MovieItemResolver.js.map