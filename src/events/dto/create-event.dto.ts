import { IsDateString, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateEventDto {

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsOptional()
    notes?: string;

    @IsDateString()
    @IsNotEmpty()
    start: Date;

    @IsDateString()
    @IsNotEmpty()
    end: Date;
}
