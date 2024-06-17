import { useContext, useState } from "react";
import { UserContext } from "../context/context";
import { getdate } from "../utils/date";

function Bookmark(){
    const {initialinfo,setInitialinfo} = useContext(UserContext)
    const {bookmarks} = initialinfo
    return (
      <>
        <div className="min-h-screen w-full mt-20 p-4 font-display ">
          <div className="mx-auto max-w-[900px] md:justify-center ">
            <p className="font-bold text-2xl mb-3 ">Blogs</p>
            <div className=" border-black border-4 p-4 rounded-md">
              {!bookmarks.length ? (
                <p className="text-xl font-bold">You dont have any drafts</p>
              ) : (
                bookmarks.map((bookmark, index) => (
                  <div className=" p-2 mb-2 rounded-md" key={index}>
                    <div className="flex ">
                      <div
                        className="flex-1 content-center cursor-pointer"
                        onClick={() => {
                          navigate(`/blog/${bookmark.title}`, {

                            state: { data: { id: bookmark._id } },
                          });
                        }}
                      >
                        <p className="text-lg font-bold hover:underline">
                          {bookmark.title}
                        </p>
                        <p className="text-lg font-bold  ">
                          {getdate(bookmark.publishedOn)}
                        </p>
                      </div>
                    </div>

                    <hr className="border-2 border-black mt-2 rounded-md" />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
       
      </>
    );
}
export default Bookmark