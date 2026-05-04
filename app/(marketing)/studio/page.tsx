import { StudioBuilder } from "@/components/studio/studio-builder"
import { getStudioData } from "@/lib/studio/get-studio-data"

export default async function StudioPage() {
  const data = await getStudioData()

  return <StudioBuilder data={data} />
}
