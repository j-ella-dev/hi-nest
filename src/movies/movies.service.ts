import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from './entities/movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Injectable()
export class MoviesService {
    private movies: Movie[] = [];

    getAll() : Movie[] {
        return this.movies;
    }

    getOne(id: number): Movie {
        //return this.movies.find(movie => movie.id === parseInt(id));
        const movie = this.movies.find(movie => movie.id === id); //이렇게 해도 int로 변경 가능
        if (!movie) {
            throw new NotFoundException(`Movie with ID ${id} not found.`);
        }
        return movie;
    }

    deleteOne(id: number) {
        this.getOne(id);
        this.movies = this.movies.filter(movie => movie.id !== id);
    }

    create(movieData: CreateMovieDto) {
        this.movies.push({
            id: this.movies.length + 1,
            ...movieData,
        })
    }

    update(id: number, updateData: UpdateMovieDto) {
        const movie = this.getOne(id);
        this.deleteOne(id);
        this.movies.push({...movie, ...updateData});
    }
}
