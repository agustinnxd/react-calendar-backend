import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { User } from "./user.schema";
import mongoose from "mongoose";

@Schema({
    timestamps: true
})
export class Event {
    @Prop({
        required: true,
        trim: true,
    })
    title: string

    @Prop({
        trim: true
    })
    notes: string

    @Prop({
        required: true
    })
    start: Date;

    @Prop({
        required: true
    })
    end: Date;

    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    })
    user: User
};

export const EventSchema = SchemaFactory.createForClass(Event);