"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var type_graphql_1 = require("type-graphql");
var Movie_1 = require("../entity/Movie");
var AddMovieInput = /** @class */ (function () {
    function AddMovieInput() {
    }
    __decorate([
        type_graphql_1.Field(function () { return type_graphql_1.Int; }),
        __metadata("design:type", Number)
    ], AddMovieInput.prototype, "itemID", void 0);
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", String)
    ], AddMovieInput.prototype, "movieTitle", void 0);
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", String)
    ], AddMovieInput.prototype, "movieURL", void 0);
    AddMovieInput = __decorate([
        type_graphql_1.ArgsType()
    ], AddMovieInput);
    return AddMovieInput;
}());
var UpdateMovieInput = /** @class */ (function () {
    function UpdateMovieInput() {
    }
    __decorate([
        type_graphql_1.Field(function () { return type_graphql_1.Int; }, { nullable: true }),
        __metadata("design:type", Number)
    ], UpdateMovieInput.prototype, "itemID", void 0);
    __decorate([
        type_graphql_1.Field({ nullable: true }),
        __metadata("design:type", String)
    ], UpdateMovieInput.prototype, "movieTitle", void 0);
    __decorate([
        type_graphql_1.Field({ nullable: true }),
        __metadata("design:type", String)
    ], UpdateMovieInput.prototype, "movieURL", void 0);
    UpdateMovieInput = __decorate([
        type_graphql_1.ArgsType()
    ], UpdateMovieInput);
    return UpdateMovieInput;
}());
var MovieResolver = /** @class */ (function () {
    function MovieResolver() {
    }
    MovieResolver.prototype.countMovies = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Movie_1.Movie.count()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    MovieResolver.prototype.movies = function (itemID) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Movie_1.Movie.find({ itemID: itemID })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    MovieResolver.prototype.addMovie = function (newMovie) {
        return __awaiter(this, void 0, void 0, function () {
            var movie;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        movie = Movie_1.Movie.create(newMovie);
                        return [4 /*yield*/, movie.save()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, movie];
                }
            });
        });
    };
    MovieResolver.prototype.updateMovie = function (movieID, data) {
        return __awaiter(this, void 0, void 0, function () {
            var movie;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Movie_1.Movie.findOne(movieID)];
                    case 1:
                        movie = _a.sent();
                        if (!movie)
                            throw new Error('Movie not found!');
                        Object.assign(movie, data);
                        return [4 /*yield*/, movie.save()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, movie];
                }
            });
        });
    };
    __decorate([
        type_graphql_1.Query(function () { return type_graphql_1.Int; }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], MovieResolver.prototype, "countMovies", null);
    __decorate([
        type_graphql_1.Query(function () { return [Movie_1.Movie]; }),
        __param(0, type_graphql_1.Arg('itemID', function () { return type_graphql_1.Int; })),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number]),
        __metadata("design:returntype", Promise)
    ], MovieResolver.prototype, "movies", null);
    __decorate([
        type_graphql_1.Mutation(function () { return Movie_1.Movie; }),
        __param(0, type_graphql_1.Args()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [AddMovieInput]),
        __metadata("design:returntype", Promise)
    ], MovieResolver.prototype, "addMovie", null);
    __decorate([
        type_graphql_1.Mutation(function () { return Movie_1.Movie; }),
        __param(0, type_graphql_1.Arg('id', function () { return type_graphql_1.Int; })),
        __param(1, type_graphql_1.Args()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number, UpdateMovieInput]),
        __metadata("design:returntype", Promise)
    ], MovieResolver.prototype, "updateMovie", null);
    MovieResolver = __decorate([
        type_graphql_1.Resolver(Movie_1.Movie)
    ], MovieResolver);
    return MovieResolver;
}());
exports.MovieResolver = MovieResolver;
//# sourceMappingURL=MovieResolver.js.map