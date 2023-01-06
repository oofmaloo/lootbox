import LootBox from '../../components/loot/LootBox';
import { useRouter } from 'next/router'
import Layout from '../../components/layout'
import LootIndex from './index'

export default function LootPage() {
  const router = useRouter();
  const id = router.query.id;

  return (
    <>
      <LootBox id={id} />
      <div className="mt-24">
        <div className="text-3xl font-semibold">Loot List</div>
        <LootIndex />
      </div>
    </>
  )
}
