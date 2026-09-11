import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module.js';
import { ProductService } from './product.service.js';
import { ProductResolver } from './product.resolver.js';

@Module({
  imports: [AuthModule],
  providers: [ProductService, ProductResolver],
})
export class ProductModule {}
