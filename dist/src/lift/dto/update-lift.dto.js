"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateLiftDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_lift_dto_1 = require("./create-lift.dto");
class UpdateLiftDto extends (0, mapped_types_1.PartialType)(create_lift_dto_1.CreateLiftDto) {
}
exports.UpdateLiftDto = UpdateLiftDto;
//# sourceMappingURL=update-lift.dto.js.map