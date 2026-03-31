import GameStats from "../components/communities/GameStats";
import PageHeader from "../components/layout/PageHeader";

export default function GamesPage() {
  return (
    <>
      <PageHeader title="Games" />
      <div className="page-content">
        <GameStats />
      </div>
    </>
  );
}
