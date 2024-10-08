function startLoader() {
    let counterElement = document.querySelector(".counter");
    let currentValue = 0;

    function updateCounter() {
        if (currentValue === 100) {
            return;
        }

        currentValue += Math.floor(Math.random() * 10) + 1;

        if (currentValue > 100) {
            currentValue = 100;
        }

        counterElement.textContent = currentValue + "%";

        let delay = Math.floor(Math.random() * 200) + 250;
        setTimeout(updateCounter, delay);
    }
    updateCounter();
}

gsap.from(".circles", 2, {
    top: "-100%",
    ease: "elastic.out",
    delay: 0.5,
});

gsap.to(".circle-inner", 1, {
    width: "75px",
    height: "75px",
    ease: "power4.inOut",
    delay: 2,
});

gsap.to(".circle-inner-rotator", 1, {
    scale: 1,
    ease: "power4.inOut",
    delay: 0.5,
});

let tl = gsap.timeline({ repeat: -1 });

tl.fromTo(".circles",
    { rotation: 0 },
    { rotation: 90, duration: 2.5, ease: "power4.inOut" }
)
    .fromTo(".circles",
        { rotation: 90 },
        { rotation: 180, duration: 2.5, ease: "power4.inOut" }
    )
    .fromTo(".circles",
        { rotation: 180 },
        { rotation: 270, duration: 2.5, ease: "power4.inOut" }
    )
    .fromTo(".circles",
        { rotation: 270 },
        { rotation: 360, duration: 2.5, ease: "power4.inOut" }
    );

// gsap.to(".block", 0.75, {
//     display: "block",
//     height: "200px",
//     ease: "power4.inOut",
//     delay: 4,
// });

// gsap.to(".block", 0.75, {
//     width: "800px",
//     ease: "power4.inOut",
//     delay: 4.5,
// });

gsap.fromTo(".containers", {
    duration: 2,
    left: "100%",
    scale: 0.5,
    ease: "power4.inOut",
    delay: 6,
}, {
    duration: 2,
    left: "50%",
    transform: "translateX(-50%)",
    scale: 0.5,
    ease: "power4.inOut",
    delay: 6,
});

gsap.to("circles", 1.5, {
    rotation: 360,
    ease: "power4.inOut",
    delay: 6.5,
});

gsap.to(".loader", 2.5, {
    // scale: 0,
    transform: "translateY(-100%)",
    ease: "power4.inOut",
    delay: 6,
});

gsap.to(".containers", 2, {
    scale: 1,
    ease: "power4.inOut",
    delay: 5.9,
});

gsap.to(".counter", 2, {
    opacity: 0,
    ease: "power4.inOut",
    delay: 5,
})

startLoader();

document.addEventListener("DOMContentLoaded", function () {
    setTimeout(function () {
        document.querySelector('.loader').style.display = 'none';

        gsap.fromTo(
            ".hero h1",
            { y: 100, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 2,
                ease: "power4.out",
                delay: 0.5,
            }
        );
    }, 7250);
});

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