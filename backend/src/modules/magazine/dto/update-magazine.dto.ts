import { PartialType } from '@nestjs/swagger'
import { CreateMagazineDTO } from './create-magazine.dto'

export class UpdateMagazineDto extends PartialType(CreateMagazineDTO) {}
