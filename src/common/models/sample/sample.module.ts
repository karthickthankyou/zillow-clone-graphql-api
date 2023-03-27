import { Module } from '@nestjs/common'
import { SampleService } from './sample.service'
import { SampleResolver } from './sample.resolver'

@Module({
  providers: [SampleResolver, SampleService],
})
export class SampleModule {}
