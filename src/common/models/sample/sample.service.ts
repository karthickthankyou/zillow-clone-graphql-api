import { Injectable } from '@nestjs/common'
import { CreateSampleInput } from './dto/create-sample.input'
import { UpdateSampleInput } from './dto/update-sample.input'

@Injectable()
export class SampleService {
  create(createSampleInput: CreateSampleInput) {
    return 'This action adds a new sample'
  }

  findAll() {
    return [{ exampleField: 23 }, { exampleField: 233 }]
  }

  findOne(id: number) {
    return `This action returns a #${id} sample`
  }

  update(id: number, updateSampleInput: UpdateSampleInput) {
    return `This action updates a #${id} sample`
  }

  remove(id: number) {
    return `This action removes a #${id} sample`
  }
}
