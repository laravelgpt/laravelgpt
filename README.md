<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MD Shamim Hossain - Senior Full-Stack Developer</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <style>
        :root {
            --dark-bg: #0d1117;
            --darker-bg: #090c10;
            --accent: #00FFAA;
            --text: #c9d1d9;
            --light-text: #f0f6fc;
            --card-bg: #161b22;
            --border: #30363d;
        }
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            background-color: var(--dark-bg);
            color: var(--text);
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            overflow-x: hidden;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
        }
        
        header {
            text-align: center;
            padding: 40px 0;
            position: relative;
            overflow: hidden;
        }
        
        .banner-container {
            height: 300px;
            border-radius: 20px;
            margin-bottom: 30px;
            overflow: hidden;
            position: relative;
            box-shadow: 0 10px 30px rgba(0, 255, 170, 0.15);
        }
        
        #bannerCanvas {
            width: 100%;
            height: 100%;
            display: block;
        }
        
        h1 {
            font-size: 2.8rem;
            margin-bottom: 0.5rem;
            background: linear-gradient(90deg, #f0f6fc, var(--accent));
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
            text-shadow: 0 2px 10px rgba(0, 255, 170, 0.2);
        }
        
        h2 {
            font-size: 1.8rem;
            margin: 2.5rem 0 1.5rem;
            padding-bottom: 0.8rem;
            border-bottom: 2px solid var(--accent);
            color: var(--light-text);
            position: relative;
        }
        
        h2:after {
            content: '';
            position: absolute;
            bottom: -2px;
            left: 0;
            width: 100px;
            height: 2px;
            background: var(--accent);
        }
        
        h3 {
            font-size: 1.5rem;
            margin: 2rem 0 1rem;
            color: var(--light-text);
        }
        
        p {
            margin-bottom: 1.5rem;
            line-height: 1.7;
        }
        
        section {
            padding: 30px 0;
        }
        
        .about-card {
            background: var(--card-bg);
            border-radius: 15px;
            padding: 30px;
            margin-bottom: 40px;
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
            border: 1px solid var(--border);
        }
        
        .highlights {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 25px;
            margin-top: 25px;
        }
        
        .highlight {
            background: linear-gradient(145deg, #161b22, #1a2129);
            padding: 25px;
            border-radius: 12px;
            border-left: 3px solid var(--accent);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        }
        
        .highlight:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 25px rgba(0, 255, 170, 0.15);
        }
        
        .highlight h4 {
            color: var(--accent);
            margin-bottom: 12px;
            font-size: 1.3rem;
        }
        
        /* Diamond Tech Stack Styles */
        .tech-section {
            margin: 40px 0;
        }
        
        .tech-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
            gap: 25px;
            margin-top: 20px;
        }
        
        .diamond-tech {
            position: relative;
            width: 100%;
            height: 0;
            padding-bottom: 100%;
            transform: rotate(45deg);
            background: var(--card-bg);
            border: 1px solid rgba(0, 255, 170, 0.3);
            box-shadow: 0 0 15px rgba(0, 255, 170, 0.1);
            transition: all 0.3s ease;
            overflow: hidden;
        }
        
        .diamond-tech:hover {
            transform: rotate(45deg) scale(1.1);
            box-shadow: 0 0 25px var(--accent);
            z-index: 2;
        }
        
        .diamond-tech:before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, rgba(0, 255, 170, 0.1), transparent);
        }
        
        .diamond-inner {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            transform: rotate(-45deg);
            padding: 10px;
        }
        
        .diamond-icon {
            font-size: 2rem;
            margin-bottom: 10px;
            color: var(--accent);
            text-shadow: 0 0 10px rgba(0, 255, 170, 0.5);
        }
        
        .diamond-label {
            color: var(--light-text);
            font-size: 0.85rem;
            text-align: center;
            font-weight: 500;
        }
        
        /* Stats Section */
        .stats-container {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 25px;
            margin-top: 25px;
        }
        
        .stat-card {
            background: var(--card-bg);
            border-radius: 15px;
            padding: 25px;
            text-align: center;
            border: 1px solid var(--border);
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        }
        
        .stat-card h3 {
            color: var(--accent);
            margin-bottom: 15px;
        }
        
        /* Projects Section */
        .projects-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
            gap: 30px;
            margin-top: 20px;
        }
        
        .project-card {
            background: var(--card-bg);
            border-radius: 15px;
            overflow: hidden;
            border: 1px solid var(--border);
            transition: transform 0.3s ease;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        }
        
        .project-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 15px 30px rgba(0, 255, 170, 0.2);
        }
        
        .project-header {
            padding: 20px;
            background: rgba(0, 255, 170, 0.05);
            border-bottom: 1px solid var(--border);
        }
        
        .project-header h3 {
            color: var(--accent);
            margin-bottom: 5px;
        }
        
        .project-body {
            padding: 20px;
        }
        
        .tech-stack {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin: 15px 0;
        }
        
        .tech-badge {
            background: rgba(0, 255, 170, 0.1);
            color: var(--accent);
            padding: 5px 10px;
            border-radius: 20px;
            font-size: 0.8rem;
        }
        
        .project-footer {
            padding: 15px 20px;
            background: rgba(0, 0, 0, 0.2);
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .btn {
            display: inline-block;
            padding: 8px 20px;
            background: rgba(0, 255, 170, 0.1);
            color: var(--accent);
            border-radius: 30px;
            text-decoration: none;
            font-weight: 600;
            transition: all 0.3s ease;
            border: 1px solid var(--accent);
        }
        
        .btn:hover {
            background: var(--accent);
            color: var(--dark-bg);
        }
        
        /* Footer */
        footer {
            text-align: center;
            padding: 50px 0 30px;
            border-top: 1px solid var(--border);
            margin-top: 40px;
        }
        
        .social-links {
            display: flex;
            justify-content: center;
            gap: 20px;
            margin: 25px 0;
        }
        
        .social-icon {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            background: var(--card-bg);
            color: var(--accent);
            font-size: 1.5rem;
            transition: all 0.3s ease;
            border: 1px solid var(--accent);
        }
        
        .social-icon:hover {
            background: var(--accent);
            color: var(--dark-bg);
            transform: translateY(-5px);
            box-shadow: 0 5px 15px rgba(0, 255, 170, 0.3);
        }
        
        .quote {
            font-size: 1.3rem;
            max-width: 800px;
            margin: 40px auto;
            padding: 25px;
            border-radius: 15px;
            background: rgba(0, 255, 170, 0.05);
            border: 1px solid var(--accent);
            position: relative;
            font-style: italic;
        }
        
        .quote:before {
            content: '"';
            position: absolute;
            top: -25px;
            left: 20px;
            font-size: 5rem;
            color: rgba(0, 255, 170, 0.2);
            font-family: serif;
        }
        
        .signature {
            display: block;
            margin-top: 15px;
            text-align: right;
            color: var(--accent);
            font-weight: 600;
        }
        
        @media (max-width: 768px) {
            .tech-grid {
                grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
                gap: 15px;
            }
            
            .projects-grid {
                grid-template-columns: 1fr;
            }
            
            h1 {
                font-size: 2.2rem;
            }
            
            .banner-container {
                height: 200px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <div class="banner-container">
                <canvas id="bannerCanvas"></canvas>
            </div>
            <h1>MD Shamim Hossain (Script Coder)</h1>
            <h3>Senior Full-Stack Developer | AI & Automation Architect | Reverse Engineering Specialist</h3>
        </header>

        <section id="about">
            <div class="about-card">
                <h2>📝 About Me</h2>
                <p>Hello! I'm MD Shamim Hossain, also known as Script Coder, a passionate and versatile senior developer with over a decade of experience in software engineering, AI, security, and automation. As the founder of Red Hackers, I lead initiatives in ethical hacking, OSINT automation, and advanced tool development.</p>
                
                <p>I specialize in creating immersive 3D visualizations using Three.js and Blender, transforming complex data into engaging visual experiences. My work focuses on bridging cutting-edge technology with practical solutions, from building scalable SaaS platforms in Laravel to creating Python-based GUI tools for mobile unlocking and data analysis.</p>
                
                <div class="highlights">
                    <div class="highlight">
                        <h4>🔭 Currently Working On</h4>
                        <p>Enhancing ionCube decoders with AI-assisted analysis and developing an AI-powered breach detection dashboard with 3D visualization capabilities.</p>
                    </div>
                    <div class="highlight">
                        <h4>🌱 Currently Learning</h4>
                        <p>Advanced 3D rendering techniques with Three.js and Blender, Rust for secure systems programming, and quantum computing basics.</p>
                    </div>
                    <div class="highlight">
                        <h4>💬 Ask Me About</h4>
                        <p>Laravel best practices, reverse engineering techniques, mobile IMEI unlocking, or creating stunning 3D visualizations for data representation.</p>
                    </div>
                </div>
            </div>
        </section>

        <section id="tech-stack">
            <h2>💎 Tech Stack</h2>
            <p>My technology expertise visualized with diamond-shaped icons representing strength and precision:</p>
            
            <div class="tech-section">
                <h3>Frontend Technologies</h3>
                <div class="tech-grid">
                    <div class="diamond-tech">
                        <div class="diamond-inner">
                            <i class="fab fa-js diamond-icon"></i>
                            <span class="diamond-label">JavaScript</span>
                        </div>
                    </div>
                    <div class="diamond-tech">
                        <div class="diamond-inner">
                            <i class="fab fa-react diamond-icon"></i>
                            <span class="diamond-label">React.js</span>
                        </div>
                    </div>
                    <div class="diamond-tech">
                        <div class="diamond-inner">
                            <i class="fab fa-vuejs diamond-icon"></i>
                            <span class="diamond-label">Vue.js</span>
                        </div>
                    </div>
                    <div class="diamond-tech">
                        <div class="diamond-inner">
                            <i class="fas fa-cube diamond-icon"></i>
                            <span class="diamond-label">Three.js</span>
                        </div>
                    </div>
                    <div class="diamond-tech">
                        <div class="diamond-inner">
                            <i class="fab fa-css3-alt diamond-icon"></i>
                            <span class="diamond-label">Tailwind CSS</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="tech-section">
                <h3>Backend Technologies</h3>
                <div class="tech-grid">
                    <div class="diamond-tech">
                        <div class="diamond-inner">
                            <i class="fab fa-php diamond-icon"></i>
                            <span class="diamond-label">PHP</span>
                        </div>
                    </div>
                    <div class="diamond-tech">
                        <div class="diamond-inner">
                            <i class="fab fa-laravel diamond-icon"></i>
                            <span class="diamond-label">Laravel</span>
                        </div>
                    </div>
                    <div class="diamond-tech">
                        <div class="diamond-inner">
                            <i class="fab fa-python diamond-icon"></i>
                            <span class="diamond-label">Python</span>
                        </div>
                    </div>
                    <div class="diamond-tech">
                        <div class="diamond-inner">
                            <i class="fab fa-node diamond-icon"></i>
                            <span class="diamond-label">Node.js</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="tech-section">
                <h3>3D & Visualization</h3>
                <div class="tech-grid">
                    <div class="diamond-tech">
                        <div class="diamond-inner">
                            <i class="fas fa-dice-d20 diamond-icon"></i>
                            <span class="diamond-label">Three.js</span>
                        </div>
                    </div>
                    <div class="diamond-tech">
                        <div class="diamond-inner">
                            <i class="fas fa-cubes diamond-icon"></i>
                            <span class="diamond-label">WebGL</span>
                        </div>
                    </div>
                    <div class="diamond-tech">
                        <div class="diamond-inner">
                            <i class="fas fa-paint-brush diamond-icon"></i>
                            <span class="diamond-label">Blender</span>
                        </div>
                    </div>
                    <div class="diamond-tech">
                        <div class="diamond-inner">
                            <i class="fas fa-chart-line diamond-icon"></i>
                            <span class="diamond-label">D3.js</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section id="stats">
            <h2>📊 GitHub Analytics</h2>
            <div class="stats-container">
                <div class="stat-card">
                    <h3>Activity Stats</h3>
                    <img src="https://github-readme-stats.vercel.app/api?username=laravelgpt&show_icons=true&theme=radical&count_private=true" alt="GitHub Stats">
                </div>
                <div class="stat-card">
                    <h3>Commit Streak</h3>
                    <img src="https://github-readme-streak-stats.herokuapp.com/?user=laravelgpt&theme=radical" alt="GitHub Streak">
                </div>
                <div class="stat-card">
                    <h3>Top Languages</h3>
                    <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=laravelgpt&layout=compact&theme=radical" alt="Top Languages">
                </div>
            </div>
        </section>

        <section id="projects">
            <h2>🚀 Featured Projects</h2>
            <div class="projects-grid">
                <div class="project-card">
                    <div class="project-header">
                        <h3>3D Dashboard for Breach Detection</h3>
                    </div>
                    <div class="project-body">
                        <p>AI-powered security dashboard with immersive 3D visualization of network threats and vulnerabilities in real-time.</p>
                        <div class="tech-stack">
                            <span class="tech-badge">Three.js</span>
                            <span class="tech-badge">WebGL</span>
                            <span class="tech-badge">Laravel</span>
                            <span class="tech-badge">AI Analysis</span>
                        </div>
                    </div>
                    <div class="project-footer">
                        <span>⭐ 24</span>
                        <a href="#" class="btn">View Project</a>
                    </div>
                </div>
                
                <div class="project-card">
                    <div class="project-header">
                        <h3>IMEI Sync Pro</h3>
                    </div>
                    <div class="project-body">
                        <p>Laravel-based SaaS platform for mobile unlocking services with advanced analytics visualization.</p>
                        <div class="tech-stack">
                            <span class="tech-badge">Laravel</span>
                            <span class="tech-badge">Livewire</span>
                            <span class="tech-badge">D3.js</span>
                            <span class="tech-badge">MySQL</span>
                        </div>
                    </div>
                    <div class="project-footer">
                        <span>⭐ 18</span>
                        <a href="#" class="btn">View Project</a>
                    </div>
                </div>
                
                <div class="project-card">
                    <div class="project-header">
                        <h3>Visual Data Explorer</h3>
                    </div>
                    <div class="project-body">
                        <p>Interactive 3D data visualization tool that transforms complex datasets into explorable 3D environments.</p>
                        <div class="tech-stack">
                            <span class="tech-badge">Three.js</span>
                            <span class="tech-badge">WebGL</span>
                            <span class="tech-badge">Python</span>
                            <span class="tech-badge">Django</span>
                        </div>
                    </div>
                    <div class="project-footer">
                        <span>⭐ 32</span>
                        <a href="#" class="btn">View Project</a>
                    </div>
                </div>
            </div>
        </section>

        <footer>
            <div class="quote">
                "Code the unseen. Automate the unknown. Unlock the impossible."
                <span class="signature">— MD Shamim Hossain / Red Hackers Founder</span>
            </div>
            
            <div class="social-links">
                <a href="https://github.com/laravelgpt" class="social-icon">
                    <i class="fab fa-github"></i>
                </a>
                <a href="https://shamimhossain.com.bd" class="social-icon">
                    <i class="fas fa-globe"></i>
                </a>
                <a href="https://t.me/laravelgpt" class="social-icon">
                    <i class="fab fa-telegram"></i>
                </a>
                <a href="mailto:admin@shamimhossain.com.bd" class="social-icon">
                    <i class="fas fa-envelope"></i>
                </a>
            </div>
            
            <p>© 2023 MD Shamim Hossain. All rights reserved.</p>
        </footer>
    </div>

    <script>
        // Initialize Three.js scene
        const container = document.getElementById('bannerCanvas');
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, container.clientWidth / 300, 0.1, 1000);
        
        const renderer = new THREE.WebGLRenderer({ 
            canvas: container,
            alpha: true,
            antialias: true
        });
        renderer.setSize(container.clientWidth, 300);
        renderer.setClearColor(0x000000, 0);
        
        // Create floating tech icons
        const icons = [
            'laravel', 'python', 'react', 'nodejs', 'docker', 
            'git', 'github', 'aws', 'android', 'apple'
        ];
        
        const iconGroup = new THREE.Group();
        scene.add(iconGroup);
        
        // Create glowing particles
        const particles = new THREE.Group();
        scene.add(particles);
        
        const particleGeometry = new THREE.BufferGeometry();
        const particleMaterial = new THREE.PointsMaterial({
            color: 0x00FFAA,
            size: 2,
            transparent: true,
            blending: THREE.AdditiveBlending
        });
        
        const particleCount = 500;
        const posArray = new Float32Array(particleCount * 3);
        
        for(let i = 0; i < particleCount * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * 100;
        }
        
        particleGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        const particleMesh = new THREE.Points(particleGeometry, particleMaterial);
        particles.add(particleMesh);
        
        // Create central text
        const textGroup = new THREE.Group();
        scene.add(textGroup);
        
        const createText = (text, size, x, y, z) => {
            const textGeo = new THREE.TextGeometry(text, {
                size: size,
                height: 1,
                curveSegments: 12,
                bevelEnabled: true,
                bevelThickness: 0.5,
                bevelSize: 0.5,
                bevelOffset: 0,
                bevelSegments: 5
            });
            
            const textMaterial = new THREE.MeshPhongMaterial({ 
                color: 0x00FFAA,
                emissive: 0x005544,
                specular: 0x00FFAA,
                shininess: 100,
                transparent: true,
                opacity: 0.9
            });
            
            const textMesh = new THREE.Mesh(textGeo, textMaterial);
            textGeo.computeBoundingBox();
            const centerOffset = -0.5 * (textGeo.boundingBox.max.x - textGeo.boundingBox.min.x);
            textMesh.position.set(centerOffset + x, y, z);
            textGroup.add(textMesh);
        };
        
        createText('SCRIPT', 8, 0, 5, 0);
        createText('CODER', 8, 0, -5, 0);
        
        // Add lighting
        const ambientLight = new THREE.AmbientLight(0x333333);
        scene.add(ambientLight);
        
        const directionalLight = new THREE.DirectionalLight(0x00FFAA, 1);
        directionalLight.position.set(5, 5, 5);
        scene.add(directionalLight);
        
        const pointLight = new THREE.PointLight(0x00FFAA, 1, 100);
        pointLight.position.set(0, 0, 10);
        scene.add(pointLight);
        
        camera.position.z = 25;
        
        // Animation loop
        function animate() {
            requestAnimationFrame(animate);
            
            // Rotate text
            textGroup.rotation.y += 0.005;
            
            // Move particles
            const positions = particleMesh.geometry.attributes.position.array;
            for(let i = 0; i < positions.length; i += 3) {
                positions[i] += (Math.random() - 0.5) * 0.2;
                positions[i+1] += (Math.random() - 0.5) * 0.2;
                positions[i+2] += (Math.random() - 0.5) * 0.2;
            }
            particleMesh.geometry.attributes.position.needsUpdate = true;
            
            renderer.render(scene, camera);
        }
        
        // Handle window resize
        window.addEventListener('resize', () => {
            camera.aspect = container.clientWidth / 300;
            camera.updateProjectionMatrix();
            renderer.setSize(container.clientWidth, 300);
        });
        
        animate();
    </script>
</body>
</html>
