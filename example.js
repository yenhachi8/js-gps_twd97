// const { Trans97 } = require("trans97");
// const { rotatePoint, toGws84, toTwd97 } = require("./utility.js");

import * as Models from "./indexes/index_model.js";
import * as Util from "./indexes/index_utility.js";


//ex1 搭配 fairway2, green (rotate_20251119_114231.jpg)
//=> canvas point 
//<= wgs座標
//==================================================
const tapPoint = new Models.ModelPoint(204, 177);
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
console.log(wgs.lat, ",", wgs.lng);
//==================================================
//==================================================
//ex2. 霧峰球場，第12洞 搭配 fairway2, green (rotate_20251119_114231.jpg)
//=> twd97 point,
//<= canvas point
//把Wgs座標放進canvas上
const targetWgs =  new Models.ModelGpsPoint(24.029116139280383, 120.75142754596479);
const targetTwd97 = Util.toTwd97.getLocation(targetWgs.lat, targetWgs.lng);

// const targetTwd97 = new Models.ModelTwd97Point(224712.42805275286,2658269.26535896);  
const mapProjectInfo = new Models.ModelProjectInfo(
  new Models.ModelTwd97Point(targetTwd97.x, targetTwd97.y),
  new Models.ModelTwd97Point(224362.0,2658617.6049999995),
  //TODO: 待調整
  new Models.ModelPoint(213.33333333333334,363.16472114137486) ,
  -110,
  0.15,
  0.20752269779507135 
);
const res = Util.MapUtility.twdToCanvas(mapProjectInfo);
console.log(res.x, ",", res.y);
// res=> 232.078071 , 67.44081
//==================================================


//==================================================
//ex.3 
const tapPoint2 = new Models.ModelPoint(0, 10);
const scale2 = 0.15;
const dis = Util.MapUtility.calculateDistance(tapPoint2, new Models.ModelPoint(0,0),scale2);
console.log( Util.MapUtility.meterToYard(dis ));
//==================================================



// // 旋轉 base case , output => (0,1)
// const mapInfo = new Models.ModelProjectInfo(
//   new Models.ModelTwd97Point(1, 0),
//   new Models.ModelTwd97Point(0, 0),
//   new Models.ModelPoint(0, 0),
//   90,
//   1,
//   1
// );
// const res0 = Util.MapUtility.twdToCanvas(mapInfo);
// console.log(res0.x, ",", res0.y);
