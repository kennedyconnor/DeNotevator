import mongoose from "mongoose"
import TaskService from "./TaskService";
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

let _taskRepo = new TaskService().repository

let _schema = new Schema({
  title: { type: String, required: true },
  authorId: { type: ObjectId, ref: 'User', required: true },
  boardId: { type: ObjectId, ref: 'Board', required: true }
}, { timestamps: true })

//CASCADE ON DELETE
_schema.pre('findOneAndRemove', function (next) {
  //lets find all the lists and remove them
  // @ts-ignore
  let listId = this._conditions._id //THIS IS THE List
  Promise.all([
    _taskRepo.deleteMany({ listId })
  ])
    .then(() => next())
    .catch(err => next(err))
})

export default class ListService {
  get repository() {
    return mongoose.model('List', _schema)
  }
}