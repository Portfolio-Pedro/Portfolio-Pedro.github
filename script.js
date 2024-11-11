// Configuração do Three.js

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
const container = document.getElementById('hero-3d');

// Configuração do renderer
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setPixelRatio(window.devicePixelRatio);
container.appendChild(renderer.domElement);

// Criação do objeto 3D (uma esfera complexa)
const geometry = new THREE.IcosahedronGeometry(1, 1);
const material = new THREE.MeshPhongMaterial({
    color: 0x007bff,
    wireframe: true,
    wireframeLinewidth: 2,
});
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// Iluminação
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

// Posicionamento da câmera
camera.position.z = 3;

// Animação da esfera
function animate() {
    requestAnimationFrame(animate);
    sphere.rotation.x += 0.01;
    sphere.rotation.y += 0.01;
    renderer.render(scene, camera);
}
animate();

// Responsividade do canvas
window.addEventListener('resize', () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
});

// Animações de scroll suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Animações de entrada dos elementos
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Aplicar animações aos elementos
document.querySelectorAll('.about-card, .feature-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
});

// Formulário de contato
const contactForm = document.querySelector('.contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Aqui você pode adicionar a lógica para enviar o formulário
    alert('Mensagem enviada com sucesso!');
    contactForm.reset();
});