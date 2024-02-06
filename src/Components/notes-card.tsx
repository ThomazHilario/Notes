export function NotesCard(){
    return(
        <button className=" text-justify flex flex-col bg-gradient-to-t p-5 gap-3 from-black/30 to-slate-700/60 rounded-md hover:ring-2 hover: ring-slate-600 transition h-80">

            {/* Data de criacao da nota */}
            <h1 className="text-slate-200">ha dias</h1>

            {/* Texto da nota */}
            <p className="text-slate-400">Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis sunt aspernatur eos esse facere unde delectus libero aliquid. Nulla debitis unde.</p>
        </button>

    )
}