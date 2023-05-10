import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';  // ✴️추가
import { Repository } from 'typeorm';  // ✴️추가
import { Fruit} from '../database/entities/fruit.entity';  // ✴️추가

@Injectable()
export class FruitService {
	public count: number;
	private readonly name : string;
	readonly userId: number;  // ✴️추가

	constructor(
		@InjectRepository(Fruit)
		private fruitRepository: Repository<Fruit>,
	  ) {
		this.chkInventory();
		this.name = '과일';
		this.userId = 1;
	  }
	  async chk(): Promise<string> {
		await this.chkInventory();
		return `${this.name}가 ${this.count}개 있다!`;
	  }
	buy(n: number): string {
		this.count += n;
		return `${this.name} ${n}개를 샀다!`;
	}
	
	eat(n: number): string {
		this.count -= n;
		return `${this.name} ${n}개를 먹자!`;
	}

	async chkInventory() {
		const fruit = await this.fruitRepository.findOneBy({ id: this.userId });
		//this.count = fruit.inventory;
	  }
}
