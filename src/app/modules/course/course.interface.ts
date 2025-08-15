import { Types } from "mongoose";


export interface ICourse {
    title: string,
    description: string,
    thumbnail?: string,
    price: number,
    module?: Types.ObjectId[],
    user: Types.ObjectId
}