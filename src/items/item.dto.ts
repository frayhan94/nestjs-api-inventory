export class CreateItemDto {
  name: string;
  description: string;
  price: number;
}

export class UpdateItemDto {
  name?: string;
  description?: string;
  price?: number;
}
