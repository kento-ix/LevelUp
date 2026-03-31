import GameList from "../components/games/GameList";
import PageHeader from "../components/layout/PageHeader";

export default function GamePage() {
  return (
    <>
      <PageHeader title="Games" />
      <GameList />
    </>
  );
}