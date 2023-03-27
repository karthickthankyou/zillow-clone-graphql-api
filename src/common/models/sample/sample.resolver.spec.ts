import { Test, TestingModule } from '@nestjs/testing'
import { SampleResolver } from './sample.resolver'
import { SampleService } from './sample.service'

describe('SampleResolver', () => {
  let resolver: SampleResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SampleResolver, SampleService],
    }).compile()

    resolver = module.get<SampleResolver>(SampleResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
