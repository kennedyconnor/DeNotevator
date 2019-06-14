import ListService from "../services/ListService"
import TaskService from '../services/TaskService'
import express from 'express'
import { Authorize } from "../middlewear/authorize"
import BoardService from "../services/BoardService";

let _service = new ListService()
let _listRepo = _service.repository
let _taskRepo = new TaskService().repository
let _boardRepo = new BoardService().repository


//PUBLIC 

export default class ListController {
  constructor() {
    this.router = express.Router()
      .get('/:id/tasks', this.getListTasks)
      .use(Authorize.authenticated)
      .post('', this.createList)
      .put('/:id', this.editList)
      .delete('/:id', this.deleteList)
      .use(this.defaultRoute)
  }

  defaultRoute(req, res, next) {
    next({ status: 404, message: 'No Such Route' })
  }

  async getListTasks(req, res, next) {
    try {
      if (await _boardRepo.find({ $or: [{ authorId: req.session.uid }, { sharedIds: { $in: [req.session.uid] } }] })) {
        let data = await _taskRepo.find({ listId: req.params.id }).populate('comments.authorId')
        return res.send(data)
      }
    } catch (error) { console.error(error) }
  }

  async createList(req, res, next) {
    try {
      req.body.authorId = req.session.uid
      let data = await _listRepo.create(req.body)
      return res.status(201).send(data)
    } catch (error) { next(error) }
  }

  async editList(req, res, next) {
    try {
      let data = await _listRepo.findOneAndUpdate({ _id: req.params.id, authorId: req.session.uid }, req.body, { new: true })
      if (data) {
        return res.send(data)
      }
      throw new Error("invalid id")
    } catch (error) { next(error) }
  }

  async deleteList(req, res, next) {
    try {
      await _listRepo.findOneAndRemove({ _id: req.params.id, authorId: req.session.uid })
      return res.send("Successfully deleted")
    } catch (error) { next(error) }
  }


}