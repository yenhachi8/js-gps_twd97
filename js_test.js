// const { Trans97 } = require("trans97");
// const { rotatePoint, toGws84, toTwd97 } = require("./utility.js");

import * as Models from "./indexes/index_model.js";
import * as MapUtility from "./utlis/map.js";

const tapPoint = new Models.Point(163, 217);
const imgSize = new Models.ImgSize({ width: 200, height: 250 });
const angle = -170;
const scale = 0.15;
//圖片起始點
const originTwd97Point = new Models.Twd97Point(
225268.86850000004,2658213.75424999985
);
const info = new MapUtility.ImgInfo(
  tapPoint,
  imgSize,
  angle,
  scale,
  originTwd97Point,
);
const mapUtility = new MapUtility.MapUtility( info );
const position1 = mapUtility.canvasToWgs();
console.log(position1.lat, ",", position1.lng);


const dis = mapUtility.calculateDistance(tapPoint, new Models.Point(0,0),scale);
console.log( mapUtility.meterToYard(dis ));

