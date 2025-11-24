// 把經緯度投到畫布上
export class ModelProjectInfo {
  constructor(targetTwd97Point, originTwd97Point,center,angle, scale, scaleCO) {
    this.targetTwd97Point = targetTwd97Point;
    this.originTwd97Point = originTwd97Point;
    this.scale = scale; //scale = 地圖縮放比例
    this.scaleCO = scaleCO; //scaleCO = scaleCanvasOrigin 畫布和圖片的縮放比例
    this.center = center;
    this.angle = angle;
  }
}
