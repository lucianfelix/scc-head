import { load } from '../lib/data';
import Link from 'next/link';

export default async function Page() {

  const data = await load();
  return (
    <div className="space-y-8">
      <h1 className="text-xl font-medium text-gray-300">Examples</h1>

        <div><pre>{JSON.stringify(data, null, 2) }</pre></div>

    </div>
  );
}
