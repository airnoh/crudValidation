import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { todoDto } from 'src/dto/todo.dto';
import { Todo } from 'src/entity/todo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TodosService {
    constructor(@InjectRepository(Todo) private readonly todoRepository: Repository<Todo>,) { }

    async create(dto: todoDto) {
        const todo = this.todoRepository.create(dto);
        return await this.todoRepository.save(todo);
    }

    async findById(id: number) {
        const todo = await this.todoRepository.findOne({ where: { id } });
        // checks if the todo with that id exists
        if (!todo) {
            throw new HttpException('Todo not Found', 404);
        }
        return await this.todoRepository.save(todo);
    }

    findMany() {
        return this.todoRepository.find()
    }

    async update(id: number, dto: todoDto) {
        const todo = await this.todoRepository.findOne({ where: { id } });
        // check if the todo exists

        Object.assign(todo, dto);
        return await this.todoRepository.save(todo);
    }

    async delete(id: number) {
        const todo = await this.todoRepository.findOne({ where: { id } });
        // check if the todo exists

        Object.assign(todo);
        return await this.todoRepository.remove(todo);
    }
}
