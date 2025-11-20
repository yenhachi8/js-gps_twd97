const { Trans97 } = require("trans97");
const WGS84 = "wgs84";
const TWD97 = "twd97";
// 把twd97 轉成 wgs84
const toGws84 = new Trans97({
  type: WGS84,
});
// 把wgs84 轉成 twd97
const toTwd97 = new Trans97({
  type: TWD97,
});
function rotatePoint(point, center, angleDeg, ndigits = 6) {
  const angleRad = (-angleDeg * Math.PI) / 180;

  const dx = point.x - center.x;
  const dy = point.y - center.y;

  const cosA = Math.cos(angleRad);
  const sinA = Math.sin(angleRad);

  const qx = cosA * dx - sinA * dy + center.x;
  const qy = sinA * dx + cosA * dy + center.y;

  return {
    x: roundTo(qx, ndigits),
    y: roundTo(qy, ndigits),
  };
}

/** 將數值四捨五入到指定小數位 */
function roundTo(value, digits) {
  const factor = 10 ** digits;
  return Math.round(value * factor) / factor;
}
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}
class ImgSize {
  constructor({ width, height }) {
    this.width = width;
    this.height = height;
  }
}
class GpsPoint {
  constructor(lat, lng) {
    this.lat = lat;
    this.lng = lng;
  }
}
class Twd97Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

///正角度轉逆時針，負角度轉順時針
function pixelRotate({ tap: Point, imgSize: ImgSize, angle: number }) {
  const x = tapPoint.x;
  const y = tapPoint.y;
  const center = { x: imgSize.width / 2, y: imgSize.height / 2 };
  const rotated = rotatePoint(tapPoint, center, angle);
  return rotated;
}
///傳入轉完的點
///圖片起始點
function pixelToGps(result, scale, originTwd97Point) {
  const twd97X = originTwd97Point.x + result.x * scale;
  const twd97Y = originTwd97Point.y - result.y * scale;
  const position = toGws84.getLocation(twd97X, twd97Y);
  return position;
}
class ImgInfo{
  constructor({tapPoint, imgSize, angle, scale, originTwd97Point}){
    this.tapPoint = tapPoint;
    this.imgSize = imgSize;
    this.angle = angle;
    this.scale = scale;
    this.originTwd97Point = originTwd97Point;
  }
  transToGps(){
    const result = pixelRotate(this.tapPoint, this.imgSize, this.angle);
    const position = pixelToGps(result, this.scale, this.originTwd97Point);
    return position;
  }
}
const info = new ImgInfo({
  tapPoint,
  imgSize,
  angle,
  scale,
  originTwd97Point
})

const tapPoint = new Point(205, 162);
const imgSize = new ImgSize({ width: 250, height: 200 });
const angle = -90;
const scale = 0.15;
//圖片起始點
const originTwd97Point = new Twd97Point(224857.97550000003, 2658659.1047499995);
const position1 = info.transToGps();
console.log(position1.lat, ",", position1.lng);
