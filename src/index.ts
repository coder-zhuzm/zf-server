import express, { Express, Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import HttpException from "./exceptions/HttpException";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";

import errorMiddleware from "./middlewares/errorMiddleware";

import * as userController from "./controller/user";
import * as sliderController from "./controller/slider";
import * as lessonController from "./controller/lesson";

import { Slider, Lesson } from "./models";
import "dotenv/config";
import path from "path";
import multer from "multer";
const storage = multer.diskStorage({
  destination: path.join(__dirname, "public", "uploads"),
  filename(_req: Request, file: Express.Multer.File, cb: any) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });
const app: Express = express();
app.use(morgan("dev"));
app.use(cors());
app.use(helmet());
app.use(express.static(path.resolve(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.get("/", (_req: Request, res: Response) => {
  res.json({ success: true, message: "hello world" });
});

app.get("/user/validate", userController.validate);
app.post("/user/register", userController.register);
app.post("/user/login", userController.login);
app.post("/user/uploadAvatar", upload.single("avatar"), userController.uploadAvatar);
app.get("/slider/list", sliderController.list);

app.get("/lesson/list", lessonController.list);
app.get("/lesson/:id", lessonController.get);

app.use((_req: Request, _res: Response, next: NextFunction) => {
  const error: HttpException = new HttpException(404, "Route not found");
  next(error);
});
app.use(errorMiddleware);
(async function () {
  // mongoose.set("useNewUrlParser", true);
  // mongoose.set("useUnifiedTopology", true);
  const MONGODB_URL =
    process.env.MONGODB_URL || "mongodb://localhost/zhufengketang";
  await mongoose.connect(MONGODB_URL);
  await createSliders();
  await createLessons();
  const PORT = process.env.PORT || 8001;
  app.listen(PORT, () => {
    console.log(`Running on http://localhost:${PORT}`);
  });
})();
async function createSliders() {
  const sliders = await Slider.find();
  if (sliders.length == 0) {
    const sliders = [
      {
        url: "http://www.zhufengpeixun.cn/themes/jianmo2/images/reactnative.png",
      },
      { url: "http://www.zhufengpeixun.cn/themes/jianmo2/images/react.png" },
      { url: "http://www.zhufengpeixun.cn/themes/jianmo2/images/vue.png" },
      { url: "http://www.zhufengpeixun.cn/themes/jianmo2/images/wechat.png" },
      {
        url: "http://www.zhufengpeixun.cn/themes/jianmo2/images/architect.jpg",
      },
    ];
    Slider.create(sliders);
  }
}

async function createLessons() {
  const lessons = await Lesson.find();
  if (lessons.length == 0) {
    const lessons = [
      {
        order: 1,
        title: "1.React全栈架构",
        video: "http://img.zhufengpeixun.cn/gee2.mp4",
        poster: "http://www.zhufengpeixun.cn/react/img/react.jpg",
        url: "http://www.zhufengpeixun.cn/themes/jianmo2/images/react.png",
        priceText: "¥100.00元",
        price: 100,
        category: "react",
      },
      {
        order: 2,
        title: "2.React全栈架构",
        video: "http://img.zhufengpeixun.cn/gee2.mp4",
        poster: "http://www.zhufengpeixun.cn/react/img/react.jpg",
        url: "http://www.zhufengpeixun.cn/themes/jianmo2/images/react.png",
        priceText: "¥400.00元",
        price: 400,
        category: "react",
      },
      {
        order: 3,
        title: "3.React全栈架构",
        video: "http://img.zhufengpeixun.cn/gee2.mp4",
        poster: "http://www.zhufengpeixun.cn/react/img/react.jpg",
        url: "http://www.zhufengpeixun.cn/themes/jianmo2/images/react.png",
        priceText: "¥100.00元",
        price: 100,
        category: "react",
      },
      {
        order: 4,
        title: "4.React全栈架构",
        video: "http://img.zhufengpeixun.cn/gee2.mp4",
        poster: "http://www.zhufengpeixun.cn/react/img/react.jpg",
        url: "http://www.zhufengpeixun.cn/themes/jianmo2/images/react.png",
        priceText: "¥333.00元",
        price: 333,
        category: "react",
      },
      {
        order: 5,
        title: "5.React全栈架构",
        video: "http://img.zhufengpeixun.cn/gee2.mp4",
        poster: "http://www.zhufengpeixun.cn/react/img/react.jpg",
        url: "http://www.zhufengpeixun.cn/themes/jianmo2/images/react.png",
        priceText: "¥900.00元",
        price: 900,
        category: "react",
      },
      {
        order: 6,
        title: "6.Vue从入门到项目实战",
        video: "http://img.zhufengpeixun.cn/gee2.mp4",
        poster: "http://www.zhufengpeixun.cn/vue/img/vue.png",
        url: "http://www.zhufengpeixun.cn/themes/jianmo2/images/vue.png",
        priceText: "¥800.00元",
        price: 800,
        category: "vue",
      },
      {
        order: 7,
        title: "7.Vue从入门到项目实战",
        video: "http://img.zhufengpeixun.cn/gee2.mp4",
        poster: "http://www.zhufengpeixun.cn/vue/img/vue.png",
        url: "http://www.zhufengpeixun.cn/themes/jianmo2/images/vue.png",
        priceText: "400.00元",
        price: 400,
        category: "vue",
      },
      {
        order: 8,
        title: "8.Vue从入门到项目实战",
        video: "http://img.zhufengpeixun.cn/gee2.mp4",
        poster: "http://www.zhufengpeixun.cn/vue/img/vue.png",
        url: "http://www.zhufengpeixun.cn/themes/jianmo2/images/vue.png",
        priceText: "400.00元",
        price: 400,
        category: "vue",
      },
      {
        order: 9,
        title: "9.Vue从入门到项目实战",
        video: "http://img.zhufengpeixun.cn/gee2.mp4",
        poster: "http://www.zhufengpeixun.cn/vue/img/vue.png",
        url: "http://www.zhufengpeixun.cn/themes/jianmo2/images/vue.png",
        priceText: "¥160.00元",
        price: 160,
        category: "vue",
      },
      {
        order: 10,
        title: "10.Vue从入门到项目实战",
        video: "http://img.zhufengpeixun.cn/gee2.mp4",
        poster: "http://www.zhufengpeixun.cn/vue/img/vue.png",
        url: "http://www.zhufengpeixun.cn/themes/jianmo2/images/vue.png",
        priceText: "¥120.00元",
        price: 120,
        category: "vue",
      },
      {
        order: 11,
        title: "11.React全栈架构",
        video: "http://img.zhufengpeixun.cn/gee2.mp4",
        poster: "http://www.zhufengpeixun.cn/react/img/react.jpg",
        url: "http://www.zhufengpeixun.cn/themes/jianmo2/images/react.png",
        priceText: "¥666.00元",
        price: 666,
        category: "react",
      },
      {
        order: 12,
        title: "12.React全栈架构",
        video: "http://img.zhufengpeixun.cn/gee2.mp4",
        poster: "http://www.zhufengpeixun.cn/react/img/react.jpg",
        url: "http://www.zhufengpeixun.cn/themes/jianmo2/images/react.png",
        priceText: "¥150.00元",
        price: 150,
        category: "react",
      },
      {
        order: 13,
        title: "13.React全栈架构",
        video: "http://img.zhufengpeixun.cn/gee2.mp4",
        poster: "http://www.zhufengpeixun.cn/react/img/react.jpg",
        url: "http://www.zhufengpeixun.cn/themes/jianmo2/images/react.png",
        priceText: "¥200.00元",
        price: 200,
        category: "react",
      },
      {
        order: 14,
        title: "14.React全栈架构",
        video: "http://img.zhufengpeixun.cn/gee2.mp4",
        poster: "http://www.zhufengpeixun.cn/react/img/react.jpg",
        url: "http://www.zhufengpeixun.cn/themes/jianmo2/images/react.png",
        priceText: "¥900.00元",
        price: 900,
        category: "react",
      },
      {
        order: 15,
        title: "15.React全栈架构",
        video: "http://img.zhufengpeixun.cn/gee2.mp4",
        poster: "http://www.zhufengpeixun.cn/react/img/react.jpg",
        url: "http://www.zhufengpeixun.cn/themes/jianmo2/images/react.png",
        priceText: "¥800.00元",
        price: 900,
        category: "react",
      },
      {
        order: 16,
        title: "16.Vue从入门到项目实战",
        video: "http://img.zhufengpeixun.cn/gee2.mp4",
        poster: "http://www.zhufengpeixun.cn/vue/img/vue.png",
        url: "http://www.zhufengpeixun.cn/themes/jianmo2/images/vue.png",
        priceText: "¥700.00元",
        price: 700,
        category: "vue",
      },
      {
        order: 17,
        title: "17.Vue从入门到项目实战",
        video: "http://img.zhufengpeixun.cn/gee2.mp4",
        poster: "http://www.zhufengpeixun.cn/vue/img/vue.png",
        url: "http://www.zhufengpeixun.cn/themes/jianmo2/images/vue.png",
        priceText: "¥500.00元",
        price: 500,
        category: "vue",
      },
      {
        order: 18,
        title: "18.Vue从入门到项目实战",
        video: "http://img.zhufengpeixun.cn/gee2.mp4",
        poster: "http://www.zhufengpeixun.cn/vue/img/vue.png",
        url: "http://www.zhufengpeixun.cn/themes/jianmo2/images/vue.png",
        priceText: "¥300.00元",
        price: 300,
        category: "vue",
      },
      {
        order: 19,
        title: "19.Vue从入门到项目实战",
        video: "http://img.zhufengpeixun.cn/gee2.mp4",
        poster: "http://www.zhufengpeixun.cn/vue/img/vue.png",
        url: "http://www.zhufengpeixun.cn/themes/jianmo2/images/vue.png",
        priceText: "¥200.00元",
        price: 200,
        category: "vue",
      },
      {
        order: 20,
        title: "20.Vue从入门到项目实战",
        video: "http://img.zhufengpeixun.cn/gee2.mp4",
        poster: "http://www.zhufengpeixun.cn/vue/img/vue.png",
        url: "http://www.zhufengpeixun.cn/themes/jianmo2/images/vue.png",
        priceText: "¥1000.00元",
        price: 1000,
        category: "vue",
      },
    ];
    Lesson.create(lessons);
  }
}
