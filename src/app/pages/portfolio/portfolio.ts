import {
  AfterViewInit,
  Component,
  ElementRef,
  QueryList,
  Renderer2,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { gsap } from 'gsap';
@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './portfolio.html',
  styleUrl: './portfolio.css',
})
export class Portfolio implements AfterViewInit {
  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
  ) {}
  @ViewChildren('animatedText') texts!: QueryList<ElementRef>;
  @ViewChild('snowContainer') container!: ElementRef;

  ngAfterViewInit() {
    this.texts.forEach((text, index) => {
      this.animateText(text, index);
    });
    const elements = this.el.nativeElement.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.2 },
    );

    elements.forEach((el: Element) => observer.observe(el));

    this.createSnow(200);
  }

  animateText(el: ElementRef, index: number): void {
    const tl = gsap.timeline();

    this.texts.forEach((textRef) => {
      const el = textRef.nativeElement;
      const content = el.innerText;

      el.innerHTML = content
        .split('')
        .map((char: string) => (char === ' ' ? `<span>&nbsp;</span>` : `<span>${char}</span>`))
        .join('');

      tl.from(el.children, {
        opacity: 0,
        y: 30,
        stagger: 0.05,
        duration: 0.5,
        ease: 'power2.out',
      });
    });
  }

  copos: string[] = ['icons/copo.png', 'icons/copo-amarillo.png', 'icons/copo-azul.png'];
  createSnow(total: number) {
    for (let i = 0; i < total; i++) {
      const snow = this.renderer.createElement('img');

      // 👇 seleccionar imagen aleatoria
      const randomIndex = Math.floor(Math.random() * this.copos.length);
      const randomImage = this.copos[randomIndex];

      this.renderer.setAttribute(snow, 'src', randomImage);
      this.renderer.addClass(snow, 'snow');

      this.renderer.setStyle(snow, 'left', Math.random() * 100 + 'vw');

      const size = 10 + Math.random() * 25;
      this.renderer.setStyle(snow, 'width', size + 'px');

      const duration = 10 + Math.random() * 10;
      this.renderer.setStyle(snow, 'animation-duration', duration + 's');

      this.renderer.setStyle(snow, 'animation-delay', Math.random() * 20 + 's');

      this.renderer.appendChild(this.container.nativeElement, snow);
    }
  }
}
