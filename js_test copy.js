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
const position = toGws84.getLocation(178052.848, 2501451.107);
// console.log(position.lat,",", position.lng);
const twd97 = toTwd97.getLocation(22.61338465512156, 120.30166733810103);
// console.log(twd97.x,",", twd97.y);

// const p = { x: 1, y: 0 };
// const center = { x: 0, y: 0 };
// const angle = 90;

// const rotated = rotatePoint(p, center, angle);
// console.log(rotated);
///正角度轉逆時針，負角度轉順時針
function pixelToGps( tapX, tapY, imageWidth, imageHeight, angle) {
  const x = tapX;
  const y = tapY;
  console.log(x, y);
  // const center = { x: 213.33333333333334, y: -376.15354484919703 };
  const center = { x: imageWidth / 2, y: imageHeight / 2 };
  console.log("center=", center.x, ",", center.y);
  const rotated = rotatePoint({ x: x, y: y }, center, angle);
  console.log(rotated.x, ",", rotated.y);
  return rotated;
  // const position = toGws84.getLocation(rotated.x,rotated.y);
  // console.log(position.lat,",", position.lng);

  // const position = toGws84.getLocation(x,y);
  // console.log(position.lat,",", position.lng);
}
// Point ({ x: 213.33333333333334, y: 376.15354484919703, z: null, m: null })
const result = pixelToGps(
  382.81618442290574,
  608.7000817554648,
  426.6666666666667,
  752.3070896983941,
  -135.0
);
console.log(result.x);
// pixelToGps(
//   1,
//   0,
//   0,
//   0,
//   90
// );
//257.926093 , 91.875838
