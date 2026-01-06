// 把畫布上的點轉成經緯度
export class ModelTapInfo {
  constructor(tapPoint,  angle, scale, originTwd97Point,centerPoint) {
    this.tapPoint = tapPoint;
    this.angle = angle;
    this.scale = scale;
    this.originTwd97Point = originTwd97Point;
    this.centerPoint = centerPoint; // 因為是從子圖再裁切，所以旋轉中心點要用父圖的中心點
  }
}
