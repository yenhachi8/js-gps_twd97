import * as Utils from "../indexes/index_utility.js";
export class ImgInfo {
  constructor(tapPoint, imgSize, angle, scale, originTwd97Point) {
    this.tapPoint = tapPoint;
    this.imgSize = imgSize;
    this.angle = angle;
    this.scale = scale;
    this.originTwd97Point = originTwd97Point;
  }
}
export class ImagePorjectInfo{
  constructor(targetTwd97Point, originTwd97Point, scale, scaleCO) {
    this.targetTwd97Point = targetTwd97Point;
    this.originTwd97Point = originTwd97Point;
    this.scale = scale;
    this.scaleCO = scaleCO;
  }
}
// 1 meter = 1.0936133 yard
export const yardUnit = 1.0936133;
export class MapUtility {
  constructor(info) {
    this.info = info;
  }

  canvasToWgs() {
    const rotatedResult = Utils.rotate(
      this.info.tapPoint,
      this.info.imgSize,
      this.info.angle
    );
    const position = Utils.pixelToWgs(
      rotatedResult,
      this.info.scale,
      this.info.originTwd97Point
    );
    return position;
  }
  //scale = 地圖縮放比例
  //scaleCO = scaleCanvasOrigin 畫布和圖片的縮放比例
  projectWgsToCanvas(projectInfo) {
    //wgs -> twd97
    targetTwd97Point =projectInfo.targetTwd97Point;
    originTwd97Point =projectInfo.originTwd97Point;
    scale=projectInfo.scale;
    scaleCO=projectInfo.scaleCO;
    const dxMeter= targetTwd97Point.x - originTwd97Point.x;
    const dyMeter=originTwd97Point.y=targetTwd97Point.y ;
    const canvasCoordinateX= dxMeter/scale * scaleCO;
    const canvasCoordinateY= dyMeter/scale * scaleCO;
    return { x: canvasCoordinateX, y: canvasCoordinateY };
  }
  wgsToCanvas(projectInfo,angle,cneter){
    const projectResult = this.projectWgsToCanvas(projectInfo);
    const rotatedResult = Utils.rotatePoint(projectResult, cneter, angle);
    return rotatedResult;
  }
  calculateDistance(p1, p2, scale) {
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    return Math.sqrt(dx * dx + dy * dy) * scale;
  }
  meterToYard(meter) {
    return meter * yardUnit;
  }
}
