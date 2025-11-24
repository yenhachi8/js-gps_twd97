export function rotatePoint(point, center, angleDeg, ndigits = 6) {
  const angleRad = (-angleDeg * Math.PI) / 180;//角度加上負號比較符合直覺

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

export function rotate( tapPoint, imgSize , angle  ) {
  const x = tapPoint.x;
  const y = tapPoint.y;
  const center = { x: imgSize.width / 2, y: imgSize.height / 2 };
  const rotated = rotatePoint(tapPoint, center, angle);
  return rotated;
}
