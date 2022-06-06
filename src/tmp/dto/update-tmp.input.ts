import { CreateTmpInput } from './create-tmp.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateTmpInput extends PartialType(CreateTmpInput) {
  @Field(() => Int)
  id: number;
}
