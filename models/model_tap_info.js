// 把畫布上的點轉成經緯度
export class ModelTapInfo {
  constructor(tapPoint, imgSize, angle, scale, originTwd97Point,centerPoint) {
    this.tapPoint = tapPoint;
    this.imgSize = imgSize;
    this.angle = angle;
    this.scale = scale;
    this.originTwd97Point = originTwd97Point;
    this.centerPoint = centerPoint;
  }
}
