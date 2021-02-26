import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';


@Controller('agency')
@ApiTags('agency')
export class AgencyController {
  constructor() {}

}
