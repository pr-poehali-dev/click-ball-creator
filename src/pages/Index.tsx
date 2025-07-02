import { useState } from "react";
import GameZone from "@/components/GameZone";
import GameStats from "@/components/GameStats";

const Index = () => {
  const [score, setScore] = useState(0);
  const [ballLifespan, setBallLifespan] = useState(3000); // 3 seconds initially
  const [ballSizeRange, setBallSizeRange] = useState({ min: 20, max: 50 }); // size range
  const [lifespanUpgrades, setLifespanUpgrades] = useState(0);
  const [sizeUpgrades, setSizeUpgrades] = useState(0);

  const lifespanUpgradeCost = (lifespanUpgrades + 1) * 100;
  const sizeUpgradeCost = (sizeUpgrades + 1) * 150;

  const canUpgradeLifespan = score >= lifespanUpgradeCost;
  const canUpgradeSize = score >= sizeUpgradeCost;

  const handleUpgradeLifespan = () => {
    if (canUpgradeLifespan) {
      setScore((prev) => prev - lifespanUpgradeCost);
      setBallLifespan((prev) => prev + 1000); // Add 1 second
      setLifespanUpgrades((prev) => prev + 1);
    }
  };

  const handleUpgradeSize = () => {
    if (canUpgradeSize) {
      setScore((prev) => prev - sizeUpgradeCost);
      setBallSizeRange((prev) => ({
        min: prev.min,
        max: prev.max + 15, // Increase max size
      }));
      setSizeUpgrades((prev) => prev + 1);
    }
  };

  const handleResetGame = () => {
    setScore(0);
    setBallLifespan(3000);
    setBallSizeRange({ min: 20, max: 50 });
    setLifespanUpgrades(0);
    setSizeUpgrades(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 p-4">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2 font-montserrat">
            Геометрические Шарики
          </h1>
          <p className="text-slate-600">
            Кликайте для создания шариков. Больше площади = больше очков!
          </p>
        </header>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <GameZone
              onScoreUpdate={setScore}
              ballLifespan={ballLifespan}
              ballSizeRange={ballSizeRange}
            />
          </div>

          <div>
            <GameStats
              score={score}
              ballLifespan={ballLifespan}
              ballSizeRange={ballSizeRange}
              onUpgradeLifespan={handleUpgradeLifespan}
              onUpgradeSize={handleUpgradeSize}
              onResetGame={handleResetGame}
              canUpgradeLifespan={canUpgradeLifespan}
              canUpgradeSize={canUpgradeSize}
              lifespanUpgradeCost={lifespanUpgradeCost}
              sizeUpgradeCost={sizeUpgradeCost}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
