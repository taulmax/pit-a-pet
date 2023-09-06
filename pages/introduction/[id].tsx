import { useRouter } from "next/router";

export default function IntroductionDetail() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <h1>Introduction Page</h1>
      <p>Slug: {id}</p>
    </div>
  );
}
