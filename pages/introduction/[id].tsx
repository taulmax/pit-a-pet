import { decodeBase64ToUTF8 } from "@/util/util";
import { useRouter } from "next/router";

export default function IntroductionDetail() {
  const router = useRouter();
  const { id, data } = router.query;

  return (
    <div>
      <h1>Introduction Page</h1>
      <p>Slug: {id}</p>
      {decodeBase64ToUTF8(data)}
    </div>
  );
}
