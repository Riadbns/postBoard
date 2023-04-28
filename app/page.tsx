import FormPost from "./Form";
import Trashdelete from "./Trash";
import style from "./page.module.css";

async function getPosts() {
  const res = await fetch(`https://postboard-production-373e.up.railway.app/api/getPosts`);
  if (!res.ok) {
    console.log(res);
  }
  return res.json();
}

export default async function Home() {
  const data: { id: number; title: string; content: string }[] =
    await getPosts();
  return (
    <main className="h-screen w-full  bg-black flex flex-col">
      <div className="text-yellow-400 flex justify-center text-xl">
        PostBoard Web application
      </div>
      <FormPost />
        <div className={style.agcoursesbox}>
          {data.map((post) => (
            <div className={style.agcourses_item} key={post.id}>
              <a href="#" className={style.agcoursesitem_link}>
                <div className={style.agcoursesitem_bg}></div>

                <div className={style.agcoursesitem_title} key={post.id}>
                  {post.title}
                </div>
                <div className={style.agcoursesitem_datebox}>
                  <span className={style.agcoursesitem_date}>
                    <Trashdelete postId={post.id} />
                  </span>
                </div>
              </a>
            </div>
          ))}
        </div>
    </main>
  );
}
