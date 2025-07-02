import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

interface GameStatsProps {
  score: number;
  ballLifespan: number;
  onUpgradeLifespan: () => void;
  onResetGame: () => void;
  canUpgrade: boolean;
  upgradeCost: number;
}

const GameStats = ({
  score,
  ballLifespan,
  onUpgradeLifespan,
  onResetGame,
  canUpgrade,
  upgradeCost,
}: GameStatsProps) => {
  return (
    <Card className="p-6 bg-white border-slate-200">
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Статистика</h2>
          <div className="text-4xl font-mono font-bold text-purple-600">
            {score.toLocaleString()}
          </div>
          <div className="text-sm text-slate-600">очков</div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
            <span className="text-sm font-medium text-slate-700">
              Время жизни шарика:
            </span>
            <span className="font-mono text-purple-600">
              {ballLifespan / 1000}с
            </span>
          </div>

          <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
            <span className="text-sm font-medium text-slate-700">
              Скорость очков:
            </span>
            <span className="font-mono text-green-600">2 + площадь/500</span>
          </div>
        </div>

        <div className="space-y-3">
          <Button
            onClick={onUpgradeLifespan}
            disabled={!canUpgrade}
            className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-slate-300"
          >
            <Icon name="Plus" className="mr-2" size={16} />
            Улучшить шарики ({upgradeCost} очков)
          </Button>

          <Button
            onClick={onResetGame}
            variant="outline"
            className="w-full border-slate-300 text-slate-700 hover:bg-slate-50"
          >
            <Icon name="RotateCcw" className="mr-2" size={16} />
            Новая игра
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default GameStats;
