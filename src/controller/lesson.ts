import { Request, Response } from "express";
import { ILessonDocument, Lesson } from "../models";
export const list = async (req: Request, res: Response) => {
  console.log("🚀 ~ file: lesson.ts ~ line 5 ~ list ~ req", req);
  let list: ILessonDocument[] = await Lesson.find();
  setTimeout(function () {
    res.json({ code: 0, data: { list } });
  }, 1000);
};
export const get = async (req: Request, res: Response) => {
  let id = req.params.id;
  let lesson = await Lesson.findById(id);
  res.json({ success: true, data: lesson });
};
