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
Object.defineProperty(exports, "__esModule", { value: true });
var type_graphql_1 = require("type-graphql");
var typeorm_1 = require("typeorm");
var MovieItem_1 = require("./MovieItem");
var Movie = /** @class */ (function (_super) {
    __extends(Movie, _super);
    function Movie() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        type_graphql_1.Field(function () { return type_graphql_1.ID; }),
        typeorm_1.PrimaryGeneratedColumn({ type: 'int', name: 'MOVIEID', unsigned: true }),
        __metadata("design:type", Number)
    ], Movie.prototype, "movieID", void 0);
    __decorate([
        type_graphql_1.Field(function () { return type_graphql_1.Int; }, { nullable: true }),
        typeorm_1.Column('int', { name: 'ITEMID', nullable: true, unsigned: true }),
        __metadata("design:type", Object)
    ], Movie.prototype, "itemID", void 0);
    __decorate([
        type_graphql_1.Field(function () { return String; }, { nullable: true }),
        typeorm_1.Column('varchar', { name: 'MOVIETITLE', nullable: true, length: 99 }),
        __metadata("design:type", Object)
    ], Movie.prototype, "movieTitle", void 0);
    __decorate([
        type_graphql_1.Field(function () { return String; }, { nullable: true }),
        typeorm_1.Column('varchar', { name: 'MOVIEURL', nullable: true, length: 99 }),
        __metadata("design:type", Object)
    ], Movie.prototype, "movieURL", void 0);
    __decorate([
        typeorm_1.ManyToOne(function () { return MovieItem_1.MovieItem; }, function (movieItem) { return movieItem.movies; }, {
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        }),
        typeorm_1.JoinColumn([{ name: 'ITEMID', referencedColumnName: 'itemID' }]),
        __metadata("design:type", MovieItem_1.MovieItem)
    ], Movie.prototype, "item", void 0);
    Movie = __decorate([
        typeorm_1.Index('ITEMID', ['itemID'], {}),
        typeorm_1.Index('MOVIETITLE', ['movieTitle'], {}),
        typeorm_1.Index('MOVIEURL', ['movieURL'], {}),
        typeorm_1.Entity('movies', { schema: 'media_tracker' }),
        type_graphql_1.ObjectType()
    ], Movie);
    return Movie;
}(typeorm_1.BaseEntity));
exports.Movie = Movie;
//# sourceMappingURL=Movie.js.map