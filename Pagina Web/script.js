

        document.addEventListener('DOMContentLoaded', () => {
            const header = document.querySelector('.story-header');
            const headerTitle = header.querySelector('h1');
            const videoElement = document.getElementById('vid-fondo');
            const navLinks = document.querySelectorAll('.nav-link');
            const sections = document.querySelectorAll('section');

            // Lista de videos de fondo por capítulo
            const videos = [
                '../Video y Imagenes/video1.mp4',
                '../Video y Imagenes/video2.mp4',
                '../Video y Imagenes/video3.mp4',
                '../Video y Imagenes/video4.mp4'
            ];

            // Función para cambiar el video de fondo suavemente
            function changeVideo(index) {
                if (index >= 0 && index < videos.length) {
                    videoElement.style.transition = 'opacity 1s ease';
                    videoElement.style.opacity = 0;

                    setTimeout(() => {
                        videoElement.src = videos[index];
                        videoElement.load();
                        videoElement.play();
                        videoElement.style.opacity = 1;
                    }, 500); // Tiempo para el fade-out (0.5s)
                }
            }

            // Función para actualizar efectos de scroll solo en el h1
            function updateHeader() {
                const scrollPosition = window.scrollY;
                const headerHeight = window.innerHeight;
                const scrollPercentage = (scrollPosition / headerHeight) * 100;

                if (scrollPercentage <= 100) {
                    // Calcular opacidad para desvanecer gradualmente
                    const opacity = 1 - (scrollPercentage / 100);
                    // Calcular la escala para reducir el tamaño del título
                    const scale = 1 - (scrollPercentage / 200);
                    // Mover hacia arriba usando translateY y agregar movimiento horizontal
                    const translateY = -scrollPercentage * 1.5;
                    const translateX = scrollPercentage * 0.5; // Movimiento horizontal

                    header.style.opacity = opacity; // Reduce la opacidad gradualmente
                    headerTitle.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`; // Mueve en ambas direcciones y reduce el tamaño
                } else {
                    header.style.opacity = 0; // Mantiene la opacidad en 0 al pasar el scroll
                }
            }

            // Función para detectar cuando se alcanza una sección y cambiar el video
            function handleScroll() {
                sections.forEach((section, index) => {
                    const rect = section.getBoundingClientRect();
                    if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
                        changeVideo(index);
                    }
                });
            }

            // Añadir evento de scroll para llamar a updateHeader y handleScroll
            window.addEventListener('scroll', () => {
                updateHeader();
                handleScroll();
            });
            window.addEventListener('resize', updateHeader);

            // Añadir evento click para navegar entre capítulos
            navLinks.forEach((link, index) => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();

                    // Scroll suave a la sección correspondiente
                    document.querySelector(link.getAttribute('href')).scrollIntoView({
                        behavior: 'smooth'
                    });
                });
            });

            // Llamada inicial para establecer el estado correcto del h1
            updateHeader();
        });
  