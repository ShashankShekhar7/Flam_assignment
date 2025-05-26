import React, { useRef, useState, useEffect, useCallback } from "react";
import "../styles.css";

const BottomSheet = () => {
  const sheetRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [currentY, setCurrentY] = useState(0);
  const [velocity, setVelocity] = useState(0);
  const [position, setPosition] = useState(90); 
  const animationRef = useRef(null);
  const lastTimeRef = useRef(0);

  const snapPoints = [10, 50, 90]; // fully open, half, mostly closed

  const onDragStart = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    setStartY(clientY);
    setCurrentY(clientY);
    setVelocity(0);
    lastTimeRef.current = Date.now();
    
    if (sheetRef.current) {
      sheetRef.current.style.transition = 'none';
    }
  }, []);

  const onDragMove = useCallback((e) => {
    if (!isDragging) return;
    e.preventDefault();
    
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const deltaY = clientY - startY;
    const newPosition = Math.min(Math.max(position + (deltaY / window.innerHeight) * 100, 0), 100);
    
    const now = Date.now();
    const timeDelta = now - lastTimeRef.current;
    if (timeDelta > 0) {
      const newVelocity = (clientY - currentY) / timeDelta * 16.67; // normalize to ~60fps
      setVelocity(newVelocity);
    }
    
    setCurrentY(clientY);
    setPosition(newPosition);
    lastTimeRef.current = now;
  }, [isDragging, startY, position, currentY]);

  const onDragEnd = useCallback(() => {
    if (!isDragging) return;
    setIsDragging(false);
    
    let targetSnap = snapPoints.reduce((prev, curr) =>
      Math.abs(curr - position) < Math.abs(prev - position) ? curr : prev
    );
    
    if (Math.abs(velocity) > 0.5) {
      if (velocity > 0) {
        targetSnap = snapPoints.find(snap => snap > position) || snapPoints[snapPoints.length - 1];
      } else {
        targetSnap = [...snapPoints].reverse().find(snap => snap < position) || snapPoints[0];
      }
    }
    
    animateTo(targetSnap);
  }, [isDragging, position, velocity]);

  const animateTo = useCallback((target) => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    let currentPos = position;
    let currentVel = velocity;

    const animate = () => {
      const stiffness = 0.15;
      const damping = 0.85;
      
      const displacement = target - currentPos;
      const springForce = stiffness * displacement;
      const dampingForce = damping * currentVel;
      const acceleration = springForce - dampingForce;
      
      currentVel += acceleration;
      currentPos += currentVel;

      setPosition(currentPos);
      setVelocity(currentVel);

      if (Math.abs(currentVel) > 0.01 || Math.abs(displacement) > 0.1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setPosition(target);
        setVelocity(0);
        if (sheetRef.current) {
          sheetRef.current.style.transition = 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        }
      }
    };

    animate();
  }, [position, velocity]);

  const manualSet = useCallback((target) => {
    animateTo(target);
  }, [animateTo]);

  useEffect(() => {
    if (isDragging) {
      const handleMove = (e) => onDragMove(e);
      const handleEnd = () => onDragEnd();

      document.addEventListener("mousemove", handleMove, { passive: false });
      document.addEventListener("mouseup", handleEnd);
      document.addEventListener("touchmove", handleMove, { passive: false });
      document.addEventListener("touchend", handleEnd);

      return () => {
        document.removeEventListener("mousemove", handleMove);
        document.removeEventListener("mouseup", handleEnd);
        document.removeEventListener("touchmove", handleMove);
        document.removeEventListener("touchend", handleEnd);
      };
    }
  }, [isDragging, onDragMove, onDragEnd]);

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className="app-container">
      {}
      <div className="main-content">
        <h1 className="main-title">🚀 Modern Bottom Sheet</h1>
        <p className="main-description">
          Experience smooth animations, natural physics, and intuitive gestures
        </p>
        
        <div className="button-group">
          <button 
            onClick={() => manualSet(10)}
            className="control-button"
          >
            🔓 Fully Open
          </button>
          <button 
            onClick={() => manualSet(50)}
            className="control-button"
          >
            📐 Half Open
          </button>
          <button 
            onClick={() => manualSet(90)}
            className="control-button"
          >
            🔒 Minimize
          </button>
        </div>
      </div>

      {}
      <div
        ref={sheetRef}
        className={`bottom-sheet ${isDragging ? 'dragging' : ''}`}
        style={{
          transform: `translateY(${position}%)`
        }}
      >
        {}
        <div
          className={`handle ${isDragging ? 'dragging' : ''}`}
          onMouseDown={onDragStart}
          onTouchStart={onDragStart}
        />

        {}
        <div className="sheet-content">
          <div className="sheet-title">
            ✨ Beautiful Bottom Sheet
          </div>
          
          <p className="sheet-description">
            This bottom sheet features smooth spring animations, velocity-based snapping, 
            and an intuitive drag experience that feels natural on both desktop and mobile.
          </p>

          <div className="feature-grid">
            <div className="feature-card smart-snapping">
              <div className="feature-icon">🎯</div>
              <h3 className="feature-title">Smart Snapping</h3>
              <p className="feature-description">
                Velocity-aware snapping that predicts your intention
              </p>
            </div>
            
            <div className="feature-card fluid-motion">
              <div className="feature-icon">🌊</div>
              <h3 className="feature-title">Fluid Motion</h3>
              <p className="feature-description">
                Spring physics for natural, responsive animations
              </p>
            </div>

            <div className="feature-card touch-optimized">
              <div className="feature-icon">📱</div>
              <h3 className="feature-title">Touch Optimized</h3>
              <p className="feature-description">
                Perfect for both desktop mouse and mobile touch
              </p>
            </div>
          </div>

          <div className="pro-tip">
            <p>💡 Pro tip: Try dragging quickly to see velocity-based snapping in action!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomSheet;