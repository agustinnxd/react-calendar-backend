import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Event } from 'src/schemas/event.schema';
import { Model } from 'mongoose';

@Injectable()
export class EventsService {
  constructor(
    @InjectModel(Event.name) private eventModel: Model<Event>
  ) { }

  async create(createEventDto: CreateEventDto, req) {
    try {
      const newEvent = await this.eventModel.create({ ...createEventDto, user: req.user._id })

      return {
        ok: true,
        newEvent
      }
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Algo salió mal')
    }
  }

  async findAll() {
    return await this.eventModel.find().populate("user", 'username');
  }

  async findOne(id: string) {

    try {
      const event = await this.eventModel.findById(id);

      if (!event) {
        throw new NotFoundException("Event not found")
      }

      return event

    } catch (error) {
      if (error.message === "Event not found") {
        throw error
      };

      if (error.message.includes("Cast to ObjectId failed for value")) {
        throw new BadRequestException("Invalid Id")
      }

    }

  }

  async update(id: string, updateEventDto: UpdateEventDto, req) {

    const {_id} = req.user

    try {
      const event = await this.eventModel.findByIdAndUpdate(id, updateEventDto);

      if (!event) {
        throw new NotFoundException('Event not found')
      };

      if ( event.user.toString() !== _id ) {
        throw new UnauthorizedException("This event was posted by another user")
      }

      return event

    } catch (error) {

      if (error.message === "Event not found") {
        throw error
      }

      if (error.message === "This event was posted by another user") {
        throw error
      }

      if (error.message.includes("Cast to ObjectId failed for value")) {
        throw new BadRequestException("Invalid id")
      }
    };

  }

  async remove(id: string) {
    try {
      const event = await this.eventModel.findByIdAndDelete(id);
      
      if (!event) {
        throw new NotFoundException('Event not found')
      };

      return event

    } catch (error) {

      if (error.message === "Event not found") {
        throw error
      }

      if (error.message.includes("Cast to ObjectId failed for value")) {
        throw new BadRequestException("Invalid id")
      }
    };
  }
}
