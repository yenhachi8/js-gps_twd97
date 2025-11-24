import { Trans97 } from 'trans97';

export const WGS84 = "wgs84";
export const TWD97 = "twd97";

// TWD97 -> WGS84
export const toWgs84 = new Trans97({ type: WGS84 });

// WGS84 -> TWD97
export const toTwd97 = new Trans97({ type: TWD97 });
///傳入轉完的點
///圖片起始點
export function pixelToWgs(result, scale, originTwd97Point) {
  const twd97X = originTwd97Point.x + result.x * scale;
  const twd97Y = originTwd97Point.y - result.y * scale;
  const position = toWgs84.getLocation(twd97X, twd97Y);
  return position;
}
