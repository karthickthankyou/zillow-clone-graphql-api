import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'
import { SampleService } from './sample.service'
import { Sample } from './entities/sample.entity'
import { CreateSampleInput } from './dto/create-sample.input'
import { UpdateSampleInput } from './dto/update-sample.input'

@Resolver(() => Sample)
export class SampleResolver {
  constructor(private readonly sampleService: SampleService) {}

  @Mutation(() => Sample)
  createSample(
    @Args('createSampleInput') createSampleInput: CreateSampleInput,
  ) {
    return this.sampleService.create(createSampleInput)
  }

  @Query(() => [Sample], { name: 'samples' })
  findAll() {
    return this.sampleService.findAll()
  }

  @Query(() => Sample, { name: 'sample' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.sampleService.findOne(id)
  }

  @Mutation(() => Sample)
  updateSample(
    @Args('updateSampleInput') updateSampleInput: UpdateSampleInput,
  ) {
    return this.sampleService.update(updateSampleInput.id, updateSampleInput)
  }

  @Mutation(() => Sample)
  removeSample(@Args('id', { type: () => Int }) id: number) {
    return this.sampleService.remove(id)
  }
}
