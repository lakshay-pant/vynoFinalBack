"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateSingupDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_singup_dto_1 = require("./create-singup.dto");
class UpdateSingupDto extends (0, mapped_types_1.PartialType)(create_singup_dto_1.CreateSingupDto) {
}
exports.UpdateSingupDto = UpdateSingupDto;
//# sourceMappingURL=update-singup.dto.js.map