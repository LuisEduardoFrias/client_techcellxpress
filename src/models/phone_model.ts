//
import BaseModel from './base_model';

export class CapacityModel extends BaseModel{
  constructor(rom, ramMemory, processor, processorSpeed) {
    super();
    this.rom = rom;
    this.ramMemory = ramMemory;
    this.processor = processor;
    this.processorSpeed = processorSpeed;
  }
}

export default class PhoneModel extends BaseModel {
  constructor(imei, imgUrl, brand, model, color, capacity, releaseDate) {
    super();
    this.imei = imei;
    this.imgUrl = imgUrl;
    this.brand = brand;
    this.model = model;
    this.color = color;
    this.capacity = capacity;
    this.releaseDate = releaseDate;
    this.isRemoved = false;
  }
}