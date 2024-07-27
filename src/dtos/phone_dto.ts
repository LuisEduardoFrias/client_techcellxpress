//
import BaseDto from './base_dto';

export class CapacityDto extends BaseDto {
  constructor(rom: string, ramMemory: string, processor: string, processorSpeed: string) {
    super();
    this.rom = rom;
    this.ramMemory = ramMemory;
    this.processor = processor;
    this.processorSpeed = processorSpeed;
  }
}

export class PhoneDto extends BaseDto {
  constructor(imgUrl: string, brand: string, model: string, color: string) {
    super();
    this.imgUrl = imgUrl;
    this.brand = brand;
    this.model = model;
    this.color = color;
  }
}

export class PhoneCardDto extends BaseDto {
  constructor(imgUrl: string, brand: string, model: string, color: string) {
    super();
    this.imgUrl = imgUrl;
    this.brand = brand;
    this.model = model;
    this.color = color;
  }
}

export default class PhoneFullDto extends BaseDto {
  constructor(imgUrl: string, brand: string, model: string, color: string, capacity, releaseDate: boolean) {
    super();
    this.imgUrl = imgUrl;
    this.brand = brand;
    this.model = model;
    this.color = color;
    this.capacity = capacity;
    this.releaseDate = releaseDate;
    this.isRemoved = false;
  }
}

