import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Controller('movies') //localhost:3000/movies
export class MoviesController {
    //Service에 접근하는 법
    constructor(private readonly moviesService: MoviesService) {}

    @Get()
    getAll(): Movie[] {
        return this.moviesService.getAll();
    }

    @Get(":id") //localhost:3000/movies/id
    getOne(@Param('id') movieID: number): Movie {
        return this.moviesService.getOne(movieID);
    }

    @Post()
    create(@Body() movieData: CreateMovieDto) {
        return this.moviesService.create(movieData);
    }

    @Delete(":id")
    remove(@Param('id') movieID: number) {
        return this.moviesService.deleteOne(movieID);
    }

    @Patch(":id")
    patch(@Param('id') movieID: number, @Body() updateData: UpdateMovieDto) {
        return this.moviesService.update(movieID, updateData);
    }
}
