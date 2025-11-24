import * as Utils from "../indexes/index_utility.js";
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
      -(this.info.angle)
    );
    const position = Utils.pixelToWgs(
      rotatedResult,
      this.info.scale,
      this.info.originTwd97Point
    );
    return position;
  }

  //wgs -> twd97
  projectWgsToCanvas(projectInfo) {
    
    const targetTwd97Point = projectInfo.targetTwd97Point;
    const originTwd97Point = projectInfo.originTwd97Point;
    const scale = projectInfo.scale;
    const scaleCO = projectInfo.scaleCO;
    const dxMeter = targetTwd97Point.x - originTwd97Point.x;
    const dyMeter = (originTwd97Point.y - targetTwd97Point.y);
    const canvasCoordinateX = (dxMeter / scale) * scaleCO;
    const canvasCoordinateY = (dyMeter / scale) * scaleCO;
    return { x: canvasCoordinateX, y: canvasCoordinateY };
  }
  twdToCanvas(projectInfo) {
    const center = this.info.center;
    const angle = this.info.angle;
    const projectResult = this.projectWgsToCanvas(projectInfo);
    const rotatedResult = Utils.rotatePoint(projectResult, center, angle);
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
