import {Component, ElementRef, Input, NgZone, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
})
export class ProgressComponent implements OnInit {
  private currentProgess = 0;
  private animationTimer: number;

  constructor(private ngZone: NgZone) {}

  // radius
  _radius: number;
  get radius(): number {
    return this._radius;
  }
  @Input() set radius(radius: number) {
    const _radius: number = parseInt(radius as unknown as string, 0);
    try {
      if (typeof _radius !== 'number' || Number.isNaN(_radius) || _radius < 50) {
        throw new Error('Radius must be a "number" and bigger than 50, falling back to 50');
      }
      this._radius = _radius;
    } catch (e) {
      console.error(e);
      this._radius = 50;
    }
  }

  // progress
  _progress: number;
  get progress(): number {
    return this._progress;
  }
  @Input() set progress(progress: number) {
    const _progress: number = parseInt(progress as unknown as string, 0);
    try {
      if (typeof _progress !== 'number' || Number.isNaN(_progress) || (_progress < 0 || _progress > 100)) {
        throw new Error('Progress must be a "number" and between "0" and "100"');
      }
      this._progress = _progress;
    } catch (e) {
      console.error(e);
      if (typeof _progress === 'number') {
        if (_progress > 100) {
          this._progress = 100;
        } else {
          this._progress = 0;
        }
      } else {
        this._progress = 0;
      }
    }
  }

  // color
  @Input() color: string;

  @ViewChild('canvas', { static: true })
  canvas: ElementRef<HTMLCanvasElement>;

  private ctx: CanvasRenderingContext2D;

  ngOnInit(): void {
    const canvas = this.canvas.nativeElement;
    this.ctx = canvas.getContext('2d');

    this.ngZone.runOutsideAngular(() => this.tick());
    this.animationTimer = setInterval(() => this.tick(), 15);
  }

  tick(): void {
    const { ctx } = this;
    const { canvas } = ctx;

    if (this.currentProgess < this.progress) {
      ++this.currentProgess;
    } else {
      clearInterval(this.animationTimer);
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, (this.currentProgess / 100 * this.radius) / 2, 0, 2 * Math.PI, false);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.stroke();
  }
}
