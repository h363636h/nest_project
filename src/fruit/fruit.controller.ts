import { Controller, Get, Post, Param, HttpCode, Body, ValidationPipe, ParseIntPipe  } from '@nestjs/common';
import { FruitService } from './fruit.service';
import { Result as FruitResult } from './result/result.interface';
import {Supply} from './dto/supply';

@Controller('fruit')
export class FruitController {
	constructor(private fruitService: FruitService) {}
	// ✴️수정
	@Get('/')
	async getFruit(): Promise<FruitResult> {
		const res = await this.fruitService.chk();
		return {
		msg: res,
		remain: this.fruitService.count,
		};
	}
	// ✴️수정 끝 

	@Post('/buy')
	@HttpCode(201)
	buyFruit(): FruitResult {
	  return { msg: this.fruitService.buy(1), remain: this.fruitService.count };
	}
	@Post('/buy/:count')
	@HttpCode(201)
	buyFruits(@Param('count', ParseIntPipe) count: number): FruitResult {
	  return {
		msg: this.fruitService.buy(count),
		remain: this.fruitService.count,
	  };
	}
	@Get('/eat')
	async eatFruit(): Promise<FruitResult> {
	  return { msg: this.fruitService.eat(1), remain: this.fruitService.count };
	}
  
	@Get('/eat/:count')
	eatFruits(@Param('count') count: string): FruitResult {
	  return {
		msg: this.fruitService.eat(parseInt(count, 10)),
		remain: this.fruitService.count,
	  };
	}

	@Post('/supply')
	@HttpCode(201)
	supplyFruits(@Body(ValidationPipe) supplyDto: Supply): FruitResult {
		return {
			msg : 
			this.fruitService.buy(3),
			remain:this.fruitService.count,
		};
	}
}
