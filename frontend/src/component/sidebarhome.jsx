export function Sidebarhome(){
    return (
      <div className="hidden xl:block w-[350px] space-y-8 h-fit">
        <div className="w-full space-y-3 border px-6 py-6 rounded-2xl">
          <div className="flex justify-between">
            <p className="text-2xl font-bold text-gray-600  ">Draft</p>
            <button className="px-4 py-1 rounded-3xl border font-medium text-gray-400 ">See all</button>
          </div>
          <div className="ellipsis-3 flex-col mr-5 space-y-3">
            <p className="leading-7 font-medium">ldjjdlfkjskdflksdjfflkfjlsjd</p>
            <p>Edited</p>
          </div>
        </div>

        <div className="space-y-3 px-6 py-6 border rounded-2xl">
        <p className="font-bold text-2xl">Bookmarks</p>
        <p className="font-semibold">title</p>
        <p>authors name </p>        
        <button className="border w-full py-1 rounded-xl font-medium text-gray-700">See all Bookmarks</button>
        </div>

      </div>
    );
}