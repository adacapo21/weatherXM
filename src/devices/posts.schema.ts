import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { Document } from 'mongoose';

@Schema()
@ApiTags('posts')
export class Posts extends Document {
  @Prop()
  @ApiProperty()
  id: string;

  @Prop()
  @ApiProperty()
  userId: number;

  @Prop()
  @ApiProperty()
  title: string;

  @Prop()
  @ApiProperty()
  body: string;
}

export const PostSchema = SchemaFactory.createForClass(Posts);
