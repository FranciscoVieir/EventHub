"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateEvent = exports.deleteEvent = exports.createEvent = exports.getAllEvents = void 0;
const EventModel_1 = __importDefault(require("../models/EventModel"));
const getAllEvents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const events = yield EventModel_1.default.find();
        events.sort((a, b) => {
            const dateA = new Date(a.selected_date).getTime();
            // console.log(dateA, 'DATEA by selecteddate');
            const dateB = new Date(b.selected_date).getTime();
            // console.log(dateB, 'DATEB by selecteddate');
            return dateA - dateB;
        });
        return res.json(events);
    }
    catch (error) {
        return res
            .status(500)
            .json({ error: 'Erro interno no servidor getAllEvents' });
    }
});
exports.getAllEvents = getAllEvents;
const createEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const event = new EventModel_1.default({
            title: req.body.title,
            description: req.body.description,
            image_url: req.body.image_url,
            selected_date: req.body.selected_date,
            withImage: req.body.withImage,
        });
        yield event.save();
        return res.status(201).json(event);
    }
    catch (error) {
        return res
            .status(500)
            .json({ error: 'Erro interno no servidor no createEvent' });
    }
});
exports.createEvent = createEvent;
const deleteEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const eventsDelete = yield EventModel_1.default.findByIdAndDelete(req.params.id);
        return res.json(eventsDelete);
    }
    catch (error) {
        return res
            .status(500)
            .json({ error: 'Erro interno no servidor no deleteEvent' });
    }
});
exports.deleteEvent = deleteEvent;
const updateEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const eventsUpdate = yield EventModel_1.default.findByIdAndUpdate(req.params.id, {
            title: req.body.title,
            description: req.body.description,
            image_url: req.body.image_url,
            selected_date: req.body.selected_date,
            withImage: req.body.withImage,
        }, {
            new: true,
        });
        return res.json(eventsUpdate);
    }
    catch (error) {
        return res
            .status(500)
            .json({ error: 'Erro interno no servidor no UpdateEvent' });
    }
});
exports.updateEvent = updateEvent;
