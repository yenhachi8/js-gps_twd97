// const { Trans97 } = require("trans97");
// const { rotatePoint, toGws84, toTwd97 } = require("./utility.js");

import * as Models from "./indexes/index_model.js";
import * as Util from "./indexes/index_utility.js";


//
const tapPoint = new Models.ModelPoint(46, 164);
const imgSize = new Models.ModelImgSize({ width: 250, height: 200 });
const angle = -90;
const scale = 0.15;
//圖片起始點
const originTwd97Point = new Models.ModelTwd97Point(
224857.97550000003,2658659.1047499995
);
const tapInfo = new Models.ModelTapInfo(
  tapPoint,
  imgSize,
  angle,
  scale,
  originTwd97Point,
);
const wgs = Util.MapUtility.canvasToWgs(tapInfo);
console.log("輸入 pixel -> wgs",wgs.lat, ",", wgs.lng);


const targetWgs =  new Models.ModelGpsPoint(24.03243072429292, 120.75093556033729);
const targetTwd97 = Util.toTwd97.getLocation(targetWgs.lat, targetWgs.lng);
const mapProjectInfo = new Models.ModelProjectInfo(
  new Models.ModelTwd97Point(targetTwd97.x, targetTwd97.y),
  new Models.ModelTwd97Point(224646.19175000003,2658660.8697499996),
  //TODO: 待調整
  new Models.ModelPoint(150,-150) ,
  -150,
  0.15,
  1
);


const res = Util.MapUtility.twdToCanvas(mapProjectInfo);
console.log(res.x, ",", res.y);
//旋轉 base case
const mapInfo = new Models.ModelProjectInfo(
  new Models.ModelTwd97Point(1, 0),
  new Models.ModelTwd97Point(0, 0),
  new Models.ModelPoint(0, 0),
  90,
  1,
  1
);
const res0 = Util.MapUtility.twdToCanvas(mapInfo);
console.log(res0.x, ",", res0.y);


const dis = Util.MapUtility.calculateDistance(tapPoint, new Models.ModelPoint(0,0),scale);
console.log( Util.MapUtility.meterToYard(dis ));
