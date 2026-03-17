import { getCallById } from './src/app/[locale]/(protected)/admin/calls/actions.js';

async function main() {
  const id = '4ef82875-5e7a-4059-8d03-d9d80666ea1f';
  const data = await getCallById(id);
  console.log("Call Data:", data);
}

main().catch(console.error);
