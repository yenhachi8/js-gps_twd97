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
  const angleRad = (angleDeg * Math.PI) / 180;

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

///正角度轉逆時針，負角度轉順時針
function pixelRotate(tapX, tapY, imageWidth, imageHeight, angle) {
  const x = tapX;
  const y = tapY;
  const center = { x: imageWidth / 2, y: imageHeight / 2 };
  const rotated = rotatePoint({ x: x, y: y }, center, angle);
  return rotated;
}

///傳入轉完的點
///圖片起始點
function pixelToGps(result, scale, originX, originY) {
  twd97X = originX + result.x * scale;
  twd97Y = originY - result.y * scale;
  const position = toGws84.getLocation(twd97X, twd97Y);
  console.log("twd97",twd97X,",", twd97Y);
  console.log(position.lat, ",", position.lng);
}
const result = pixelRotate(124, 100, 250, 200, -90);
console.log(result);
pixelToGps(result,0.15,224857.97550000003,2658659.1047499995);
