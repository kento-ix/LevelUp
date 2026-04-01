import GameStats from "../components/games/GameStats";
import PageHeader from "../components/layout/PageHeader";
import GameList from "../components/games/GameList";

export default function GamesPage() {
  return (
    <>
      <PageHeader title="Games" />
      <div className="page-content">
        <GameList />
        <GameStats />
      </div>
    </>
  );
}
