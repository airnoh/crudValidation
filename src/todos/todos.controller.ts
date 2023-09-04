import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TodosService } from './todos.service';
import { todoDto } from 'src/dto/todo.dto';

@Controller('todos')
export class TodosController {
    constructor(private readonly todosService: TodosService){}


    @Post()
    create(@Body() dto: todoDto){
        return this.todosService.create(dto);
    }

    @Get()
    findMany(){
        return this.todosService.findMany();
    }

    @Put(':id')
    update(@Param ('id') id: number, @Body() dto: todoDto){
        return this.todosService.update(id, dto);
    }

    @Delete(':id')
    delete(@Param ('id') id: number, @Body() dto: todoDto){
        return this.todosService.delete(id);
    }
}