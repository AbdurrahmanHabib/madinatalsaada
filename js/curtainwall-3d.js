/* ==========================================================================
   GUTTMANN-STYLE 3D CURTAIN WALL VISUALIZATION
   Navy Blue Mullions + Chrome Caps + Transparent Glass
   ========================================================================== */

(function() {
    const container = document.getElementById('curtainWall3D');
    if (!container) return;
    
    // Configuration
    const config = {
        cols: 3,
        rows: 3,
        panelWidth: 120,
        panelHeight: 140,
        mullionWidth: 8,
        gap: 4,
        navyBlue: '#1a3a5c',
        navyLight: '#2a4a6c',
        chrome: '#c0c0c0',
        chromeLight: '#e8e8e8',
        glass: 'rgba(200, 220, 240, 0.3)',
        glassHighlight: 'rgba(255, 255, 255, 0.4)'
    };
    
    // Calculate total dimensions
    const totalWidth = config.cols * config.panelWidth + (config.cols + 1) * config.mullionWidth;
    const totalHeight = config.rows * config.panelHeight + (config.rows + 1) * config.mullionWidth;
    
    // Create SVG
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', `0 0 ${totalWidth} ${totalHeight}`);
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.style.maxWidth = '400px';
    svg.style.filter = 'drop-shadow(0 20px 40px rgba(26, 58, 92, 0.3))';
    
    // Add definitions for gradients
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    
    // Mullion gradient (vertical)
    const mullionGradientV = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
    mullionGradientV.setAttribute('id', 'mullionV');
    mullionGradientV.setAttribute('x1', '0%');
    mullionGradientV.setAttribute('y1', '0%');
    mullionGradientV.setAttribute('x2', '100%');
    mullionGradientV.setAttribute('y2', '0%');
    mullionGradientV.innerHTML = `
        <stop offset="0%" stop-color="${config.navyBlue}"/>
        <stop offset="50%" stop-color="${config.navyLight}"/>
        <stop offset="100%" stop-color="${config.navyBlue}"/>
    `;
    defs.appendChild(mullionGradientV);
    
    // Mullion gradient (horizontal)
    const mullionGradientH = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
    mullionGradientH.setAttribute('id', 'mullionH');
    mullionGradientH.setAttribute('x1', '0%');
    mullionGradientH.setAttribute('y1', '0%');
    mullionGradientH.setAttribute('x2', '0%');
    mullionGradientH.setAttribute('y2', '100%');
    mullionGradientH.innerHTML = `
        <stop offset="0%" stop-color="${config.navyBlue}"/>
        <stop offset="50%" stop-color="${config.navyLight}"/>
        <stop offset="100%" stop-color="${config.navyBlue}"/>
    `;
    defs.appendChild(mullionGradientH);
    
    // Chrome cap gradient
    const chromeGradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
    chromeGradient.setAttribute('id', 'chrome');
    chromeGradient.setAttribute('x1', '0%');
    chromeGradient.setAttribute('y1', '0%');
    chromeGradient.setAttribute('x2', '100%');
    chromeGradient.setAttribute('y2', '100%');
    chromeGradient.innerHTML = `
        <stop offset="0%" stop-color="${config.chromeLight}"/>
        <stop offset="50%" stop-color="${config.chrome}"/>
        <stop offset="100%" stop-color="#a0a0a0"/>
    `;
    defs.appendChild(chromeGradient);
    
    // Glass gradient
    const glassGradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
    glassGradient.setAttribute('id', 'glass');
    glassGradient.setAttribute('x1', '0%');
    glassGradient.setAttribute('y1', '0%');
    glassGradient.setAttribute('x2', '100%');
    glassGradient.setAttribute('y2', '100%');
    glassGradient.innerHTML = `
        <stop offset="0%" stop-color="${config.glassHighlight}"/>
        <stop offset="30%" stop-color="${config.glass}"/>
        <stop offset="100%" stop-color="rgba(180, 200, 220, 0.2)"/>
    `;
    defs.appendChild(glassGradient);
    
    svg.appendChild(defs);
    
    // Create main group for 3D transform
    const mainGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    mainGroup.setAttribute('id', 'curtainWallGroup');
    
    // Draw background (building interior illusion)
    const background = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    background.setAttribute('x', 0);
    background.setAttribute('y', 0);
    background.setAttribute('width', totalWidth);
    background.setAttribute('height', totalHeight);
    background.setAttribute('fill', '#e8ecf0');
    background.setAttribute('rx', 4);
    mainGroup.appendChild(background);
    
    // Draw glass panels first (behind mullions)
    for (let row = 0; row < config.rows; row++) {
        for (let col = 0; col < config.cols; col++) {
            const x = config.mullionWidth + col * (config.panelWidth + config.mullionWidth);
            const y = config.mullionWidth + row * (config.panelHeight + config.mullionWidth);
            
            // Glass panel
            const glass = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            glass.setAttribute('x', x);
            glass.setAttribute('y', y);
            glass.setAttribute('width', config.panelWidth);
            glass.setAttribute('height', config.panelHeight);
            glass.setAttribute('fill', 'url(#glass)');
            glass.setAttribute('stroke', 'rgba(255,255,255,0.5)');
            glass.setAttribute('stroke-width', 1);
            glass.classList.add('glass-panel');
            glass.dataset.row = row;
            glass.dataset.col = col;
            mainGroup.appendChild(glass);
            
            // Glass reflection line
            const reflection = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            reflection.setAttribute('x1', x + 10);
            reflection.setAttribute('y1', y + 10);
            reflection.setAttribute('x2', x + 30);
            reflection.setAttribute('y2', y + 40);
            reflection.setAttribute('stroke', 'rgba(255,255,255,0.4)');
            reflection.setAttribute('stroke-width', 2);
            reflection.setAttribute('stroke-linecap', 'round');
            mainGroup.appendChild(reflection);
        }
    }
    
    // Draw vertical mullions
    for (let col = 0; col <= config.cols; col++) {
        const x = col * (config.panelWidth + config.mullionWidth);
        
        const mullion = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        mullion.setAttribute('x', x);
        mullion.setAttribute('y', 0);
        mullion.setAttribute('width', config.mullionWidth);
        mullion.setAttribute('height', totalHeight);
        mullion.setAttribute('fill', 'url(#mullionV)');
        mainGroup.appendChild(mullion);
        
        // Chrome cap (top)
        const capTop = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        capTop.setAttribute('x', x - 1);
        capTop.setAttribute('y', 0);
        capTop.setAttribute('width', config.mullionWidth + 2);
        capTop.setAttribute('height', 4);
        capTop.setAttribute('fill', 'url(#chrome)');
        capTop.setAttribute('rx', 1);
        mainGroup.appendChild(capTop);
        
        // Chrome cap (bottom)
        const capBottom = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        capBottom.setAttribute('x', x - 1);
        capBottom.setAttribute('y', totalHeight - 4);
        capBottom.setAttribute('width', config.mullionWidth + 2);
        capBottom.setAttribute('height', 4);
        capBottom.setAttribute('fill', 'url(#chrome)');
        capBottom.setAttribute('rx', 1);
        mainGroup.appendChild(capBottom);
    }
    
    // Draw horizontal mullions
    for (let row = 0; row <= config.rows; row++) {
        const y = row * (config.panelHeight + config.mullionWidth);
        
        const mullion = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        mullion.setAttribute('x', 0);
        mullion.setAttribute('y', y);
        mullion.setAttribute('width', totalWidth);
        mullion.setAttribute('height', config.mullionWidth);
        mullion.setAttribute('fill', 'url(#mullionH)');
        mainGroup.appendChild(mullion);
        
        // Chrome caps at intersections
        for (let col = 0; col <= config.cols; col++) {
            const x = col * (config.panelWidth + config.mullionWidth);
            
            const cap = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            cap.setAttribute('x', x - 1);
            cap.setAttribute('y', y - 1);
            cap.setAttribute('width', config.mullionWidth + 2);
            cap.setAttribute('height', config.mullionWidth + 2);
            cap.setAttribute('fill', 'url(#chrome)');
            cap.setAttribute('rx', 2);
            mainGroup.appendChild(cap);
        }
    }
    
    svg.appendChild(mainGroup);
    container.appendChild(svg);
    
    // Add CSS for container
    container.style.cssText = `
        display: flex;
        align-items: center;
        justify-content: center;
        perspective: 1000px;
        transform-style: preserve-3d;
    `;
    
    svg.style.transition = 'transform 0.1s ease-out';
    
    // Mouse movement effect
    let rafId = null;
    const handleMouseMove = (e) => {
        if (rafId) cancelAnimationFrame(rafId);
        
        rafId = requestAnimationFrame(() => {
            const rect = container.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            const mouseX = e.clientX - centerX;
            const mouseY = e.clientY - centerY;
            
            const rotateY = (mouseX / rect.width) * 15;
            const rotateX = -(mouseY / rect.height) * 15;
            
            svg.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
    };
    
    const handleMouseLeave = () => {
        svg.style.transform = 'rotateX(0deg) rotateY(0deg)';
    };
    
    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);
    
    // Add subtle idle animation
    let idleAngle = 0;
    let isIdle = true;
    
    const idleAnimation = () => {
        if (isIdle) {
            idleAngle += 0.02;
            const x = Math.sin(idleAngle) * 3;
            const y = Math.cos(idleAngle * 0.7) * 2;
            svg.style.transform = `rotateX(${y}deg) rotateY(${x}deg)`;
        }
        requestAnimationFrame(idleAnimation);
    };
    
    // Start idle animation after a delay
    setTimeout(idleAnimation, 1000);
    
    // Pause idle on mouse enter
    container.addEventListener('mouseenter', () => {
        isIdle = false;
    });
    
    container.addEventListener('mouseleave', () => {
        setTimeout(() => {
            isIdle = true;
        }, 500);
    });
    
})();
