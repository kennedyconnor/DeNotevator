import ListService from "../services/ListService"
import express from 'express'
import { Authorize } from "../middlewear/authorize"

let _service = new ListService()
let _repo = _service.repository


//PUBLIC 

export default class ListController {
  constructor() {
    this.router = express.Router()
      .get('/lists', this.getAllLists)
      .get('', this.getListById)
      .use(Authorize.authenticated)
      .post('', this.createList)
      .put('/', this.editList)
      .delete('', this.deleteList)
      .use(this.defaultRoute)
  }

  defaultRoute(req, res, next) {
    next({ status: 404, message: 'No Such Route' })
  }

  async getAllLists(req, res, next) {
    try {
      //only gets lists by user who is logged in
      let data = await _repo.find({ boardId: req.params.id, authorId: req.session.uid })
      return res.send(data)
    }
    catch (err) { next(err) }
  }

  async getListById(req, res, next) {
    try {
      let data = await _repo.findOne({ _id: req.params.id, authorId: req.session.uid })
      return res.send(data)
    } catch (error) { next(error) }
  }

  async createList(req, res, next) {
    try {
      req.body.authorId = req.session.uid
      let data = await _repo.create(req.body)
      return res.status(201).send(data)
    } catch (error) { next(error) }
  }

  async editList(req, res, next) {
    try {
      let data = await _repo.findOneAndUpdate({ _id: req.params.id, authorId: req.session.uid }, req.body, { new: true })
      if (data) {
        return res.send(data)
      }
      throw new Error("invalid id")
    } catch (error) { next(error) }
  }

  async deleteList(req, res, next) {
    try {
      await _repo.findOneAndRemove({ _id: req.params.id, authorId: req.session.uid })
      return res.send("Successfully deleted")
    } catch (error) { next(error) }
  }


}