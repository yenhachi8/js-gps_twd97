// const { Trans97 } = require("trans97");
// const { rotatePoint, toGws84, toTwd97 } = require("./utility.js");

import * as Models from "./indexes/index_model.js";
import * as MapUtility from "./utlis/map.js";

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
const mapUtility = new MapUtility.MapUtility( tapInfo );
const position1 = mapUtility.canvasToWgs();
console.log(position1.lat, ",", position1.lng);

const dis = mapUtility.calculateDistance(tapPoint, new Models.ModelPoint(0,0),scale);
console.log( mapUtility.meterToYard(dis ));

//todo: 把需要的資訊都包進
const mapProjectInfo = new Models.ModelProjectInfo(
  new Models.ModelTwd97Point(224445.229795377, 2658857.6739020883),
  new Models.ModelTwd97Point(224437.96000000002, 2659003.195),
  new Models.ModelPoint(213.33333333333334, 376.15354484919703),
  -135,
  0.15,
  0.25068546807677244
);
// const mapInfo = new MapUtility.ImagePorjectInfo(
//   new Models.Twd97Point(1, 0),
//   new Models.Twd97Point(0, 0),
//   new Models.Point(0, 0),
//   -90,
//   1,
//   1
// );
const mapUtility2 = new MapUtility.MapUtility(mapProjectInfo);
const res = mapUtility2.twdToCanvas(mapProjectInfo);

console.log(mapUtility2.info);
console.log(res.x, ",", res.y);
