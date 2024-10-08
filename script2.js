const lenis = new Lenis();

lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
    lenis.raf(time * 500);
});

gsap.ticker.lagSmoothing(0);

gsap.registerPlugin(ScrollTrigger, CustomEase);

CustomEase.create(
    "hop",
    "M0,0 C0.354,0 0.464,0.133 0.498,0.502 0.532,0.872 0.651,1 1,1"
);

const menuToggle = document.querySelector(".menu-toggle");
const menu = document.querySelector(".menu");
const links = document.querySelectorAll(".link");
const socialLinks = document.querySelectorAll(".socials .sub-col a");
let isAnimating = false;

const splitTextIntoSpans = (selector) => {
    let elements = document.querySelectorAll(selector);
    elements.forEach((elements) => {
        let text = elements.innerText;
        let splitText = text
            .split("")
            .map(function (char) {
                return `<span>${char === " " ? "&nbsp;&nbsp;" : char}</span>`;
            })
            .join("");
        elements.innerHTML = splitText;
    });
}
splitTextIntoSpans(".header h2");

menuToggle.addEventListener("click", () => {
    if (isAnimating) return;
    if (menuToggle.classList.contains("closed")) {
        menuToggle.classList.remove("closed");
        menuToggle.classList.add("opened");

        isAnimating = true;

        gsap.to(menu, {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            ease: "hop",
            duration: 1.5,
            onStart: () => {
                menu.computedStyleMap.pointerEvents = "all";
            },
            onComplete: () => {
                isAnimating = false;
            }
        });

        gsap.to(links, {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            delay: 0.85,
            duration: 1,
            ease: "power3.out",
        });

        gsap.to(socialLinks, {
            y: 0,
            opacity: 1,
            stagger: 0.05,
            delay: 0.85,
            duration: 1,
            ease: "power3.out",
        });

        gsap.to(".video-wrapper", {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            ease: "hop",
            duration: 1.5,
            delay: 0.5,
        });

        gsap.to(".header h2 span", {
            rotateY: 0,
            stagger: 0.05,
            delay: 0.75,
            duration: 1.5,
            ease: "power4.out",
        });

        gsap.to(".header h2 span", {
            y: 0,
            scale: 1,
            stagger: 0.05,
            delay: 0.5,
            duration: 1.5,
            ease: "power4.out",
        });

    } else {
        menuToggle.classList.remove("opened");
        menuToggle.classList.add("closed");

        isAnimating = true;

        gsap.to(menu, {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
            ease: "hop",
            duration: 1.5,
            onComplete: () => {
                menu.style.pointerEvents = "none";
                gsap.set(menu, {
                    clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
                });

                gsap.set(links, { y: 30, opacity: 0 });
                gsap.set(socialLinks, { y: 30, opacity: 0 });
                gsap.set(".video-wrapper", {
                    clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
                });
                gsap.set(".header h2 span", {
                    y: 500,
                    rotateY: 90,
                    scale: 0.75,
                });

                isAnimating = false;
            }
        });
    }
});

ScrollTrigger.create({
    trigger: ".pinned",
    start: "top top",
    endTrigger: ".whitespace",
    end: "bottom top",
    pin: true,
    pinSpacing: false,
});

ScrollTrigger.create({
    trigger: ".header-info",
    start: "top top",
    endTrigger: ".whitespace",
    end: "bottom top",
    pin: true,
    pinSpacing: false,
});

ScrollTrigger.create({
    trigger: ".pinned",
    start: "top top",
    endTrigger: ".header-info",
    end: "bottom bottom",
    onUpdate: (self) => {
        const rotation = self.progress * 360;
        gsap.to(".revealer", { rotation });
    },
});

ScrollTrigger.create({
    trigger: ".pinned",
    start: "top top",
    endTrigger: ".header-info",
    end: "bottom bottom",
    onUpdate: (self) => {
        const progress = self.progress;
        const clipPath = `polygon(
            ${45 - 45 * progress}% ${0}%,
            ${55 + 45 * progress}% ${0}%,
            ${55 + 45 * progress}% 100%,
            ${45 - 45 * progress}% 100%
        )`;
        gsap.to(".revealer-1", ".revealer-2", {
            clipPath: clipPath,
            ease: "none",
            duration: 0,
        });
    }
});

ScrollTrigger.create({
    trigger: ".pinned",
    start: "top top",
    endTrigger: ".header-info",
    end: "bottom bottom",
    onUpdate: (self) => {
        const progress = self.progress;
        const clipPath = `polygon(
            ${45 - 45 * progress}% ${0}%,
            ${55 + 45 * progress}% ${0}%,
            ${55 + 45 * progress}% 100%,
            ${45 - 45 * progress}% 100%
        )`;

        gsap.to([".revealer-1", ".revealer-2"], {
            clipPath: clipPath,
            ease: "none",
            duration: 0,
        });
    }
});

ScrollTrigger.create({
    trigger: ".header-info",
    start: "top top",
    end: "bottom 50%",
    scrub: 1,
    onUpdate: (self) => {
        const progress = self.progress;
        const left = 35 + 15 * progress;
        gsap.to(".revealer", {
            left: `${left}%`,
            ease: "none",
            duration: 0,
        })
    }
});

ScrollTrigger.create({
    trigger: ".whitespace",
    start: "top 50%",
    end: "bottom bottom",
    scrub: 1,
    onUpdate: (self) => {
        const scale = 1 + 12 * self.progress;
        gsap.to(".revealer", {
            scale: scale,
            ease: "none",
            duration: 0,
        })
    }
})