import BoardService from '../services/BoardService'
import ListService from '../services/ListService'
import express from 'express'
import { Authorize } from '../middlewear/authorize'

//import service and create an instance
let _service = new BoardService()
let _boardRepo = _service.repository
let _listRepo = new ListService().repository


//PUBLIC
export default class BoardsController {
  constructor() {
    this.router = express.Router()
      .get('', this.getAll)
      .get('/shared', this.getSharedBoards)
      .get('/:id', this.getById)
      .get('/:id/lists', this.getBoardLists)
      .use(Authorize.authenticated)
      .post('', this.create)
      .put('/:id', this.edit)
      .delete('/:id', this.delete)
      .use(this.defaultRoute)
  }

  defaultRoute(req, res, next) {
    next({ status: 404, message: 'No Such Route' })
  }

  async getAll(req, res, next) {
    try {
      //only gets boards by user who is logged in
      let data = await _boardRepo.find({ authorId: req.session.uid })
      return res.send(data)
    }
    catch (err) { next(err) }
  }

  async getSharedBoards(req, res, next) {
    try {
      //only gets boards if user who is logged in matches a shared Id
      let data = await _boardRepo.find({ sharedIds: { $in: [req.session.uid] } })
      return res.send(data)
    }
    catch (err) { next(err) }
  }

  async getById(req, res, next) {
    try {
      let data = await _boardRepo.findOne({ _id: req.params.id, authorId: req.session.uid })
      return res.send(data)
    } catch (error) { next(error) }
  }
  async getBoardLists(req, res, next) {
    try {
      //get Lists for boards were 
      let data = await _listRepo.find({
        boardId: req.params.id,
        // $or: [{ authorId: req.session.uid }, { sharedIds: { $in: [req.session.uid] } }]
      })
      return res.send(data)
    }
    catch (err) { next(err) }
  }

  async create(req, res, next) {
    try {
      req.body.authorId = req.session.uid
      let data = await _boardRepo.create(req.body)
      return res.status(201).send(data)
    } catch (error) { next(error) }
  }

  async edit(req, res, next) {
    try {
      let data = await _boardRepo.findOneAndUpdate({ _id: req.params.id, authorId: req.session.uid }, req.body, { new: true })
      if (data) {
        return res.send(data)
      }
      throw new Error("invalid id")
    } catch (error) { next(error) }
  }

  async delete(req, res, next) {
    try {
      await _boardRepo.findOneAndRemove({ _id: req.params.id, authorId: req.session.uid })
      return res.send("Successfully deleted")
    } catch (error) { next(error) }
  }
}


