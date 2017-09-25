const amountOfParticles = 100;
const particleLifeSpan = 5;

let particles = [];

const getRandom = (ceil) => {
    return Math.floor((Math.random() * ceil) + 1);
}

const floatParticle = (particle) => {
    let rotation = particle.rotation;
    let rand;

    if (particle.rotation > 180) {
        rotation = rotation - 180;
        rand = Math.floor(getRandom(rotation) / 10);
        rand2 = Math.floor(getRandom(rotation) / 10);

        particle.x -= rand;
        particle.y -= rand2;
    } else {
        rand = Math.floor(getRandom(rotation) / 10);
        rand2 = Math.floor(getRandom(rotation) / 10);
        particle.x += rand;
        particle.y += rand2;
    }

    particle.size /= Math.floor(rand / 2);

    updateParticle(particle);
};

const floatParticles = () => {
    for (let i=0; i < particles.length; i++) {
        let particle = particles[i];
        if (particle.count > particleLifeSpan) {
            particle.element.fadeOut();
            if (particle.element.css("display") === "none") {
                console.log("remove particle");
                particle.element.remove();
                particles.splice(i, 1);
                i--;
            }
        }
        particle.count++;
        floatParticle(particle);
    }
}

const updateParticle = (particle) => {
    let particleElement = particle.element;
    particleElement.css("width", `${ particle.size }px`);
    particleElement.css("height", `${ particle.size }px`);
    particleElement.css("left", `${ particle.x }px`);
    particleElement.css("top", `${ particle.y }px`);
}

const spawnParticle = (particle) => {
    let particleElement = document.createElement("div");
    particleElement = $(particleElement);
    particleElement.addClass("particle");
    let body = $("body");
    body.append(particleElement);
    return $(".particle").last();
}

const explode = (element, particles) => {
    console.log("BOOM!");
    const color = element.css("background-color");
    const particleWidth = element.width() / amountOfParticles * 2;
    const particleHeight = element.height() / amountOfParticles * 2;
    const particleSize = (particleWidth + particleHeight) / 2;
    const rotPerParticle = Math.floor(360 / amountOfParticles);
    for (let i=0; i < amountOfParticles; i++) {
        let particle = {
            x: element.position().left + (element.width() / 2),
            y: element.position().top + (element.height() / 2),
            size: particleSize,
            count: 0,
            rotation: rotPerParticle * (i + 1)
        }
        particle.element = spawnParticle(particle);
        updateParticle(particle);
        particles.push(particle);
        particle.element.css("background-color", color);
    }
    element.fadeOut();
    window.setInterval(floatParticles, 30);
    floatParticles();
};

function triggerExplode(e) {
    e.preventDefault();
    explode($(this), particles);
};

$(() => {
    $("#box").on("click", triggerExplode);
    $("#box2").on("click", triggerExplode);
})