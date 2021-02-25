import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from '../user';
import { AuthService } from '../auth';
import { AgencyService } from './agency.service';

@Controller('agency')
@ApiTags('agency')
export class AgencyController {
  constructor(private agencyService: AgencyService,
              private userService: UsersService,
              private authService: AuthService,) {}

}
