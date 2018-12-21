import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Machine } from './machines/machine';
import { Part } from './parts/part';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const machines = [
      { id: 1, type: 'Pellet Mill', parts: [] },
      { id: 2, type: 'Hammer Mill', parts: [] },
      { id: 3, type: 'Heat Treatment', parts: [] },
      { id: 4, type: 'Feeder & Conditioner', parts: [] },
      { id: 5, type: 'Roller Mill', parts: [] },
      { id: 6, type: 'Crusher', parts: [] }
    ];

    const parts = [
      { id: 1, type: 'Part 1', size: "small", price: 1, description: "description"},
      { id: 2, type: 'Part 2', size: "medium", price: 10, description: "description"},
      { id: 3, type: 'Part 3', size: "large", price: 15, description: "description"},
      { id: 4, type: 'Part 4', size: "small", price: 12, description: "description"},
      { id: 5, type: 'Part 5', size: "medium", price: 41, description: "description"},
      { id: 6, type: 'Part 6', size: "large", price: 16, description: "description"},
      { id: 7, type: 'Part 7', size: "small", price: 14, description: "description"},
      { id: 8, type: 'Part 8', size: "medium", price: 31, description: "description"},
      { id: 9, type: 'Part 9', size: "large", price: 14, description: "description"},
      { id: 10, type: 'Part 10', size: "small", price: 71, description: "description"},
      { id: 11, type: 'Part 11', size: "medium", price: 91, description: "description"},
      { id: 12, type: 'Part 12', size: "large", price: 12, description: "description"},
      { id: 13, type: 'Part 13', size: "small", price: 14, description: "description"},
      { id: 14, type: 'Part 14', size: "medium", price: 11, description: "description"},
      { id: 15, type: 'Part 15', size: "large", price: 1, description: "description"},
      { id: 16, type: 'Part 16', size: "small", price: 16, description: "description"},
      { id: 17, type: 'Part 17', size: "medium", price: 14, description: "description"}
    ];
    return {machines, parts};
  }
}
