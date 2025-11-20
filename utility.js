// utility.js
import { Trans97 } from 'trans97';

export const WGS84 = "wgs84";
export const TWD97 = "twd97";

// TWD97 -> WGS84
export const toWgs84 = new Trans97({ type: WGS84 });

// WGS84 -> TWD97
export const toTwd97 = new Trans97({ type: TWD97 });

/**
 * 旋轉一個點繞中心點旋轉指定角度
 * @param {{x: number, y: number}} point - 原始點
 * @param {{x: number, y: number}} center - 中心點
 * @param {number} angleDeg - 旋轉角度（度）
 * @param {number} [ndigits=6] - 小數位數
 * @returns {{x: number, y: number}} - 旋轉後的點
 */
export function rotatePoint(point, center, angleDeg, ndigits = 6) {
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


