// const { Trans97 } = require("trans97");
// const { rotatePoint, toGws84, toTwd97 } = require("./utility.js");

import * as Models from "./indexes/index_model.js";
import * as Util from "./indexes/index_utility.js";


//ex1 搭配 fairway2, green (rotate_20251119_114231.jpg)
//=> canvas point 
//<= wgs座標
//==================================================
const tapPoint = new Models.ModelPoint(111,215);
const imgSize = new Models.ModelImgSize({ width: 250, height: 250 });
const angle = -135;
const scale = 0.15;
//圖片起始點
const originTwd97Point = new Models.ModelTwd97Point(
224543.62,2658970.12
);
const center = new Models.ModelPoint(43.60000000005425, 1320.6999999998768);
const tapInfo = new Models.ModelTapInfo(
  tapPoint,
  imgSize,
  angle,
  scale,
  originTwd97Point,
  center,
);
const wgs = Util.MapUtility.canvasToWgs(tapInfo);
console.log(wgs.lat, ",", wgs.lng);

//==================================================
//ex2. 霧峰球場，第12洞 搭配 fairway2, green (rotate_20251119_114231.jpg)
//=> twd97 point,
//<= canvas point
//把Wgs座標放進canvas上
const targetWgs =  new Models.ModelGpsPoint(24.032524734103653 , 120.75087838025009);
const targetTwd97 = Util.toTwd97.getLocation(targetWgs.lat, targetWgs.lng);
const mapProjectInfo = new Models.ModelProjectInfo(
  new Models.ModelTwd97Point(targetTwd97.x, targetTwd97.y),
  new Models.ModelTwd97Point(224543.62,2658970.12),
  //TODO: 待調整
  new Models.ModelPoint(43.60000000005425, 1320.6999999998768),    
  -135,
  0.15,
  1 
);
const res = Util.MapUtility.twdToCanvas(mapProjectInfo);
console.log(res.x, ",", res.y);

//ex.3 
const tapPoint2 = new Models.ModelPoint(0, 10);
const scale2 = 0.15;
const dis = Util.MapUtility.calculateDistance(tapPoint2, new Models.ModelPoint(0,0),scale2);
console.log( Util.MapUtility.meterToYard(dis ));
//==================================================


