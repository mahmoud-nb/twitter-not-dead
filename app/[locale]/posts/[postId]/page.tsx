import { PostView } from "@/src/components/post/PostView"

type PostPageParams = { postId: string }

export default async function  Post({ params }: { params: PostPageParams }) {


  return (
    <div>
      <PostView postId={params.postId} />
    </div>
  )
}

