import { useState } from "react";
import GameZone from "@/components/GameZone";
import GameStats from "@/components/GameStats";

const Index = () => {
  const [score, setScore] = useState(0);
  const [ballLifespan, setBallLifespan] = useState(3000); // 3 seconds initially
  const [upgradeCount, setUpgradeCount] = useState(0);

  const upgradeCost = (upgradeCount + 1) * 100;
  const canUpgrade = score >= upgradeCost;

  const handleUpgradeLifespan = () => {
    if (canUpgrade) {
      setScore((prev) => prev - upgradeCost);
      setBallLifespan((prev) => prev + 1000); // Add 1 second
      setUpgradeCount((prev) => prev + 1);
    }
  };

  const handleResetGame = () => {
    setScore(0);
    setBallLifespan(3000);
    setUpgradeCount(0);
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
            <GameZone onScoreUpdate={setScore} ballLifespan={ballLifespan} />
          </div>

          <div>
            <GameStats
              score={score}
              ballLifespan={ballLifespan}
              onUpgradeLifespan={handleUpgradeLifespan}
              onResetGame={handleResetGame}
              canUpgrade={canUpgrade}
              upgradeCost={upgradeCost}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
