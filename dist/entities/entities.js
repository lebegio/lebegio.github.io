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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PollOption = exports.Poll = void 0;
const typeorm_1 = require("typeorm");
let Poll = class Poll {
};
exports.Poll = Poll;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Poll.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], Poll.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], Poll.prototype, "is_active", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => PollOption, (poll_option) => poll_option.poll),
    __metadata("design:type", Array)
], Poll.prototype, "poll_options", void 0);
exports.Poll = Poll = __decorate([
    (0, typeorm_1.Entity)()
], Poll);
let PollOption = class PollOption {
};
exports.PollOption = PollOption;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], PollOption.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], PollOption.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], PollOption.prototype, "win", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Poll, (poll) => poll.poll_options),
    (0, typeorm_1.JoinColumn)({ name: 'poll_id' }),
    __metadata("design:type", Poll)
], PollOption.prototype, "poll", void 0);
exports.PollOption = PollOption = __decorate([
    (0, typeorm_1.Entity)('poll_option')
], PollOption);
//# sourceMappingURL=entities.js.map