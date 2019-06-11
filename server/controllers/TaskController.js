import TaskService from '../services/TaskService'
import express from 'express'
import { Authorize } from '../middlewear/authorize'

let _service = new TaskService()
let _taskRepo = _service.repository



export default class TaskController {
  constructor() {
    this.router = express.Router()
      .use(Authorize.authenticated)
      .post('', this.createTask)
      .put('/:id', this.editTask)
      .delete('/:id', this.deleteTask)
      .use(this.defaultRoute)
  }

  defaultRoute(req, res, next) {
    next({ status: 404, message: 'No Such Route' })
  }

  async createTask(req, res, next) {
    try {
      req.body.authorId = req.session.uid
      let data = await _taskRepo.create(req.body)
      return res.status(201).send(data)
    } catch (error) { next(error) }
  }

  async editTask(req, res, next) {
    try {
      let data = await _taskRepo.findOneAndUpdate({ _id: req.params.id, authorId: req.session.uid }, req.body, { new: true })
      if (data) {
        return res.send(data)
      }
      throw new Error("invalid id")
    } catch (error) { next(error) }
  }

  async deleteTask(req, res, next) {
    try {
      await _taskRepo.findOneAndRemove({ _id: req.params.id, authorId: req.session.uid })
      return res.send("Successfully deleted")
    } catch (error) { next(error) }
  }

}
