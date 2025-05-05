import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreatePaymentIntentDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(0.5, { message: 'Amount must be at least 0.5' })
  amount: number;

  @IsOptional()
  @IsString()
  currency?: string = 'usd';

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  customerId?: string;
}
