import { Player } from '@/components/player/player';

const PlayerPage = async ({ params }: { params: Promise<{ name: string }> }) => {
    const name = (await params).name;
    return <Player name={name} />;
};

export default PlayerPage;
