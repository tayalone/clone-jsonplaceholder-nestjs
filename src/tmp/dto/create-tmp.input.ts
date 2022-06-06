import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateTmpInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
