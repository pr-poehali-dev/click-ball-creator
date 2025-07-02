import { useState, useEffect, useCallback } from "react";

interface Ball {
  id: string;
  x: number;
  y: number;
  size: number;
  color: string;
  createdAt: number;
  lifespan: number;
}

interface GameZoneProps {
  onScoreUpdate: (score: number) => void;
  ballLifespan: number;
  ballSizeRange: { min: number; max: number };
}

const GameZone = ({
  onScoreUpdate,
  ballLifespan,
  ballSizeRange,
}: GameZoneProps) => {
  const [balls, setBalls] = useState<Ball[]>([]);
  const [score, setScore] = useState(0);

  const colors = [
    "#9b87f5",
    "#7E69AB",
    "#6E59A5",
    "#D6BCFA",
    "#8B5CF6",
    "#D946EF",
    "#0EA5E9",
    "#33C3F0",
  ];

  const createBall = useCallback(
    (e: React.MouseEvent) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const newBall: Ball = {
        id: Date.now().toString(),
        x,
        y,
        size:
          Math.random() * (ballSizeRange.max - ballSizeRange.min) +
          ballSizeRange.min,
        color: colors[Math.floor(Math.random() * colors.length)],
        createdAt: Date.now(),
        lifespan: ballLifespan,
      };

      setBalls((prev) => [...prev, newBall]);
    },
    [ballLifespan, ballSizeRange, colors],
  );

  // Calculate total area and award points
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();

      // Remove expired balls
      setBalls((prev) =>
        prev.filter((ball) => now - ball.createdAt < ball.lifespan),
      );

      // Calculate total area and award points based on area
      const totalArea = balls.reduce((sum, ball) => {
        const radius = ball.size / 2;
        return sum + Math.PI * radius * radius;
      }, 0);

      // Points per second based on area: 2 base + area multiplier
      const areaMultiplier = Math.floor(totalArea / 500); // More sensitive to area
      const pointsToAdd = 2 + areaMultiplier;

      setScore((prev) => {
        const newScore = prev + pointsToAdd;
        onScoreUpdate(newScore);
        return newScore;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [balls, onScoreUpdate]);

  return (
    <div
      className="relative w-full h-96 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl border-2 border-slate-200 cursor-crosshair overflow-hidden"
      onClick={createBall}
    >
      <div className="absolute top-4 left-4 text-sm font-mono text-slate-600">
        Кликните для создания шарика
      </div>

      {balls.map((ball) => {
        const age = (Date.now() - ball.createdAt) / ball.lifespan;
        const opacity = Math.max(0, 1 - age);

        return (
          <div
            key={ball.id}
            className="absolute rounded-full transition-all duration-300 animate-pulse"
            style={{
              left: ball.x - ball.size / 2,
              top: ball.y - ball.size / 2,
              width: ball.size,
              height: ball.size,
              backgroundColor: ball.color,
              opacity,
              transform: `scale(${1 - age * 0.2})`,
              boxShadow: `0 0 ${ball.size}px ${ball.color}40`,
            }}
          />
        );
      })}

      <div className="absolute bottom-4 right-4 text-sm font-mono text-slate-600">
        Шариков: {balls.length}
      </div>
    </div>
  );
};

export default GameZone;
