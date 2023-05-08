import { Injectable } from '@nestjs/common';

@Injectable()
export class FruitService {
	public count: number;
	private readonly name : string;

	constructor() {
		this.count = 0;
		this.name = "과일";
	}
	chk(): string {
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
}
