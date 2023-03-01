import { useMedia } from "@/hooks/useMedia";
import MeetVideo from "@/components/MeetVideo";

export default function Meet() {
  const { stream } = useMedia();

  return (
    <>
      <div>
        <MeetVideo stream={stream} userInfo={{userName: 'fh'}}></MeetVideo>
      </div>
    </>
  )
}