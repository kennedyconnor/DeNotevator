import mongoose from 'mongoose'

//PRIVATE
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

let _commentSchema = new mongoose.Schema({
  content: { type: String, required: true },
  authorId: { type: ObjectId, ref: 'User', required: true }
}, { timestamps: true })

let _schema = new Schema({
  description: { type: String, required: true },
  authorId: { type: ObjectId, ref: 'User', required: true },
  boardId: { type: ObjectId, ref: 'Board', required: true },
  listId: { type: ObjectId, ref: 'List', required: true },
  comments: [_commentSchema]
}, { timestamps: true })

//PUBLIC
// _schema.pre('remove', function (next) {
//   //lets find all the lists and remove them
//   this._id //THIS IS THE TASK
//   Promise.all([
//     //TaskService.deleteMany({ taskId: this._id }),
//   ])
//     .then(() => next())
//     .catch(err => next(err))
// })
export default class TaskService {
  get repository() {
    return mongoose.model('Task', _schema)
  }
}